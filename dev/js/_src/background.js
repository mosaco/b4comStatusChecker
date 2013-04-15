var lc = localStorage
  , statusURL = 'http://www.bengo4.com'
  , timerID  // timer handle
  , defaultProps = {
    badgeType : 'resPercent'
  , timerMs   : 200000
  , data : '[{"name":"lawyerNum","title":"登録弁護士数","value":"--","unit":"人"},{"name":"allAdvice","title":"相談件数（累計）","value":"--","unit":"件"},{"name":"d30Advice","title":"相談件数（月間）","value":"--","unit":"件"},{"name":"resPercent","title":"弁護士回答率","value":"--","unit":"%"},{"name":"reviewNum","title":"口コミ評価数","value":"--","unit":"件"}]'
  };

function updateBadge(){
  // console.log('updateBadge================');
  var tmp = JSON.parse(lc.getItem('data'))
    , bType = lc.getItem('badgeType')
    , num;

  for(var i = 0, l = tmp.length; i < l; i++){
    if(tmp[i].name === bType){
      num = tmp[i].value;
      break;
    }
  }
  chrome.browserAction.setBadgeBackgroundColor({color: '#fe6000'});
  chrome.browserAction.setBadgeText({text : num.split(',').join('')});
}

function updateStatus(_v){
  // console.log('updateStatus============');
  // console.log(_v);
  var _date  = new Date()
    , jsonData = JSON.parse(lc.getItem('data'))
    , changeData = JSON.parse(lc.getItem('data'));

  if(_v !== 'offline'){
    var _title = _v.querySelectorAll('#countBlock h2')   // タイトル
      , _num   = _v.querySelectorAll('.countNumber')     // 数字
      , _unit  = _v.querySelectorAll('.countValue');     // 単位

    for(var i = 0, l=jsonData.length; i < l; i++){
      changeData[i]['title'] = _title[i].innerText;
      changeData[i]['value'] = _num[i].innerText;
      changeData[i]['unit'] = _unit[i].innerText;
      changeData[i]['time'] = _date.getTime();
    }
    lc.setItem('data', JSON.stringify(changeData));
  } else {
    changeData[0]['time'] = _date.getTime();
    lc.setItem('data', JSON.stringify(changeData));
  }
  updateBadge();
}

function requestURL(url, callback, opt_responseType) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = opt_responseType || 'document';

  xhr.onreadystatechange = function() {
    // console.log(xhr.readyState);
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseType === 'document' ? xhr.responseXML : xhr.responseText);
      } else {
        callback('offline');
      }
    }
  };

  xhr.onerror = function() {
    // callback('offline');
  };

  xhr.open('GET', url, true);
  xhr.send();
}

function requestStatus() {
  // console.log('requestStatus');
  requestURL(statusURL, updateStatus, 'document');
  if(timerID){
    clearTimeout(timerID);
  }
  timerID = setTimeout(requestStatus, lc.getItem('timerMs'));
}

function init(){
  $.extend(lc, defaultProps);
  $(window).on('storage', requestStatus);
  requestStatus();
}

$(function($){
  init($);
});