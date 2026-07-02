/**
 * Textos para el popup (popup.html)
 * @type {object}
 */
export const popup = {
  // Header
  headerTitulo: '{{nombreSitio}}',

  // Estado Micrófono
  micVerificando: 'チェック中...',
  micEsperandoConfig: '構成を待っています',
  micListo: 'マイク準備完了',
  micActivo: 'リスニング',
  micInactivo: 'マイクが無効になっています',
  micError: 'マイクエラー',
  micClickParaActivar: 'クリックして有効にする',

  // Estado Micrófono - Hardcodeados anteriormente en popup.js
  micListoLabel: 'マイク対応',
  micListoHint: 'Ctrl+Shift+Q を押して口述入力します',
  micActivoLabel: 'リスニング...',
  micActivoHint: 'このページに口述入力する',
  micSinConfigurarLabel: '未構成',
  micSinConfigurarHint: '設定で有効化する',
  micRevisarPermisos: '権限を確認',
  micConfigurando: '設定中...',

  // Botones acciones
  btnDictar: '口述する',
  btnLeer: '選択範囲の読み取り',
  btnDetener: '逮捕',

  // Tooltips
  btnDictarTitle: 'マイクをアクティブにして口述入力する',
  btnLeerTitle: '選択したテキストを読み上げる',

  // Atajos
  shortcutTitulo: 'ショートカット',
  shortcutMic: 'マイクをアクティブにする',
  shortcutLeer: '選択範囲の読み取り',

  // Footer
  footerConfig: '設定',
  footerNote: '設定のその他のオプション',
  btnPipTitle: 'フローティングコンソール (常に手前に表示)',
  btnPip: 'フローティング'
};

export default {};
