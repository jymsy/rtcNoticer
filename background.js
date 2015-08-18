// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

var login_url = 'https://swgjazz.ibm.com:8017/jazz/service/com.ibm.team.repository.service.internal.webuiInitializer.IWebUIInitializerRestService/j_security_check';
var url = 'https://swgjazz.ibm.com:8017/jazz/service/com.ibm.team.workitem.common.internal.rest.IQueryRestService/getResultSet';
var post_field = 'startIndex=0&maxResults=5&filterAttribute=&filterValue=&itemId=_Cz0GAKtmEeSDqq9AqL5DVg&projectAreaItemId=_TpqD8FSeEeCF6b5qT5IShg&jsonQuery={"name":"Copy of 2.2 Unresolved Defects - Found in R3","description":"","itemId":"_Cz0GAKtmEeSDqq9AqL5DVg","csvExportLink":"/jazz/resource/itemOid/com.ibm.team.workitem.query.QueryDescriptor/_Cz0GAKtmEeSDqq9AqL5DVg?_mediaType=text/csv","htmlExportLink":"/jazz/resource/itemOid/com.ibm.team.workitem.query.QueryDescriptor/_Cz0GAKtmEeSDqq9AqL5DVg?_mediaType=text/html","projectAreaItemId":"_TpqD8FSeEeCF6b5qT5IShg"}';
var refer = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation';
var isActivated = false;
var isInitialized=false;
var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';

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
/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
function show(body,id) {

  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  // new Notification(hour + time[2] + ' ' + period, {
  //   icon: '48.png',
  //   body: body
  // });
  var opt = {
    type: "list",
    title: hour + time[2] + ' ' + period,
    message: "Primary message to display",
    iconUrl: "48.png",
    items: body,
    buttons: [{title:'去看看'}]
  };
  chrome.notifications.create((new Date()).valueOf()+':'+id, opt, function(notificationId){
    console.log('show notification');
  });
}

function showNotice(value,date){
  var body = [];
        body.push({title:"ID", message:value['labels'][1]});
        body.push({title:"Summary", message:value['labels'][2]});
        body.push({title:"Priority & Severity", message:value['labels'][5] + ' | '+value['labels'][6]});

        date = new Date(date).toLocaleString();
        body.push({title:"Modified Date", message:date});
        show(body, value['labels'][1]);
}

function parseResultList(result) {
    var items = result['soapenv:Body']['response']['returnValue']['value']['rows'];
    console.log(items);
    var lastDate=0;
    items.forEach(function(value, index) {
      var date = parseInt(value['labels'][7]);
      if (localStorage.lastItemDate == 1) {
        if (date > lastDate) {
          lastDate = date;
        }
        showNotice(value,date);

      } else if(date > localStorage.lastItemDate) {
        lastDate = date;
        showNotice(value,date);
      }


    });
    // if (localStorage.lastItemDate == 1) {
      localStorage.lastItemDate = lastDate;
    // }
    
}

function getRTCList(cookies) {
  if (!localStorage.lastItemDate) {
    localStorage.lastItemDate = 1;
  }

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
  chrome.cookies.getAll({domain:'swgjazz.ibm.com'}, function(cookies) {
    // startListening();
    console.log(cookies);
    // Test for notification support.
    if (window.Notification) {
      // While activated, show notifications at the display frequency.
      if (isActivated) { getRTCList(cookies); }

      var interval = 0; // The display interval, in minutes.

      setInterval(function() {
        interval++;console.log(interval);
        if (isActivated) {
            getRTCList(cookies);
        }
      }, 60000);
    }    
  });
  // show('error!login rtc error! please login rtc again');
}


// chrome.browserAction.onClicked.addListener(function(tab) {
//   console.log('onload');
//   onload();
// });

chrome.notifications.onClicked.addListener(function(notificationId){
  chrome.notifications.clear(notificationId);
});

chrome.notifications.onButtonClicked.addListener(function(notificationId,buttonIndex){
  chrome.notifications.clear(notificationId);
  var id = /.*:(.*)/.exec(notificationId)[1];
  chrome.tabs.create({url:item_url+id});
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({}); // snub them.
    if (request.cmd == 'start' && !isActivated) {
      isActivated = true;
      if (!isInitialized) {
        isInitialized = true;
        onload();
      }
    } else if (request.cmd == 'stop'){
      isActivated = false;
    }
    console.log('get request:'+request.cmd);
    
    
  }
);


