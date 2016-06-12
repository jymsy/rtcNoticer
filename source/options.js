var listener = function (event) {
    removeFilter(event.target.id);
};

function reloadFilter() {
    var currentFilter = JSON.parse(localStorage.filter);
    var filterTable = document.querySelector('#filter tbody');  
    var targets = document.querySelectorAll('.delete_filter');

    if (targets.length > 0) {
        for (var i = targets.length - 1; i >= 0; i--) {
            targets[i].removeEventListener('click', listener);
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
        targets[i].addEventListener('click', listener);
    }
    
}


function removeFilter(filterId) {
    var deleteIndex;
    var currentFilter = JSON.parse(localStorage.filter);

    for (var i = currentFilter.length - 1; i >= 0; i--) {
        if (currentFilter[i].id == filterId) {
            deleteIndex = i;
            break;
        }
    }

    currentFilter.splice(i,1);
    localStorage.filter=JSON.stringify(currentFilter);
    reloadFilter();
}

window.addEventListener('load', function() {

  // reloadFilter();

  // document.querySelector('#add').addEventListener('click', function() {
  //   var name = document.getElementById("name");
  //   var id = document.getElementById("id");

  //   if (name.value != "" && id.value != "") {
  //       // var currentFilter = JSON.parse(localStorage.filter);
  //       // currentFilter.push({name: name.value, id:id.value, lastModifyDate:"1"});
  //       // localStorage.filter = JSON.stringify(currentFilter);
  //       reloadFilter();
  //   }

  //   // name.value = "";
  //   // id.value = "";
  // });

});
