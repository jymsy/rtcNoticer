// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

var login_url = 'https://swgjazz.ibm.com:8017/jazz/service/com.ibm.team.repository.service.internal.webuiInitializer.IWebUIInitializerRestService/j_security_check';
var url = 'https://swgjazz.ibm.com:8017/jazz/service/com.ibm.team.workitem.common.internal.rest.IQueryRestService/getResultSet';
var post_field = 'startIndex=0&maxResults=10&filterAttribute=&filterValue=&itemId=_Cz0GAKtmEeSDqq9AqL5DVg&projectAreaItemId=_TpqD8FSeEeCF6b5qT5IShg&jsonQuery={"name":"Copy of 2.2 Unresolved Defects - Found in R3","description":"","itemId":"_Cz0GAKtmEeSDqq9AqL5DVg","csvExportLink":"/jazz/resource/itemOid/com.ibm.team.workitem.query.QueryDescriptor/_Cz0GAKtmEeSDqq9AqL5DVg?_mediaType=text/csv","htmlExportLink":"/jazz/resource/itemOid/com.ibm.team.workitem.query.QueryDescriptor/_Cz0GAKtmEeSDqq9AqL5DVg?_mediaType=text/html","projectAreaItemId":"_TpqD8FSeEeCF6b5qT5IShg"}';
var refer = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation';

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if (details.type === 'xmlhttprequest') {
          details.requestHeaders.push({ name: 'Referer', value: refer});
          return { requestHeaders: details.requestHeaders };
        }
    },
    {urls: ['https://swgjazz.ibm.com:8017/*']},
    ["blocking", "requestHeaders"]
);

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function show() {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: '48.png',
    body: 'Time to make the toast.'
  });
}

function parseResultList(result) {
    var items = result['soapenv:Body']['response']['returnValue']['value']['rows'];
    console.log(items);
}

function getRTCList(cookies) {
  var xmlhttp = new XMLHttpRequest();
  var result;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      parseResultList(JSON.parse(xmlhttp.responseText));
    }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
  xmlhttp.setRequestHeader("accept","text/json");
  xmlhttp.send(post_field);
}

function onload() {
  // focusFilter();
  var logined = false;
  chrome.cookies.getAll({domain:'swgjazz.ibm.com'}, function(cookies) {
    // startListening();
    console.log(cookies);
    renderStatus('already login rtc');
    getRTCList(cookies);
  });
  renderStatus('error! please login rtc at first');
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('check rtc login status.....');
  onload();
});