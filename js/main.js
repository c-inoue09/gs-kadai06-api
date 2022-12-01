

    //****************************************
    //成功関数
    //****************************************
    let map;
    let lat ="初期値";
    let lon ="";
    let pin =""
    $('.modal_ad').hide();

    function mapsInit(position) {
      console.log(position);
      //lat=緯度、lon=経度 を取得
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      //Map表示
      map = new Bmap("#myMap");
      map.startMap(lat, lon, "load", 20); //The place is Bellevue.
      //Pinを追加
      pin = map.pin(lat, lon, "#ff0000");
      //Infoboxを追加
      map.infobox(lat, lon, "タイトル", "現在地");
    };

    //****************************************
    //失敗関数
    //****************************************
    function mapsError(error) {
      let e = "";
      if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
        e = "位置情報が許可されてません";
      }
      if (error.code == 2) { //2＝現在地を特定できない
        e = "現在位置を特定できません";
      }
      if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
        e = "位置情報を取得する前にタイムアウトになりました";
      }
      alert("エラー：" + e);
    };

    //****************************************
    //オプション設定
    //****************************************
    const set = {
      enableHighAccuracy: true, //より高精度な位置を求める
      maximumAge: 20000, //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
      timeout: 10000, //10秒以内に現在地情報を取得できなければ、処理を終了
    };


    //最初に実行する関数
    function GetMap() {
      navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
    }



    //********************************************************************************
(() => {

 
    const wikiInput = document.getElementById("js-wikipedia-input");
    const wikiButton = document.getElementById("js-wikipedia-button");
    const wikiBody = document.getElementById("js-wikipedia-body");
  
    const wikiFetch = async (inputValue) => {
      // const fetchValue = fetch(`https://ja.wikipedia.org/w/api.php?format=json&action=query&origin=*&list=search&srlimit=45&srsearch=${inputValue}`, {
      // const fetchValue = fetch(`https://ja.wikipedia.org/w/api.php?format=json&action=query&origin=*&list=search&srsearch=iphone`, {
         const fetchValue = fetch(`https://ja.wikipedia.org/w/api.php?format=json&action=query&origin=*&list=geosearch&gscoord=${lat}%7C${lon}&gsradius=10000&gslimit=10`, {
      
      method: "GET"
      })
        .then((value) => {
          return value.json();
        })
        .catch(() => {
          alert("wikipediaにアクセスできません");
        });

      const valueJson = await fetchValue;
      const valueTargets = valueJson.query.geosearch;

      if (!valueTargets.length) {
        const wikiNull = document.createElement("p");
        wikiNull.classList.add("p-wikipedia__null");
        wikiNull.textContent = "検索したワードはヒットしませんでした。";
        wikiBody.appendChild(wikiNull);

      } else {
        $('#msg-after').append(`<h2>あなたの近所にはこんなスポットがあるぜ！</h2>`);
        const elemWrap = document.createElement("div");
        elemWrap.classList.add("p-wikipedia__main");


        for (const elem of valueTargets) {
        // for (let i = 0; i < 9; i++) {

          const elemBlock = document.createElement("a");
          elemBlock.classList.add("p-wikipedia__block");
          elemBlock.setAttribute("target", "_blank");
          elemBlock.setAttribute("rel", "noopener noreferrer");
          const elemId = elem.pageid;
          elemBlock.setAttribute("href", `http://jp.wikipedia.org/?curid=${elemId}`);
          
          const elemSpan = document.createElement("span");
          elemSpan.classList.add("p-wikipedia__block-ttl");
          const elemTitle = elem.title;
          elemSpan.textContent = elemTitle;

          const elemLat = elem.lat;
          const elemLon = elem.lon;

          pin = map.pin(elemLat, elemLon, "#ff0000");
          
          // const elemSpan2 = document.createElement("span");
          // elemSpan2.classList.add("p-wikipedia__block-date");
          // const elemDate = elem.timestamp;
          // const elemDateSlice = elemDate.slice(0, 10).replace(/-/g, ".");
          
          // elemSpan2.textContent = "最終更新日：" + elemDateSlice;
          
          elemWrap.appendChild(elemBlock);
          elemBlock.appendChild(elemSpan);
          // elemBlock.appendChild(elemSpan2);
          // wikiBody.appendChild(elemWrap);

          $('#article-area').append(`
          <div class = "article" id = "article">
            <details>
              <summary>${elemTitle}（クリックで開きます）</summary>
              <p>鵜の木駅（うのきえき）は、東京都大田区鵜の木二丁目にある、東急電鉄東急多摩川線の駅である。駅番号はTM03。</p>
              <p>みたいな感じで本当はWikipediaのサマリを取ってきたかった。<br>
              <a href = "${elemBlock}" target ="blank">「${elemTitle}」についてもっと読む（Wikipediaがひらきます）</a>
              </p>

            </details>
          </div>  
          `  );

        }
      }
    };

    const wikiData = () => {
      $('.p-wikipedia').hide();
      $('#articles').show();

      wikiBody.innerHTML = "";
      // const inputValue = wikiInput.value;
      // wikiFetch(inputValue);
      wikiFetch();

      console.log(lat);
    };
  
    wikiButton.addEventListener("click", wikiData, false);
  })();

$('#naranai-button').on("click",function(){
  $('.modal_ad').fadeIn("slow");
});