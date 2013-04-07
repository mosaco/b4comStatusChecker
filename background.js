var lc = localStorage,
    statusURL = "http://www.bengo4.com",
    timerID,  // timer handle
    defaultProps = {
      badgeType : 'resPercent'
    , timerMs   : 200000
    , lawyerNum : ' -- '// 登録弁護士数  -- 人
    , allAdvice : ' -- '// 相談件数（累計）  -- 件
    , d30Advice : ' -- '// 相談件数（月間）  -- 件
    , resPercent: ' -- '// 弁護士回答率  -- %
    , reviewNum : ' -- '// 口コミ評価数  -- 件
    }
function init(){
  $.extend(lc, defaultProps);
  $(window).on('storage', requestStatus);
  requestStatus();
}

function requestStatus() {
  requestURL(statusURL, updateStatus, "document");
  if(timerID){
    clearTimeout(timerID);
  }
  timerID = setTimeout(requestStatus, lc.getItem('timerMs'));
}

function updateStatus(_v){
  // console.log('updateStatus============');
  // console.log(_v);
  var status   = _v.querySelectorAll(".countNumber");
  // console.log(status);
  lc.setItem('lawyerNum', status[0].innerText.split(',').join(""));
  lc.setItem('allAdvice', status[1].innerText.split(',').join(""));
  lc.setItem('d30Advice', status[2].innerText.split(',').join(""));
  lc.setItem('resPercent',status[3].innerText);
  lc.setItem('reviewNum', status[4].innerText.split(',').join(""));

  updateBadge();
}

function updateBadge(){
  // console.log('updateBadge================');
  chrome.browserAction.setBadgeBackgroundColor({color: '#fe6000'});
  chrome.browserAction.setBadgeText({text : lc.getItem(lc.getItem('badgeType'))});
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

$(function($){
  init();
});