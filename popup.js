// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var bg = chrome.extension.getBackgroundPage()
  , lc = localStorage;

function setStatus(_v){
  // console.log('==================');
  // console.log(_v);
  var _title = _v.querySelectorAll("#countBlock h2"), // タイトル
      _num   = _v.querySelectorAll(".countNumber"),   // 数字
      _unit  = _v.querySelectorAll(".countValue");    // 単位

  var _table = document.getElementById("bengo4"),
      _line = "<ul id='list'>";

  for(var i=0, l=_num.length; i<l; i++){
    _line += "<li><span id='list_"+i+"''>"+ _title[i].innerText +
             "</span><strong>"+ _num[i].innerText +
             "</strong><em>"+_unit[i].innerText+"</em></li>";
  }
  _table.innerHTML = _line+"</ul>";
}
function main() {
  bg.requestURL(bg.statusURL, setStatus, "document");
}
$(function($){
  main();
})