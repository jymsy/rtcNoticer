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

window.addEventListener('load', function() {
  // Initialize the option controls.
  // options.isActivated.checked = JSON.parse(localStorage.isActivated);
  //                                        // The display activation.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in seconds.
  // if (!options.isActivated.checked) { ghost(true); }
  // options.filter.value = {"name":"2","value":"dkfjsd"};
  var currentFilter = JSON.parse(localStorage.filter);
  var filterTable = document.querySelector('#filter tbody');

  currentFilter.forEach(function(item) {
    var filter = document.createElement("tr");
    filter.innerHTML = "<td>"+item.name+"</td><td>"+item.id+"</td>";
    filterTable.appendChild(filter);
  });



  // Set the display activation and frequency.
  // options.isActivated.onchange = function() {
  //   localStorage.isActivated = options.isActivated.checked;
  //   ghost(!options.isActivated.checked);
  // };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };

});
