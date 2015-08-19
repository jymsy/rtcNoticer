function click(e) {
    var cmd = e.target.id;
    chrome.extension.sendRequest({cmd: cmd}, function(response) {
      console.log('get response');
    });
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});