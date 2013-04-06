// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var statusURL = "http://www.bengo4.com",
    badgeList = { law: 0, per: 3 },
    badgeType,// = chrome.storage.sync.get('badgeType', function(){}),
    pollFrequencyInMs = 300000;

function updateStatus(status){
  chrome.storage.sync.get(
    'prefs',
    function (storage) {
      try{
        badgeType = storage.prefs.badgeType;
      } catch(e){
        badgeType = "law";
      }
      update(status);
  });
}

function update(_v){
  var _badge = badgeList[badgeType],
      _num = _v.querySelectorAll(".countNumber")[_badge].innerText;

  _num = _num.split(',').join("");
  chrome.browserAction.setBadgeBackgroundColor({color: '#fe6000'});
  chrome.browserAction.setBadgeText({text : _num});
}

function requestStatus() {
  requestURL(statusURL, updateStatus, "document");
  setTimeout(requestStatus, pollFrequencyInMs);
}

function requestURL(url, callback, opt_responseType) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = opt_responseType || "document";

  xhr.onreadystatechange = function(state) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        callback(xhr.responseType == "document" ? xhr.responseXML : xhr.responseText);
      } else {
        chrome.browserAction.setBadgeText({text:" -- "});
        chrome.browserAction.setBadgeBackgroundColor({color:'#fe6000'});
      }
    }
  };

  xhr.onerror = function(error) {
    console.log("xhr error:", error);
  };

  xhr.open("GET", url, true);
  xhr.send();
}

function main() {
  requestStatus();
}

chrome.storage.onChanged.addListener(requestStatus);
// debug 用
// chrome.storage.sync.clear(function(){console.log('clear !')});

main();