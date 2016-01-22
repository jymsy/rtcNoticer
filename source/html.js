var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';

var CurrentFilters = React.createClass({displayName: "CurrentFilters",
  render: function() {
    return (
    React.createElement("section", null, 
        React.createElement("h2", null, "Current filters:"), 
          React.createElement("table", {className: "table", id: "filter"}, 
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
      React.createElement("button", {className: "btn btn-primary", id: "add"}, "Add")
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

var TodayItems = React.createClass({displayName: "TodayItems",
  render: function() {
    return (
      React.createElement("div", {id: "todayItems"}, 
        React.createElement("h2", null, "Defects since last check:"), 
        React.createElement("ol", null)
      )
    );
  }
});

var FocusingOnRow = React.createClass({displayName: "FocusingOnRow",
  handleClick: function() {
    this.props.onDeleted(this.props.item);
  },
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      React.createElement("li", null, 
        React.createElement("button", {onClick: this.handleClick, itemid: this.props.item.id, className: "delete_focusing btn btn-danger"}, "X"), 
        React.createElement("a", {href: link, target: "_blank"}, this.props.item.summary)
      )
    );
  }
});

var FocusingOn = React.createClass({displayName: "FocusingOn",
  getInitialState: function() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    return {
      list: focusingOnList
    };
  },
  handleDeleteFocusing: function(item) {
    console.log(this.state.list);
    var focusingOnList = this.state.list
    for (var i = focusingOnList.length - 1; i >= 0; i--) {
        if (focusingOnList[i].id == item.id) {
            deleteIndex = i;
            break;
        }
    }

    focusingOnList.splice(i,1);
    localStorage.focusingOn=JSON.stringify(focusingOnList);
    this.setState({list: focusingOnList});
  },
  componentDidMount: function() {
    var self = this;
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      if(message.type == "addFocusingOn"){
        var focusingOnList = JSON.parse(localStorage.focusingOn);
        self.setState({list: focusingOnList});
      }
    });
  },
  render: function() {
    var rows = [];
    this.state.list.forEach(function(item) {
      rows.push(React.createElement(FocusingOnRow, {item: item, onDeleted: this.handleDeleteFocusing}));
    }.bind(this));
    return (
      React.createElement("div", {id: "focusingOn"}, 
        React.createElement("h2", null, "Focusing On:"), 
        React.createElement("ol", null, rows)
      )
    );
  }
});

var Options = React.createClass({displayName: "Options",
  render: function() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    return (
      React.createElement("div", null, 
        React.createElement(Header, null), 
        React.createElement(OptionsBox, null), 
        React.createElement(FocusingOn, null), 
        React.createElement(TodayItems, null)
      )
    );
  }
});



React.render(
  React.createElement(Options, null),
  document.getElementById('content')
);