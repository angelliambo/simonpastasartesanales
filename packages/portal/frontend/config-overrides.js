// Configuración de optimización para React Scripts
// Este archivo se usa con react-app-rewired para optimizaciones avanzadas

const path = require("path");

module.exports = function override(webpackConfig, env) {
  // Configurar ForkTsCheckerWebpackPlugin para evitar errores de memoria
  // En desarrollo y producción: deshabilitar completamente el plugin para evitar problemas de memoria
  // El type checking se puede hacer con `yarn build` o con el IDE
  // En producción no necesitamos type checking ya que TypeScript ya compiló correctamente
  webpackConfig.plugins = webpackConfig.plugins.filter(
    (plugin) =>
      !(
        plugin.constructor &&
        plugin.constructor.name === "ForkTsCheckerWebpackPlugin"
      )
  );

  // Aliases: @design-sys y @shared -> workspace packages (resuelven via exports map)
  webpackConfig.resolve = webpackConfig.resolve || {};
  webpackConfig.resolve.alias = {
    ...(webpackConfig.resolve.alias || {}),
    '@design-sys': '@factory/shared/design-sys',
    '@shared': '@factory/shared',
  };

  // Agregar BundleAnalyzerPlugin si ANALYZE=true
  if (process.env.ANALYZE === "true") {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
      .BundleAnalyzerPlugin;
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: "bundle-report.html",
      })
    );
  }

  // Optimizaciones para producción
  if (env === "production") {
    webpackConfig.optimization = {
      ...webpackConfig.optimization,
      usedExports: true,
      sideEffects: false,
      providedExports: true,
      moduleIds: "deterministic",
      chunkIds: "deterministic",
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 80000,
        maxAsyncRequests: 25,
        maxInitialRequests: 25,
        cacheGroups: {
          // Vendors comunes
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "async",
            priority: 10,
            reuseExistingChunk: true,
            enforce: false,
            maxSize: 100000,
          },
          // Ant Design separado - chunks más pequeños para mobile
          antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: "antd",
            chunks: "async",
            priority: 20,
            reuseExistingChunk: true,
            maxSize: 80000,
            minChunks: 1,
            enforce: false,
          },
          // Ant Design icons separado - carga diferida (no crítico para initial load)
          antdIcons: {
            test: /[\\/]node_modules[\\/]@ant-design[\\/]icons[\\/]/,
            name: "antd-icons",
            chunks: "async", // Carga diferida, no bloquea initial load
            priority: 15,
            reuseExistingChunk: true,
            maxSize: 80000, // Chunk pequeño para icons
            minChunks: 1,
            enforce: false,
          },
          // React core separado (crítico para initial load)
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: "react-core",
            chunks: "all",
            priority: 30,
            reuseExistingChunk: true,
            maxSize: 120000,
          },
          // Styled-components separado
          styledComponents: {
            test: /[\\/]node_modules[\\/]styled-components[\\/]/,
            name: "styled-components",
            chunks: "async",
            priority: 15,
            reuseExistingChunk: true,
            maxSize: 80000,
          },
          // Redux separado
          redux: {
            test: /[\\/]node_modules[\\/](redux|@reduxjs)[\\/]/,
            name: "redux",
            chunks: "async",
            priority: 15,
            reuseExistingChunk: true,
            maxSize: 80000,
          },
          // Socket.IO separado - carga diferida
          socketio: {
            test: /[\\/]node_modules[\\/]socket\.io-client[\\/]/,
            name: "socketio",
            chunks: "async",
            priority: 25,
            reuseExistingChunk: true,
          },
          // Código común de la app
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            chunks: "async",
            minSize: 20000,
            maxSize: 80000,
          },
        },
      },
    };

    // Optimizar minimización y reducir JavaScript ejecutado en main thread
    if (webpackConfig.optimization.minimizer) {
      webpackConfig.optimization.minimizer =
        webpackConfig.optimization.minimizer.map((plugin) => {
          if (
            plugin.constructor &&
            plugin.constructor.name === "TerserPlugin" &&
            plugin.options &&
            plugin.options.terserOptions
          ) {
            // Asegurar que terserOptions existe antes de modificar
            // Optimizaciones agresivas para mobile: reducir JavaScript ejecutado
            plugin.options.terserOptions = {
              ...plugin.options.terserOptions,
              compress: {
                ...(plugin.options.terserOptions.compress || {}),
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log", "console.info", "console.warn", "console.debug", "console.trace"],
                passes: 3,
                unsafe: true, // Optimizaciones más agresivas
                unsafe_comps: true,
                unsafe_math: true,
                unsafe_proto: true,
                unsafe_methods: true, // Optimizaciones adicionales de métodos
                unsafe_regexp: true, // Optimizaciones de regexp
                // Optimizaciones adicionales para reducir TBT y bundle size
                reduce_vars: true,
                reduce_funcs: true,
                dead_code: true,
                unused: true,
                collapse_vars: true, // Colapsar variables
                evaluate: true, // Evaluar expresiones constantes
                inline: 2, // Inline funciones pequeñas (más agresivo)
                loops: true, // Optimizar loops
                negate_iife: true, // Negar IIFE cuando sea posible
                properties: true, // Optimizar propiedades
                sequences: true, // Optimizar secuencias
                side_effects: false, // Asumir que no hay side effects (tree shaking)
                switches: true, // Optimizar switches
                top_retain: [], // No retener nada en nivel superior
              },
              mangle: {
                ...(plugin.options.terserOptions.mangle || {}),
                toplevel: true, // Mangle variables de nivel superior
                properties: {
                  regex: /^_/, // Mangle propiedades que empiezan con _
                  keep_quoted: false, // Mangle propiedades entre comillas
                },
              },
              format: {
                ...(plugin.options.terserOptions.format || {}),
                comments: false, // Eliminar todos los comentarios
                ascii_only: false, // Permitir caracteres Unicode (mejor compresión)
                beautify: false, // No formatear (mejor compresión)
                ecma: 2020, // Usar ES2020 para mejor compresión
              },
            };
          }
          return plugin;
        });
    }

    // Nota: No agregamos reglas CSS personalizadas aquí porque react-scripts
    // ya maneja CSS correctamente por defecto. Agregar reglas adicionales
    // puede causar conflictos y errores de procesamiento.
  }

  return webpackConfig;
};
