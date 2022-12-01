# 近所に詳しくなろうぜアプリ
## ①課題内容（どんな作品か）
- 現在地周辺のWikipediaの記事をとってきます。

- 主な機能
  - Bing Mapで現在地データを取得します
  - 「ご近所ハカセになる」ボタンを押すと、現在地の緯度・経度に基づいたWikipediaの記事を10件返します
  - 記事の緯度・経度情報に基づき、マップにピンを表示します
  - 本当は、Wikipediaの記事の概要も取得したかったけど、取れそうで取れませんでした
  - なお「ご近所ハカセにならない」ボタンを押すと、例のアレが表示されます

## ②工夫した点・こだわった点
- Wikipediaの記事の中には、緯度・経度情報を持つものがあると知り、マップと組み合わせてみました。
  - 他にもWikipediaのAPIでできることはだいぶ多そう(画像取ってくるなどやってみたかった)

## ③難しかった点・次回トライしたいこと(又は機能)
- お手本にしたコードが素のJavaScriptで書かれてて、解読にだいぶ手こずった
  - たぶんこういう機会は増えていくので、jQueryを使わない書き方を(書けなくてもせめて)読めるようにせねばならない と思われる

- 記事概要の取得ができそうでできなかった
  - fetchの書き方の問題か、取得してきたJSONに記事のサマリを含めることがどうしてもできなかった

- 同期・非同期・promiseを理解してない
  - 理解していないのにツギハギでなんとなく出来てしまった…

## ④質問・疑問・感想、シェアしたいこと等なんでも
###  参考記事
- 読んだけどいまいち理解できていない、同期と非同期関連のやつ
  - [同期処理と非同期処理](https://www.webdesignleaves.com/pr/jquery/javaascript_03.html)
  - [【JavaScript】初めて学ぶ！fetch()メソッドと非同期通信](https://breezegroup.co.jp/202004/javascript-fetch/)

- WikipediaのAPI関連
  - [API:メインページ(Wikimedia)](https://www.mediawiki.org/wiki/API:Main_page/ja)
  - [【徹底解説】無料で使えるwikipedia APIまとめ【使い方】](https://1-lifengine.com/wikipedia_api)
  - [Wikipediaの解説（サマリー）をAPIで取得する](https://qiita.com/takatama/items/b5ba9c38943cd6c142df)
  - [MediaWiki APIを使ってWikipediaの情報を取得](https://qiita.com/yubessy/items/16d2a074be84ee67c01f)

- その他
  - [jQueryオブジェクトを.append()する時は気をつけよう](https://www.unitrust.co.jp/8506) 
  - [ASCII文字とURLエンコードの対応表](https://www.seil.jp/doc/index.html#tool/url-encode.html)