'use strict';

window.addEventListener('offline', function (e) {
  // console.log('offlineです。');
  this.alert("端末がオフラインです。\nネットワークに接続してください。")
});


document.addEventListener('deviceready', function () {
  navigator.splashscreen.hide();
}, false);

if (window.navigator.standalone) {
  if (ons.platform.isIPhoneX()) { // iPhone X であるか否かを判定
    // <html> 要素に属性を追加（値として空文字列を設定）
    // document.documentElement.setAttribute('onsflag-iphonex-portrait', '') // 縦
    // document.documentElement.setAttribute('onsflag-iphonex-landscape', '') // 横
  }

} else {
  // document.write("このページをホームに追加してください");
}

var showTemplateDialog = function () {
  var dialog = document.getElementById('my-dialog');

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

var hideDialog = function (id) {
  document
    .getElementById(id)
    .hide();
};