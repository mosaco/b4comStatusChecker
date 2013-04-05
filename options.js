// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _radio;
function save() {
  chrome.storage.sync.set({badge_type: this.getAttribute("value")});
}
function main() {
  _radio = document.getElementsByTagName('input');
  chrome.storage.sync.get(
    'badge_type',
    function (storage) {
      var _value = "";
      if(storage.badge_type === null || storage.badge_type === undefined){
        _value = _radio[0].getAttribute("value");
      } else {
        _value = storage.badge_type;
      }
      for(var i = 0, l = _radio.length; i < l; i++){
        if(_radio[i].getAttribute("value") === _value){
          _radio[i].setAttribute("checked", "checked");
        }
        _radio[i].addEventListener('click', save);
      }
    });
}
main();
