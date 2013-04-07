// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var bg = chrome.extension.getBackgroundPage()
  , lc = localStorage;

function badgeTypeSave() {
  lc.setItem('badgeType', this.getAttribute("value"));
}
function badgeTimeSave() {
  var tmp = $('#sec').val();
  if(tmp.match(/^\d{1,3}$/)){
    lc.setItem('timerMs', changeMinToMiliSec(tmp));
  }else{
    $('#sec').val(changeMiliSecToMin(lc.getItem('timerMs')));
  }
}
function changeMinToMiliSec(val){
  return val * 60000;
}
function changeMiliSecToMin(val){
  return Math.floor(val / 60000);
}
function main() {
  $('#'+lc.getItem('badgeType')).attr('checked','checked');
  $('#sec').val(changeMiliSecToMin(lc.getItem('timerMs')));

  $('.badgeType').on('click', 'li input', badgeTypeSave);
  $('.timer').on('click', 'li input[type="button"]', badgeTimeSave);
}
$(function($){
  main();
})