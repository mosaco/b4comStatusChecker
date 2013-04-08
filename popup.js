// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var bg = chrome.extension.getBackgroundPage()
  , lc = localStorage;

function setStatus(){
  // console.log('==================');
  // console.log(_v);
  var jd = JSON.parse(lc.getItem('data'))
  var _table = document.getElementById("bengo4"),
      _line = "<ul id='list'>";

  for(var i=0, l=jd.length; i<l; i++){
    _line += "<li><span id='list_"+i+"''>"+ jd[i]['title'] +
             "</span><strong>"+ jd[i]['value'] +
             "</strong><em>"+ jd[i]['unit'] +"</em></li>";
  }
  _table.innerHTML = _line+"</ul>";

}
function main() {
  setStatus();
}
$(function($){
  main();
})