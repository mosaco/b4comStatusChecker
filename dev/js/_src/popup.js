// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var lc = localStorage;

function setStatus(){
  // console.log('==================');
  // console.log(_v);
  var jd = JSON.parse(lc.getItem('data'))
    , _table = document.getElementById('bengo4')
    , _line = '<ul id="list">';

  for(var i=0, l=jd.length; i<l; i++){
    _line += '<li><span id="list_'+i+'">'+ jd[i]['title'] +
             '</span><strong>'+ jd[i]['value'] +
             '</strong><em>'+ jd[i]['unit'] +'</em></li>';
  }
  _table.innerHTML = _line+'</ul>';
}
function loading(){
  var bg = chrome.extension.getBackgroundPage()
    , _table = document.getElementById('bengo4')
    , _loading = '<div style="width: 212px; padding: 58px 0 59px;text-align:center;"><img src="/img/gif.gif" /></div>';

  _table.innerHTML = _loading;
  bg.requestStatus();
}
$(function($){
  setStatus($);
  $(window).on('storage', setStatus);
  $('#reload').on('click', loading);
});