// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _radio;
function badgeTypeSave() {
  chrome.storage.sync.set({prefs: {badgeType: this.getAttribute("value")} });
}
function badgeTimeSave() {
  // chrome.storage.sync.set({pref:{badgeTime: this.getAttribute("value")}});
}

function main() {
  // バッジに表示するタイプを取得
  _radio = document.getElementsByTagName('input');
  chrome.storage.sync.get(
    'prefs',
    function (storage) {
      console.log(storage);
      var _value = "";
      if(storage.prefs.badgeType === null || storage.prefs.badgeType === undefined){
        _value = _radio[0].getAttribute("value");
      } else {
        _value = storage.prefs.badgeType;
      }
      for(var i = 0, l = _radio.length; i < l; i++){
        if(_radio[i].getAttribute("value") === _value){
          _radio[i].setAttribute("checked", "checked");
        }
        _radio[i].addEventListener('click', badgeTypeSave);
      }
    });
  // バッジの更新時間の設定を取得
}
main();
