'use strict';

// Android UI (Material)に固定
// ons.forcePlatformStyling('android');

window.addEventListener('offline', function (e) {
  // console.log('offlineです。');
  this.alert("端末がオフラインです。\nネットワークに接続してください。")
});


document.addEventListener('deviceready', function () {
  navigator.splashscreen.hide();
}, false);

if (ons.platform.isIPhoneX()) { // iPhone X であるか否かを判定
  // <html> 要素に属性を追加（値として空文字列を設定）
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '') // 縦
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '') // 横
}

// 画面リロード
window.refreshView = function refreshView() {
  // trueを引数にすることで、WEBサーバーの生データを取得する。 falseではキャッシュから取得。
  if (isMapView == true) {
    initMap();
  } else {
    location.reload(true);
  }
}