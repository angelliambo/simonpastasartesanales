/**
 * Textos para la página de configuración (options.html)
 * @type {object}
 */
export const options = {
  // Header
  headerTitulo: '{{nombreSitio}}',
  headerSlogan: 'コミュニケーションは最高潮に達します。',

  // Loading
  cargando: 'Cargando...',
  general: '一般',
  reading: '読書',
  dictation: 'ディクテーション',

  // Sección Idiomas
  sectionIdiomasTitulo: '言語設定',
  sectionIdiomasDesc: '入力言語 (マイクとツール) と出力言語 (音声と口述内容の書き込み) を選択します。',
  sectionIdiomasNote: 'この設定は、選択した出力言語でページのナレーションを行うナレーター モードにも影響します。',
  sectionIdiomasNoteIcon: 'ℹ️',

  // Sección Idiomas TTS/STT
  sectionIdiomasTTSSTT: '音声言語と書き言葉',
  sectionIdiomasTTSSTTDesc: '音声合成（TTS）と音声認識（STT）の言語を設定します。',

  // Auto-detección de idioma
  autoDetectLanguage: '言語を自動検出',
  autoDetectRecommended: '推奨',
  autoDetectLanguageDesc: '入力言語を自動的に検出して精度を高めます。',

  // Selectores de idioma entrada/salida
  idiomaEntrada: '入力言語',
  idiomaSalida: '出力言語 (音声と書き込み)',
  idiomaEntradaHint: 'マイクに向かって話すときに使用する言語を選択します',
  idiomaSalidaHint: 'テキストの読み取りまたは書き込みに使用する言語を選択します',

  // Selector idioma UI
  idiomaInterfaz: 'インターフェース言語',
  idiomaInterfazDesc: '拡張テキストの言語を選択します。',
  idiomaInterfazHint: 'インターフェース言語を変更すると、入力 (STT) 言語と出力 (TTS) 言語も自動的に同期されます。',

  // Opciones de idioma
  idiomaEspanolLatino: 'スペイン語 (ラテン語)',
  idiomaEspanolEspana: 'スペイン語 (スペイン)',
  idiomaInglesUSA: '英語 (アメリカ)',
  idiomaInglesUK: '英語(イギリス)',
  idiomaFrances: 'フランス語',
  idiomaPortugues: 'ポルトガル語',
  idiomaItaliano: 'イタリア語',
  idiomaAleman: 'ドイツ語',
  idiomaJapones: '日本語',

  // Sección Voz
  sectionVozTitulo: '読み取り速度',
  sectionVozDesc: '読み取り速度を選択してください',
  sectionVozNote: 'この設定はナレーター モードにも影響します。',
  sectionVozNoteIcon: 'ℹ️',

  // Velocidades
  velocidadLenta: '遅い',
  velocidadNormal: '普通',
  velocidadRapida: '素早い',

  // Sección Micrófono
  sectionMicTitulo: 'マイクロフォン',
  sectionMicDesc: 'マイクをオンまたはオフにしてテキストを音声入力します',
  micActivo: 'アクティブ化された',
  micInactivo: '無効',
  micTiempoActivo: 'マイクのアクティブ時間:',
  micTiempo10seg: '10秒(デフォルト)',
  micTiempo1min: '1分',
  micTiempoMantener: 'アクティブに保ちます',
  dblClickActivo: 'ダブルクリック有効',
  dblClickInactivo: 'ダブルクリック無効',
  dblClickDesc: 'ダブルクリックでテキストをディクテーション',

  // Sección Narración Visual
  sectionNarracionTitulo: 'ビジュアルナレーション',
  sectionNarracionDesc: 'ページナレーション中に表示される視覚要素を制御します。',
  subtitulosLabel: '字幕',
  subtitulosDesc: 'ナレーションされたテキストを画面下部に表示します。',
  subtitulosActivado: '有効',
  subtitulosDesactivado: '無効',
  resaltadoLabel: 'ハイライト',
  resaltadoDesc: 'Resalta visualmente el texto que se está leyendo.',
  resaltadoActivado: '有効',
  resaltadoDesactivado: '無効',

  // Demo
  pdfSectionTitulo: 'Lector de PDF',
  pdfSectionDesc: 'PDFファイル内でZenithNexusを使用して、テキストを読み上げます。',

  sectionDemoTitulo: 'デモとテスト',
  sectionDemoDesc: '{{nombreSitio}} 機能を使用する前にテストしてください',

  // Demo TTS
  demoTTS: '読解テスト',
  demoTTSHint: 'ボタンをクリックすると、選択した速度でテストテキストが聞こえます。',
  demoTTSPlay: 'デモをプレイする',
  demoTTSPlaying: '遊んでいます...',

  // Demo STT
  demoSTT: 'ライティングテスト',
  demoSTTHint: 'マイクを有効にして話すと、自分の声がテキストに書き起こされるのを確認できます。',
  demoSTTActivar: 'ディクテーションを開始する',
  demoSTTDetener: 'ディクテーションを停止する',
  demoSTTPlaceholder: ' 上のマイクを有効にしてディクテーションを開始します...\n話したテキストはここに自動的に表示されます。',
  demoPremiumNote: '無制限のディクテーションはプレミアム機能です。ここでお試しいただき、気に入ったら完全なプランを入手してください。',
  demoMicInactivo: 'マイクが非アクティブです',
  demoMicEscuchando: 'リスニング...',

  // Estado demos
  demoTranslating: '翻訳中...',
  demoComplete: '再生が完了しました',
  demoError: 'プレイ中のエラー',
  demoNavegadorNoSoportado: 'お使いのブラウザはサポートしていません',

  // Atajos
  sectionShortcutsTitulo: 'キーボードショートカット',
  sectionShortcutsDesc: 'これらのショートカットを使用して、{{nombreSitio}} をすばやく制御します。',
  shortcutLeer: '読む',
  shortcutDetener: '逮捕',
  shortcutMic: 'マイクロフォン',
  shortcutEscritura: '自動書き込み',
  shortcutLeerDesc: '選択したテキストを読み上げる',
  shortcutDetenerDesc: '現在の読み取りを停止します',
  shortcutMicDesc: 'マイクをアクティブにしてテキストを音声入力します',
  shortcutEscrituraDesc: 'テキスト選択時の自動読み上げを有効/無効にする',
  shortcutMac: 'Macユーザー向け',
  shortcutMacDesc: 'Mac では、Ctrl キーは Command (⌘) に置き換えられます。',
  shortcutMacExample: '例: Ctrl+Shift+L → ⌘+Shift+L',

  // Guardado
  btnGuardar: '設定の保存',
  statusGuardado: '設定が正常に保存されました。',
  statusError: '設定の保存中にエラーが発生しました',

  // アニメーションセクション
  animationsTitulo: 'アニメーションと視覚効果',
  animationsDesc: '拡張機能のアニメーションと視覚効果を有効または無効にします。これには、アニメーション背景、トランジション、その他の効果が含まれます。',
  animationsActivadas: 'アニメーション有効',
  animationsDesactivadas: 'アニメーション無効',
  animationsPreviewOn: 'アニメーションが表示されています',
  animationsPreviewOff: 'アニメーションが無効になっています',

  // ツールバーセクション
  sectionToolbarTitulo: 'ツールバー',
  sectionToolbarDesc: 'Webページ上のフローティングツールバーの表示を制御します。',
  toolbarLabel: 'ツールバーを表示',
  toolbarDesc: 'Webページに読書コントロール付きのフローティングツールバーを表示します。',
  toolbarVisible: '表示',
  toolbarOculto: '非表示',

  // 寄付/購読
  sectionDonacionTitulo: 'プロジェクトを支援する',
  sectionDonacionDesc: '{{nombreSitio}} は無料です。気に入ったら、プロジェクトを存続させるために購読を検討してください。',
   sectionDonacionLink: '購読する',
   footerDonacionTitle: 'プロジェクトを支援する',
   footerDonacionCta: 'プロジェクトを支援',
   footerDonacionThanks: 'ご支援ありがとうございます！',

   // Footer
   footerNote: '設定のその他のオプション',
  footerTerminos: '利用規約',
  footerPrivacidad: 'プライバシーポリシー',

  // Términos y Condiciones
  sectionTerminosTitulo: '利用規約',
  sectionTerminosDesc: 'ZenithNexus を使用するには、使用条件に同意する必要があります。',
  terminosVersion: 'バージョン',
  terminosEstadoAceptado: '承認されました',
  terminosEstadoPendiente: '承認待ち',
  terminosEstadoActualizado: '新しいバージョンを受け入れる必要があります',
  terminosAceptar: '規約に同意する',
  terminosCheckbox: '読んで同意します',
  terminosLink: '利用規約',
  terminosFechaAceptacion: 'に受け入れられました',
  terminosBtnDesbloquear: '機能のロックを解除する',

  blocklistSectionTitulo: 'ブロックリスト',
  blocklistSectionDesc: '拡張機能を作動させないウェブサイトと言語を管理します。',
  blocklistSitesTitle: '無効化されたウェブサイト',
  blocklistSitesDesc: '拡張機能はこれらのサイトで完全に無効になります。',
  blocklistLanguagesTitle: '無視する言語',
  blocklistLanguagesDesc: 'これらの言語では言語検出モーダルは表示されません。',
  blocklistInputPlaceholder: 'ドメインまたはURLを入力してください (例: github.com)',
  blocklistAddBtn: '追加',
  blocklistNoSites: '無効化されたサイトはありません。',
  blocklistNoLanguages: '無視する言語はありません。',
  blocklistLanguageSelectPlaceholder: '言語を選択...',

  // 音声コマンドヘルプ
  voiceCommandsHelpTitle: '音声コマンドガイド',
  voiceCommandsHelpDesc: '句読点やテキストの書式設定に関するキーワードを確認します。',
  voiceCommandsSearchPlaceholder: 'コマンドまたは記号を検索 (例: 読点、太字)...',
  voiceCommandsNoResults: '検索条件に一致するコマンドが見つかりません。',
};

export default {};
