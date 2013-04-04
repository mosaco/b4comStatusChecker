// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// TODO(wittman): Convert this extension to event pages once they work with
// the notifications API.  Currently it's not possible to restore the
// Notification object when event pages get reloaded.  See
// http://crbug.com/165276.

var statusURL = "http://www.bengo4.com";
var pollFrequencyInMs = 300000;

function getUseNotifications(callback) {
  chrome.storage.sync.get(
    {prefs: {use_notifications: false}},
    function(storage) { callback(storage.prefs.use_notifications); });
}

function updateStatus(status) {
  var _num = status.querySelectorAll(".countNumber")[3].innerText;
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
        chrome.browserAction.setBadgeText({text:"?"});
        chrome.browserAction.setBadgeBackgroundColor({color:[0,0,255,255]});
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
