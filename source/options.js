var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';


function reloadFilter() {
    var currentFilter = JSON.parse(localStorage.filter);
    var filterTable = document.querySelector('#filter tbody');  
    var targets = document.querySelectorAll('.delete_filter');

    if (targets.length > 0) {
        for (var i = targets.length - 1; i >= 0; i--) {
            targets[i].removeEventListener('click');
        }
    }
    filterTable.innerHTML="";

    currentFilter.forEach(function(item) {
        var filter = document.createElement("tr");
        filter.innerHTML = "<td>"+item.name+"</td><td>"+item.id+"</td><td><button id='"+item.id+"'' class='delete_filter btn btn-danger'>Delete</button></td>";
        filterTable.appendChild(filter);
    });

    targets = document.querySelectorAll('.delete_filter');

    for (var i = targets.length - 1; i >= 0; i--) {
        targets[i].addEventListener('click', function(event) {
            removeFilter(event.target.id);
        });
    }
    
}

function reloadFocusingOn() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    var focusingHtml = document.querySelector('#focusingOn ol');
    var targets = document.querySelectorAll('.delete_focusing');

    if (targets.length > 0) {
        for (var i = targets.length - 1; i >= 0; i--) {
            targets[i].removeEventListener('click');
        }
    }
    focusingHtml.innerHTML="";

    focusingOnList.forEach(function(item) {
        addFocusingOn(item);
    });
}

function removeFocusingOn(id) {
    var deleteIndex;
    var focusingOnList = JSON.parse(localStorage.focusingOn);

    for (var i = focusingOnList.length - 1; i >= 0; i--) {
        if (focusingOnList[i].id == id) {
            deleteIndex = i;
            break;
        }
    }

    focusingOnList.splice(i,1);
    localStorage.focusingOn=JSON.stringify(focusingOnList);
    reloadFocusingOn();
}

function addItem(selector, item, button) {
    var itemList = document.querySelector(selector);
    var newItem = document.createElement("li");
    if (button) {
        newItem.innerHTML = button;
    }
    var html = "<a href='" + item_url + item.id + "' target='_blank'>"
    + item.id + " - " + item.summary + "</a>";
    newItem.innerHTML += html;
    itemList.appendChild(newItem);
    return newItem;
}

function addFocusingOn(item) {
    var button = "<button itemId='"+item.id+"' class='delete_focusing btn btn-danger'>X</button>";
    var newItem = addItem('#focusingOn ol', item, button);
    newItem.children[0].addEventListener('click', function(event) {
        removeFocusingOn(event.target.getAttribute('itemId'));
    });
}

function addNewItem(item) {
    addItem('#todayItems ol', item);
}

function initNewItems() {
    var message = {
        type: "initItems"
    };
    chrome.runtime.sendMessage(message, function(items) {
        if (items) {
            items.forEach(function(item){
                addNewItem(item);
            });
        }
    });

}


function removeFilter(filterId) {
    var deleteIndex;
    var currentFilter = JSON.parse(localStorage.filter);

    for (var i = currentFilter.length - 1; i >= 0; i--) {
        if (currentFilter[i].id == filterId) {
            deleteIndex = i;
        }
    }

    currentFilter.splice(i,1);
    localStorage.filter=JSON.stringify(currentFilter);
    reloadFilter();
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.type == "addNewItem") {
        addNewItem(message.value);
    } else if(message.type == "addFocusingOn"){
        addFocusingOn(message.value);
    }
});

window.addEventListener('load', function() {
  var freq = document.querySelector('#frequency');
  freq.value = localStorage.frequency;

  reloadFilter();
  initNewItems();
  // reloadFocusingOn();

  document.querySelector('#add').addEventListener('click', function() {
    var name = document.getElementById("name");
    var id = document.getElementById("id");

    if (name.value != "" && id.value != "") {
        var currentFilter = JSON.parse(localStorage.filter);
        currentFilter.push({name: name.value, id:id.value, lastModifyDate:"1"});
        localStorage.filter = JSON.stringify(currentFilter);
        reloadFilter();
    }

    name.value = "";
    id.value = "";
  });

  freq.onchange = function() {
    localStorage.frequency = freq.value;
  };

});
