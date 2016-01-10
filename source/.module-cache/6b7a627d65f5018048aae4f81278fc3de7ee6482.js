
var CurrentFilters = React.createClass({displayName: "CurrentFilters",
  render: function() {
    return (
    React.createElement("section", null, 
        "Current filters:", 
        React.createElement("table", {id: "filter"}, 
            React.createElement("thead", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "name"), 
                    React.createElement("th", null, "id"), 
                    React.createElement("th", null, "actions")
                )
            ), 
            React.createElement("tbody", null)
        )
      )
    );
  }
});

var NewFilter = React.createClass({displayName: "NewFilter",
  render: function() {
    var inputStyle = {width:'200px'};
    return (
    React.createElement("div", null, 
      "Add filter:", React.createElement("br", null), 
      "name: ", React.createElement("input", {id: "name", type: "text", style: inputStyle}), "    id:", React.createElement("input", {id: "id", type: "text", style: inputStyle}), 
      React.createElement("button", {id: "add"}, "Add")
    )
    );
  }
});

var OptionsBox = React.createClass({displayName: "OptionsBox",
  render: function() {
    return (
      React.createElement("div", {id: "options"}, 
        React.createElement("h2", null, "Options"), 
        "Check new defects every", 
        React.createElement("select", {id: "frequency"}, 
          React.createElement("option", null, "10"), 
          React.createElement("option", null, "30"), 
          React.createElement("option", null, "60")
        ), 
        "second(s).", React.createElement("br", null), 
        React.createElement(CurrentFilters, null), 
        React.createElement(NewFilter, null)
      )
    );
  }
});


var Header = React.createClass({displayName: "Header",
  render: function() {
    return (
    React.createElement("div", {className: "page-header"}, 
        React.createElement("h1", null, 
            React.createElement("img", {src: '64.png', alt: "Toast"}), 
                "RTC Notification"
        )
    )
    );
  }
});

var Options = React.createClass({displayName: "Options",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Header, null), 
        React.createElement(OptionsBox, null)
      )
    );
  }
});



React.render(
  React.createElement(Options, null),
  document.getElementById('content')
);