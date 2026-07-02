/**
 * Textos para el content script (content.ts)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: '{{nombreSitio}}',
    mensaje: 'このページは{{idioma}}です。{{nombreSitio}} にその言語で読み上げさせますか？',
    btnUnaVez: 'この 1 回だけ',
    btnSiempre: 'はい、すべてのサイトで常に',
    btnSitio: 'はい、このサイトだけ',
    btnNunca: '二度と邪魔しない'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'サポートされていない言語',
    mensaje: 'このページは{{idioma}}です。ZenithNexus はこの言語を完全にサポートしていません。エクスペリエンスは最適ではない可能性があります。',
    btnAuto: '自動認識を有効にする',
    btnConfig: '設定で変更',
    btnIgnorar: '無視'
  },

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: '言語が検出されました',
    mensaje: 'このページは{{idioma}}です。より良いエクスペリエンスのために{{nombreSitio}}を適応させますか？',
    btnCambiar: '言語を変更',
    btnAuto: '自動認識を有効にする',
    btnMantener: '現状を維持'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: '言語が検出されました'
  },

  // Banner de permisos
  permisos: {
    titulo: 'マイクの権限',
    mensaje: '{{nombreSitio}} はテキストをディクテーションするためにマイクアクセスが必要です。',
    btnActivar: '今すぐ有効化',
    btnActivarMicrofono: 'マイクを有効化',
    btnMasTarde: '後で'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'ディクテーション中...',
    listening: '聴いています...',
    waiting: '待機中...',
    dormant: '休止中',
    error: 'マイクエラー'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: '準備中...',
    traduciendo: '翻訳中...',
    lectura: '読み上げ中...',
    narracion: 'ページを読み上げ中...'
  },

   // Notificaciones
   notificacion: {
     lecturaDetenida: '読み上げ停止',
     dictamenDetenido: 'ディクテーション停止',
     errorContenido: 'このページのメインコンテンツを検出できませんでした。'
   },

   // PDFリーダー
   pdfReader: {
     titulo: 'PDFリーダー - ZenithNexus',
     paginaDe: 'ページ {{actual}} / {{total}}',
     play: '再生',
     stop: '停止',
     next: '次へ',
     prev: '前へ',
     irAPagina: 'ページへ移動',
     cargando: '読み込み中...',
     precargando: 'ページ{{pagina}}を事前読み込み中...',
     leyendo: 'ページ{{pagina}}を読み上げ中...',
     pausado: '一時停止',
     detenido: '停止中',
     completado: '読み上げ完了',
     reanudar: 'ページ{{pagina}}から再開',
     empezarDesdeInicio: '最初から開始',
     ultimaLeida: '最後に読んだページ: {{pagina}}',
     progreso: '進捗: {{porcentaje}}%',
     errorPagina: 'ページ{{pagina}}の読み込みエラー',
      errorPDF: 'PDF処理エラー',
      texto: 'テキスト',
      tablaContenido: '目次',
      marcadores: 'ブックマーク',
      velocidadLenta: '遅い',
      velocidadNormal: '標準',
      velocidadRapida: '速い',
      ocultarToolbar: 'ツールを非表示',
      ocultarCompletamente: '完全に非表示',
      dictar: 'ディクテーション',
      resaltar: 'ハイライト',
      configuracion: '設定'
    },

    // ドキュメントのヒント
    documentTip: {
      googleDocs: '{{titulo}} · {{leer_hotkey}}で読み上げ · {{microfono_hotkey}}で音声入力',
      pdf: 'PDF検出 · ツールを準備中...'
    },

    // ツールバー - 視覚的なナレーションコントロール
    visualControls: {
      toggleSubs: '字幕のオン/オフ',
      toggleHighlight: 'テキストハイライトのオン/オフ'
    },

    terminosPopup: {
      funcLectura: '読み上げ',
      funcMicrofono: 'マイク',
      funcEscritura: '自動筆記',
      funcNarrador: 'ページナレーター',
      btnAceptarContinuar: '同意して続ける',
      cuerpoAntesFunc: '',
      cuerpoDespuesFunc: 'を使用するには、ZenithNexusの利用規約に同意する必要があります。',
    },

    // Ventana Picture-in-Picture (PiP)
    pip: {
      reading: '読み上げ中',
      recording: '音声入力中',
      ready: '準備完了',
      progress: '進捗状況',
      listening: '聴取中...',
      listeningPlaceholder: 'ディクテーションされたテキストがここに表示されます...',
      copy: 'コピー',
      clear: 'クリア',
      stopMic: 'マイクを無効化',
      startMic: 'マイクを有効化',
      pause: '一時停止',
      play: '再生',
      stop: 'すべて停止',
      speed: '速度:',
      trial: '体験版'
    }
};
