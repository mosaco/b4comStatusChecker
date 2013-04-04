// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _radio;

function save() {
  //chrome.storage.sync.set({prefs: {use_notifications: _radio.checked}});
}

// Initialize the checkbox checked state from the saved preference.
function main() {
  _radio = document.querySelector('input[type="radio"][name="notification"][checked="checked"]');
  console.log(_radio);

  // chrome.storage.sync.get(
  //     {prefs: {use_notifications: false}},
  //     function (storage) {
  //       checkbox.checked = storage.prefs.use_notifications;
  //       checkbox.addEventListener('click', save);
  //     });
}

main();
