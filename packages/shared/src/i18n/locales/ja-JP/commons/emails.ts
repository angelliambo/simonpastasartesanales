export const emails = {
  ticket: {
    received: "お問い合わせを受け付けました。折り返し担当者よりご連絡いたします。",
    id: "チケットID",
    message: "メッセージ",
    userNumber: "ユーザー N°",
    reply: "<strong>ZenithNexus</strong>のサポート担当者が、サポートチケット <strong>{{ticketId}}</strong> に返信しました。",
    replyLabel: "サポートからの返信:",
    followUp: "ポータルにログインして返信または進捗を確認してください。",
  },
  deletion: {
    request: "アカウントの削除リクエストを受信しました。",
    code: "確認のため、以下のコードを入力してください。",
    expiry: "このコードの有効期限は15分です。削除をリクエストしていない場合は、このメッセージを無視してください。",
    confirmed: "アカウントの削除がスケジュールされました。",
    dataRetention: "税法上の義務を果たすために必要なデータは、7年間匿名で保管されます。その他の情報はすべて削除されました。",
  },
  wellcome: {
    title: "<strong>ZenithNexus</strong> へようこそ！",
    success: "アカウントが正常に作成されました。これで、拡張機能を使用して以下を実行できます。",
    feature1: "句読点認識機能付きテキストの音声入力",
    feature2: "任意のウェブページを音声で読み上げ",
    feature3: "ナレーター機能によるPDFドキュメントの閲覧",
    feature4: "キーボードショートカットによるすべての操作",
    download: "<a href=\"https://chromewebstore.google.com\" style=\"color:#818cf8;\">Chromeウェブストア</a>から拡張機能をダウンロードして、すぐにZenithNexusを使い始めましょう。",
  },
  subject: {
    ticket: "お問い合わせを受け付けました",
    deletionCode: "確認コード — アカウントの削除",
    deletionConfirmation: "アカウントの削除スケジュール完了",
    wellcome: "ZenithNexus へようこそ！",
    ticketReply: "お問い合わせへの返信 - {{ticketId}}",
  },
};

export default {};
