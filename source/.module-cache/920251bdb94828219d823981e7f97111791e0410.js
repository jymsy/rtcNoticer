


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

ReactDOM.render(
  React.createElement(Header, null),
  document.getElementById('content')
);