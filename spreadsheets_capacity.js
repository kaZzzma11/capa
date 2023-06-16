function autoLine(e) {
  /* ステップ1: フォームのデータを取得する */
  //すべての質問と回答を取得する
  let itemResponses = e.response.getItemResponses();

  /* ステップ2: 必要なデータを抽出する */
  //個々の質問と回答を格納するための空配列を宣言する
  let questionAndAnswers = [];

  //for文(ループ)で変数itemResponsesから個々の質問と回答を取得する
  for(let i = 0; i < itemResponses.length; i++) {
    //質問のタイトルを取得する
    let questionTitle = itemResponses[i].getItem().getTitle();

    //回答を取得する
    let answer = itemResponses[i].getResponse();
    
    //未回答の質問かどうかで送信文章を調整する
    if(!answer) {
      questionAndAnswers.push(questionTitle + ": 未回答");
    } else {
      questionAndAnswers.push("≪" + questionTitle + "≫\n" + answer + "\n");
    }
  }

  /* ステップ3: 宛先、本文を決める */
  //LINEの宛先
  //★★★LINE Notifyのトークンを入力してください★★★
  let token = "ZJZD3G02oS1js2CfPuha0iHKNsNyBWDIqy2VKu7QoTG";

  //LINEの本文
  //★★★お好きな本文に変更ください★★★
  let body = "\nフォームの回答を受信しました。\n"
           + "\n"
             //一次元配列questionAndAnswersに対してjoinメソッドを使って文字列を作成する
             //区切り文字は改行"\n"
           + questionAndAnswers.join("\n");
  
  /* ステップ4: 管理者にLINEを送信する */
  //管理者にLINEを送信する
  sendLine(token, body);
}

function sendLine(token, body) {
  let options =
   {
     "method"  : "post",
     "payload" : {"message": body,
                  }, 
     "headers" : {"Authorization" : "Bearer "+ token}
   };

   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}