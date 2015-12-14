// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
// function ghost(isDeactivated) {
//   options.style.color = isDeactivated ? 'graytext' : 'black';
//                                               // The label color.
//   options.frequency.disabled = isDeactivated; // The control manipulability.
// }

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
        filter.innerHTML = "<td>"+item.name+"</td><td>"+item.id+"</td><td><button class='delete'>Delete</button></td>";
        filterTable.appendChild(filter);
    });

    if (targets.length == 0) {
        targets = document.querySelectorAll('.delete');
    }

    for (var i = targets.length - 1; i >= 0; i--) {
        targets[i].addEventListener('click', function() {
            console.log("click");
        });
    }
    
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
    reloadFilter();
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  // options.isActivated.checked = JSON.parse(localStorage.isActivated);
  //                                        // The display activation.
  // options.frequency.value = localStorage.frequency;
  var freq = document.querySelector('#frequency');
  freq.value = localStorage.frequency;
                                         // The display frequency, in seconds.
  // if (!options.isActivated.checked) { ghost(true); }

  reloadFilter();

  document.querySelector('#add').addEventListener('click', function() {
    var name = document.getElementById("name");
    var id = document.getElementById("id");

    if (name.value != "" && id.value != "") {
        var currentFilter = JSON.parse(localStorage.filter);
        currentFilter.push({name: name.value, id:id.value});
        localStorage.filter = JSON.stringify(currentFilter);
        reloadFilter();
    }

    name.value = "";
    id.value = "";
  });

  // Set the display activation and frequency.
  // options.isActivated.onchange = function() {
  //   localStorage.isActivated = options.isActivated.checked;
  //   ghost(!options.isActivated.checked);
  // };

  freq.onchange = function() {
    localStorage.frequency = freq.value;
  };

});
