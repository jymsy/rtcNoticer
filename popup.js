// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

// A simple Timer class.
function Timer() {
  this.start_ = new Date();

  this.elapsed = function() {
    return (new Date()) - this.start_;
  }

  this.reset = function() {
    this.start_ = new Date();
  }
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function onload() {
  // focusFilter();
  var timer = new Timer();
  chrome.cookies.getAll({}, function(cookies) {
    // startListening();
    start = new Date();
    for (var i in cookies) {
      console.log(cookies[i]);
      // cache.add(cookies[i]);
    }
    timer.reset();
    // reloadCookieTable();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('check rtc login status.....');
  onload();
  // getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    // renderStatus('Performing Google Image search for ' + url);

    // getImageUrl(url, function(imageUrl, width, height) {

    //   renderStatus('Search term: ' + url + '\n' +
    //       'Google image search result: ' + imageUrl);
    //   var imageResult = document.getElementById('image-result');
    //   // Explicitly set the width/height to minimize the number of reflows. For
    //   // a single image, this does not matter, but if you're going to embed
    //   // multiple external images in your page, then the absence of width/height
    //   // attributes causes the popup to resize multiple times.
    //   imageResult.width = width;
    //   imageResult.height = height;
    //   imageResult.src = imageUrl;
    //   imageResult.hidden = false;

    // }, function(errorMessage) {
    //   renderStatus('Cannot display image. ' + errorMessage);
    // });
  // });
});