// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var statusURL = "http://www.bengo4.com",
    badgeList = { law: 0, per: 3 }, // bengo4.comのTOPページのステータスの並べ順
    badgeType,// = chrome.storage.sync.get('badge_type', function(){}),
    pollFrequencyInMs = 30000;

function updateStatus(status) {
  chrome.storage.sync.get(
    'badge_type',
    function(storage){
      var _value = "";
      if(storage.badge_type === null || storage.badge_type === undefined){
        badgeType = "law";
      } else {
        badgeType = storage.badge_type;
      }
  })
  var _badge = badgeList[badgeType],
  var _num = status.querySelectorAll(".countNumber")[_badge].innerText;
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

main();
