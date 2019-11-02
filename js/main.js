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

let isMapView = true;

document.addEventListener('prechange', function (event) {
  let tabLabel = event.tabItem.getAttribute('label');
  document.querySelector('ons-toolbar .toolbar__center').innerHTML = event.tabItem.getAttribute('label');
  // タブラベルの検知
  // console.log(tabLabel);
  if (tabLabel != 'マップ') {
    isMapView = false;
  }
})


// 画面リロード
window.refreshView = function refreshView() {
  // trueを引数にすることで、WEBサーバーの生データを取得する。 falseではキャッシュから取得。
  if (isMapView == true) {
    initMap();
  } else {
    location.reload(true);
  }
}

let showTemplateDialog = function showTemplateDialog() {
  let dialog = document.getElementById('first-dialog');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', {
        append: true
      })
      .then(function (dialog) {
        dialog.show();
      });
  }
};

let hideDialog = function hideDialog(id) {
  document
    .getElementById(id)
    .hide();
};

