
var Frequency = React.createClass({displayName: "Frequency",
  render: function() {
    return (
      React.createElement("select", {id: "frequency"}, 
        React.createElement("option", null, "10"), 
        React.createElement("option", null, "30"), 
        React.createElement("option", null, "60")
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
        React.createElement(Frequency, {title: "Check new defects every"})
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