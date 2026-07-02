const React = require("react");

let defaultTheme = {};

const isPlainObject = (value) =>
  value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  !(value instanceof Date);

const deepMerge = (base, override) => {
  if (!isPlainObject(base)) {
    return isPlainObject(override) ? { ...override } : override;
  }
  if (!isPlainObject(override)) {
    return { ...base };
  }

  const result = { ...base };

  Object.keys(override).forEach((key) => {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (isPlainObject(baseValue) || isPlainObject(overrideValue)) {
      result[key] = deepMerge(
        isPlainObject(baseValue) ? baseValue : {},
        isPlainObject(overrideValue) ? overrideValue : {}
      );
      return;
    }

    result[key] = overrideValue;
  });

  return result;
};

const ensureThemeShape = (theme) => {
  if (Object.keys(defaultTheme).length === 0) {
    return theme || {};
  }
  if (!theme) {
    return { ...defaultTheme };
  }
  return deepMerge(defaultTheme, theme);
};

try {
  const themesModule = require("../styles/themes");
  if (themesModule && typeof themesModule.getCombinedTheme === "function") {
    defaultTheme = themesModule.getCombinedTheme("light", "default") || {};
  } else if (themesModule && themesModule.lightTheme) {
    defaultTheme = themesModule.lightTheme || {};
  }
} catch (error) {
  defaultTheme = {
    colors: {
      primary: {
        50: "#e6f7ff",
        100: "#bae7ff",
        200: "#91d5ff",
        300: "#69c0ff",
        400: "#40a9ff",
        500: "#1890ff",
        600: "#096dd9",
        700: "#0050b3",
        800: "#003a8c",
        900: "#002766",
      },
      secondary: {
        50: "#fff1f0",
        100: "#ffccc7",
        200: "#ffa39e",
        300: "#ff7875",
        400: "#ff4d4f",
        500: "#f5222d",
        600: "#cf1322",
        700: "#a8071a",
        800: "#820014",
        900: "#5c0011",
      },
      background: {
        primary: "#ffffff",
        secondary: "#f5f5f5",
        tertiary: "#fafafa",
        surface: "#ffffff",
        card: "#ffffff",
      },
      text: {
        primary: "#1f1f1f",
        secondary: "#595959",
        tertiary: "#8c8c8c",
        inverse: "#ffffff",
      },
      border: {
        light: "#f0f0f0",
        normal: "#d9d9d9",
        dark: "#bfbfbf",
      },
      feedback: {
        success: "#52c41a",
        warning: "#faad14",
        error: "#ff4d4f",
        info: "#1890ff",
      },
    },
    typography: {
      fontFamily:
        '"Rubik", "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
      },
    },
    shadows: {
      xs: "0 2px 4px rgba(15, 23, 42, 0.06)",
      sm: "0 3px 6px rgba(15, 23, 42, 0.08)",
      md: "0 6px 16px rgba(15, 23, 42, 0.12)",
      lg: "0 12px 32px rgba(15, 23, 42, 0.18)",
    },
  };
}

const htmlElements = [
  "a",
  "article",
  "aside",
  "button",
  "blockquote",
  "canvas",
  "circle",
  "code",
  "dd",
  "dt",
  "div",
  "dl",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "img",
  "input",
  "kbd",
  "label",
  "li",
  "line",
  "main",
  "mark",
  "nav",
  "option",
  "ol",
  "p",
  "path",
  "pre",
  "section",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "textarea",
  "details",
  "tfoot",
  "th",
  "thead",
  "tr",
  "summary",
  "ul",
  "video",
];

const toCamelCase = (prop) =>
  prop
    .trim()
    .replace(/^-+/, "")
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase());

const parseStyleString = (styleString) => {
  if (!styleString || typeof styleString !== "string") {
    return {};
  }

  const cleanedString = styleString.replace(/\/\*[\s\S]*?\*\//g, "");

  return cleanedString
    .split(";")
    .map((rule) => rule.trim())
    .filter(Boolean)
    .reduce((acc, rule) => {
      const [property, value] = rule.split(":");
      if (!value) {
        return acc;
      }

      const cleanProp = property.trim();
      if (
        !cleanProp ||
        cleanProp.startsWith("&") ||
        cleanProp.startsWith("@") ||
        /[(){}]/.test(cleanProp) ||
        cleanProp.includes("minWidth") ||
        cleanProp.includes("maxWidth ")
      ) {
        return acc;
      }

      const sanitizedValue = value.trim().replace(/}+$/, "").trim();
      acc[toCamelCase(cleanProp)] = sanitizedValue;
      return acc;
    }, {});
};

const toKebabCase = (prop) =>
  prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/^ms-/, "-ms-");

const objectToCss = (obj) => {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof key === "symbol") {
        return "";
      }
      if (value == null || value === "") {
        return "";
      }
      if (typeof value === "symbol") {
        return "";
      }
      if (typeof value === "object") {
        return "";
      }
      return `${toKebabCase(key)}: ${value};`;
    })
    .filter(Boolean)
    .join("");
};

const resolveInterpolation = (value, props) => {
  if (typeof value === "function") {
    return resolveInterpolation(value(props), props);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveInterpolation(item, props)).join("");
  }

  if (value && typeof value === "object") {
    if (typeof value.__getStyles === "function") {
      return resolveInterpolation(value.__getStyles(props), props);
    }

    if ("styles" in value) {
      return resolveInterpolation(value.styles, props);
    }

    return objectToCss(value);
  }

  if (value == null) {
    return "";
  }

  return value;
};

const evaluateInterpolations = (strings, interpolations, props) => {
  if (!strings) {
    return "";
  }

  let result = strings[0] || "";
  for (let i = 0; i < interpolations.length; i += 1) {
    const interpolation = resolveInterpolation(interpolations[i], props);
    result += `${interpolation}${strings[i + 1] || ""}`;
  }

  return result;
};

const formatPercent = (value) => {
  const rounded = Number.isInteger(value)
    ? `${value}`
    : value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
  return `${rounded}%`;
};

const getPercentFromSpan = (value, total = 24) => {
  if (typeof value !== "number" || value <= 0) {
    return undefined;
  }
  const percent = (value / total) * 100;
  return formatPercent(percent);
};

const applyRowAdjustments = (props = {}, style = {}, strings) => {
  const nextStyle = { ...style };
  const templateString = Array.isArray(strings) ? strings.join(" ") : strings || "";
  const isRowLike =
    "$gutter" in props ||
    "$align" in props ||
    "$justify" in props ||
    templateString.includes("align-items");

  if (!isRowLike) {
    return nextStyle;
  }

  const alignMap = {
    top: "flex-start",
    middle: "center",
    bottom: "flex-end",
    stretch: "stretch",
  };

  const justifyMap = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    "space-around": "space-around",
    "space-between": "space-between",
    "space-evenly": "space-evenly",
  };

  const alignKey = props.$align || "top";
  if (!nextStyle.alignItems) {
    nextStyle.alignItems = alignMap[alignKey] || "flex-start";
  }

  const justifyKey = props.$justify || "start";
  if (!nextStyle.justifyContent) {
    nextStyle.justifyContent = justifyMap[justifyKey] || "flex-start";
  }

  const wrapValue =
    props.$wrap === undefined ? "wrap" : props.$wrap ? "wrap" : "nowrap";
  nextStyle.flexWrap = wrapValue;

  if (Array.isArray(props.$gutter)) {
    const [horizontal = 0, vertical = 0] = props.$gutter;
    if (horizontal > 0) {
      nextStyle.marginLeft = `-${horizontal / 2}px`;
      nextStyle.marginRight = `-${horizontal / 2}px`;
      if (!nextStyle.columnGap) {
        nextStyle.columnGap = `${horizontal}px`;
      }
    } else {
      nextStyle.marginLeft = nextStyle.marginLeft || "0px";
      nextStyle.marginRight = nextStyle.marginRight || "0px";
      if (!nextStyle.columnGap) {
        nextStyle.columnGap = "0px";
      }
    }

    if (!nextStyle.rowGap) {
      nextStyle.rowGap = `${vertical}px`;
    }
  }

  return nextStyle;
};

const resolveResponsiveConfig = (config) => {
  if (!config) {
    return undefined;
  }
  if (typeof config === "number") {
    return { span: config };
  }
  return config;
};

const applyColAdjustments = (props = {}, style = {}, strings) => {
  const nextStyle = { ...style };
  const templateString = Array.isArray(strings) ? strings.join(" ") : strings || "";
  const colIndicators = [
    "$span",
    "$offset",
    "$order",
    "$pull",
    "$push",
    "$xs",
    "$sm",
    "$md",
    "$lg",
    "$xl",
    "$xxl",
    "__gutter",
  ];
  const isColLike =
    colIndicators.some((indicator) => indicator in props) ||
    templateString.includes("flex: 0 0 auto;");

  if (!isColLike) {
    return nextStyle;
  }

  const applySpan = (value) => {
    const percent = getPercentFromSpan(value);
    if (percent) {
      nextStyle.width = percent;
      nextStyle.maxWidth = percent;
    }
  };

  let baseApplied = false;
  if (props.$span) {
    applySpan(props.$span);
    baseApplied = props.$span !== 24;
  }

  const offsetPercent = getPercentFromSpan(props.$offset);
  if (offsetPercent) {
    nextStyle.marginLeft = offsetPercent;
  }

  if (props.$order !== undefined) {
    nextStyle.order = `${props.$order}`;
  }

  const pullPercent = getPercentFromSpan(props.$pull);
  if (pullPercent) {
    nextStyle.right = pullPercent;
  }

  const pushPercent = getPercentFromSpan(props.$push);
  if (pushPercent) {
    nextStyle.left = pushPercent;
  }

  if (Array.isArray(props.__gutter)) {
    const [horizontal = 0] = props.__gutter;
    nextStyle.paddingLeft = `${horizontal / 2}px`;
    nextStyle.paddingRight = `${horizontal / 2}px`;
  }

  const responsiveKeys = ["$xs", "$sm", "$md", "$lg", "$xl", "$xxl"];
  responsiveKeys.forEach((key, index) => {
    if (!(key in props)) {
      return;
    }
    const config = resolveResponsiveConfig(props[key]);
    if (!config) {
      return;
    }

    // Solo aplicar xs como base si no hay span ya definido.
    if (key === "$xs" && !baseApplied) {
      if (config.span) {
        applySpan(config.span);
        baseApplied = true;
      }
      if (config.offset) {
        nextStyle.marginLeft = getPercentFromSpan(config.offset);
      }
      if (config.order !== undefined) {
        nextStyle.order = `${config.order}`;
      }
      return;
    }

    // Otros breakpoints dependen de media queries; en el mock no se aplican.
    if (index > 0) {
      return;
    }
  });

  return nextStyle;
};

const applyKnownAdjustments = (props, style, strings) => {
  let adjusted = applyRowAdjustments(props, style, strings);
  adjusted = applyColAdjustments(props, adjusted, strings);
  return adjusted;
};

const ThemeContext = React.createContext(ensureThemeShape());

const mergeOptions = (base = {}, extra = {}) => {
  const baseAttrs = base.attrsResolvers || [];
  const extraAttrs = extra.attrsResolvers || [];

  return {
    attrsResolvers: [...baseAttrs, ...extraAttrs],
    shouldForwardProp:
      extra.shouldForwardProp !== undefined
        ? extra.shouldForwardProp
        : base.shouldForwardProp,
  };
};

const defaultShouldForwardProp = (prop) =>
  typeof prop === "string" && !prop.startsWith("$");

const createComponentFactory = (target, options = {}) => {
  const { attrsResolvers = [], shouldForwardProp } = options;

  const createStyledComponent = (template) => {
    const { strings, interpolations } = template || {};

    const StyledComponent = React.forwardRef((incomingProps = {}, ref) => {
      const themeFromContext = ensureThemeShape(
        React.useContext(ThemeContext) || defaultTheme
      );

      let mergedProps = { ...incomingProps };
      attrsResolvers.forEach((resolver) => {
        const resolved =
          typeof resolver === "function" ? resolver(mergedProps) : resolver;
        if (resolved && typeof resolved === "object") {
          mergedProps = { ...resolved, ...mergedProps };
        }
      });

      if (!mergedProps.theme) {
        mergedProps.theme = themeFromContext;
      } else {
        mergedProps.theme = ensureThemeShape(mergedProps.theme);
      }

      const resolvedTheme = ensureThemeShape(mergedProps.theme);
      mergedProps.theme = resolvedTheme;

      const {
        as: asProp,
        children,
        style: inlineStyle,
        theme: _themeProp,
        ...rest
      } = mergedProps || {};

      const styleString = evaluateInterpolations(
        strings,
        interpolations || [],
        mergedProps
      );
      const computedStyle = parseStyleString(styleString);
      const enhancedStyle = applyKnownAdjustments(
        mergedProps,
        computedStyle,
        strings
      );

      const finalStyle =
        inlineStyle && typeof inlineStyle === "object"
          ? { ...enhancedStyle, ...inlineStyle }
          : enhancedStyle;

      const element = typeof target === "string" ? asProp || target : target;

      const forwardChecker =
        typeof shouldForwardProp === "function"
          ? shouldForwardProp
          : defaultShouldForwardProp;

      const elementProps = {};

      Object.entries(rest).forEach(([key, value]) => {
        if (!forwardChecker(key, value)) {
          return;
        }

        if (typeof element === "string") {
          if (key === "theme") {
            return;
          }

          if (key.startsWith("$")) {
            return;
          }

          if (key === "zIndex") {
            finalStyle.zIndex = value;
            return;
          }

          if (
            typeof value === "object" &&
            value !== null &&
            key !== "style" &&
            !Array.isArray(value)
          ) {
            return;
          }
        }

        elementProps[key] = value;
      });

      if (typeof element === "string") {
        delete elementProps.theme;
      }

      if (Object.keys(finalStyle).length > 0) {
        elementProps.style = finalStyle;
      }

      elementProps.ref = ref;

      return React.createElement(element, elementProps, children);
    });

    const targetLabel =
      typeof target === "string"
        ? target
        : target && (target.displayName || target.name)
        ? target.displayName || target.name
        : "Component";

    StyledComponent.displayName = `MockStyled(${targetLabel})`;

    const chain = (extra = {}) =>
      createTaggedTemplate(target, mergeOptions(options, extra));

    StyledComponent.withConfig = (config = {}) =>
      chain({ shouldForwardProp: config.shouldForwardProp });
    StyledComponent.attrs = (attrResolver) => {
      const resolver =
        typeof attrResolver === "function" ? attrResolver : () => attrResolver;
      return chain({ attrsResolvers: [resolver] });
    };
    StyledComponent.extend = () => chain();

    return StyledComponent;
  };

  const templateFunction = (strings, ...interpolations) =>
    createStyledComponent({ strings, interpolations });

  templateFunction.withConfig = (config = {}) =>
    createTaggedTemplate(target, mergeOptions(options, config));

  templateFunction.attrs = (attrResolver) => {
    const resolver =
      typeof attrResolver === "function" ? attrResolver : () => attrResolver;
    return createTaggedTemplate(target, {
      attrsResolvers: [...attrsResolvers, resolver],
      shouldForwardProp,
    });
  };

  templateFunction.extend = () =>
    createTaggedTemplate(target, { attrsResolvers, shouldForwardProp });

  return templateFunction;
};

const createTaggedTemplate = (target, options) =>
  createComponentFactory(target, options);

const styledProxy = new Proxy(() => createTaggedTemplate("div"), {
  apply(_target, _thisArg, args) {
    const [tag] = args;
    const tagName = typeof tag === "string" ? tag : "div";
    return createTaggedTemplate(tagName);
  },
  get(_target, prop) {
    if (prop === "default") {
      return styledProxy;
    }
    if (prop === "ThemeProvider") {
      return ({ theme, children }) =>
        React.createElement(
          ThemeContext.Provider,
          { value: ensureThemeShape(theme) },
          children
        );
    }
    if (prop === "StyleSheetManager") {
      return ({ children }) =>
        React.createElement(React.Fragment, null, children);
    }
    if (prop === "ServerStyleSheet") {
      class ServerStyleSheetMock {
        collectStyles(children) {
          return children;
        }
        getStyleTags() {
          return "";
        }
        getStyleElement() {
          return [];
        }
        seal() {
          return undefined;
        }
      }
      return ServerStyleSheetMock;
    }
    if (prop === "css") {
      return (strings, ...interpolations) => {
        const cssFn = (props = {}) =>
          evaluateInterpolations(strings, interpolations, props);
        cssFn.__getStyles = (props = {}) =>
          evaluateInterpolations(strings, interpolations, props);
        return cssFn;
      };
    }
    if (prop === "keyframes") {
      return (strings, ...interpolations) =>
        evaluateInterpolations(strings, interpolations, {});
    }
    if (prop === "createGlobalStyle") {
      return (strings, ...interpolations) => {
        const GlobalStyle = (props = {}) => {
          const theme = ensureThemeShape(
            React.useContext(ThemeContext) || props.theme || {}
          );
          React.useEffect(() => {
            const styleElement = document.createElement("style");
            styleElement.setAttribute("data-styled-mock", "true");
            styleElement.innerHTML = evaluateInterpolations(
              strings,
              interpolations,
              {
                ...props,
                theme,
              }
            );
            document.head.appendChild(styleElement);
            return () => {
              if (styleElement.parentNode) {
                styleElement.parentNode.removeChild(styleElement);
              }
            };
          }, [theme, props]);
          return null;
        };
        return GlobalStyle;
      };
    }
    if (prop === "__esModule") {
      return true;
    }
    if (prop === "ThemeContext") {
      return ThemeContext;
    }
    if (prop === "useTheme") {
      return () => React.useContext(ThemeContext);
    }

    const propName = String(prop);
    if (htmlElements.includes(propName)) {
      return createTaggedTemplate(propName);
    }

    // Soporte básico para styled(Component)
    if (typeof prop === "function") {
      return createTaggedTemplate("div");
    }

    return undefined;
  },
});

const createStyledComponentHelper = (component, template, ...interpolations) => {
  const factory =
    typeof component === "string"
      ? styledProxy[component] || styledProxy(component)
      : styledProxy(component);

  if (typeof template === "string") {
    return factory([template], ...interpolations);
  }

  if (Array.isArray(template) && template.raw) {
    return factory(template, ...interpolations);
  }

  if (template && typeof template === "object" && Array.isArray(template.strings)) {
    return factory(template.strings, ...(template.interpolations || []));
  }

  return factory([""], []);
};

module.exports = styledProxy;
module.exports.default = styledProxy;
module.exports.ThemeProvider = styledProxy.ThemeProvider;
module.exports.css = styledProxy.css;
module.exports.keyframes = styledProxy.keyframes;
module.exports.createGlobalStyle = styledProxy.createGlobalStyle;
module.exports.StyleSheetManager = styledProxy.StyleSheetManager;
module.exports.ServerStyleSheet = styledProxy.ServerStyleSheet;
module.exports.ThemeContext = ThemeContext;
module.exports.useTheme = styledProxy.useTheme;
module.exports.createStyledComponent = createStyledComponentHelper;

if (typeof global !== "undefined") {
  global.createStyledComponent = createStyledComponentHelper;
}
