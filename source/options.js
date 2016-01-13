

function reloadFilter() {
    var currentFilter = JSON.parse(localStorage.filter);
    var filterTable = document.querySelector('#filter tbody');  
    var targets = document.querySelectorAll('.delete');

    if (targets.length > 0) {
        for (var i = targets.length - 1; i >= 0; i--) {
            targets[i].removeEventListener('click');
        }
    }
    filterTable.innerHTML="";

    currentFilter.forEach(function(item) {
        var filter = document.createElement("tr");
        filter.innerHTML = "<td>"+item.name+"</td><td>"+item.id+"</td><td><button id='"+item.id+"'' class='delete'>Delete</button></td>";
        filterTable.appendChild(filter);
    });

    targets = document.querySelectorAll('.delete');

    for (var i = targets.length - 1; i >= 0; i--) {
        targets[i].addEventListener('click', function(el) {
            console.log(el.target.id);
            removeFilter(el.target.id);
        });
    }
    
}

function addNewItem(item) {
    var itemList = document.querySelector('#todayItems ol');
    var newItem = document.createElement("li");
    newItem.innerHTML = item.ID + " - " + item.summary;
    itemList.appendChild(newItem);
}

function initNewItems() {
    chrome.runtime.sendMessage("initItems", function(items) {
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

chrome.runtime.onMessage.addListener(function(value, sender, sendResponse){
    if (value !== "initItems") {
        addNewItem({ID: value['labels'][1], summary:value['labels'][2]});
    };
});

window.addEventListener('load', function() {
  var freq = document.querySelector('#frequency');
  freq.value = localStorage.frequency;

  reloadFilter();
  initNewItems();

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
