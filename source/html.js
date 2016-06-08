var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';

var CurrentFilters = React.createClass({displayName: "CurrentFilters",
  render: function() {
    return (
    React.createElement("section", null, 
        React.createElement("h2", null, "Current filters:"), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-lg-6"}, 
          React.createElement("table", {className: "table table-bordered", id: "filter"}, 
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
          )
      )
    );
  }
});

var NewFilter = React.createClass({displayName: "NewFilter",
  render: function() {
    var inputStyle = {width:'200px'};
    return (
    React.createElement("form", {className: "form-inline"}, 
      "Add filter:", React.createElement("br", null), 
      React.createElement("div", {className: "form-group"}, 
        React.createElement("input", {id: "name", type: "text", className: "form-control", style: inputStyle, placeholder: "Name"})
      ), 
      React.createElement("div", {className: "form-group"}, 
        React.createElement("input", {id: "id", type: "text", className: "form-control", style: inputStyle, placeholder: "ID"})
      ), 
      React.createElement("button", {className: "btn btn-primary", id: "add"}, "Add")
    )
    );
  }
});

var OptionsBox = React.createClass({displayName: "OptionsBox",
  getInitialState: function() {
    return {
      freq: localStorage.frequency
    };
  },
  handleChange: function(event) {
    localStorage.frequency = event.target.value;
    this.setState({freq:localStorage.frequency});
  },
  render: function() {
    return (
      React.createElement("div", {id: "options"}, 
        React.createElement("h2", null, "Options"), 
          React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-lg-9 form-inline"}, 
          "Check new defects every", 
        React.createElement("select", {className: "form-control", id: "frequency", value: this.state.freq, onChange: this.handleChange}, 
          React.createElement("option", null, "10"), 
          React.createElement("option", null, "30"), 
          React.createElement("option", null, "60")
        ), 
        "second(s).", React.createElement("br", null)
        )
        ), 
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

var NewDefectRow = React.createClass({displayName: "NewDefectRow",
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      React.createElement("li", null, 
        React.createElement("a", {href: link, target: "_blank"}, this.props.item.id, " - ", this.props.item.summary)
      )
    );
  }
});

var TodayItems = React.createClass({displayName: "TodayItems",
  getInitialState: function() {
    return {
      list: []
    };
  },
  componentWillMount: function() {
    var message = {
      type: "initItems"
    };

    chrome.runtime.sendMessage(message, function(items) {
      if (items) {
        this.setState({list:items});
      }
    }.bind(this));
  },
  componentDidMount: function() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      if(message.type == "addNewItem"){
        console.log('add new item');
        var list = this.state.list;
        list.push(message.value);
        this.setState({list:list});
      }
    }.bind(this));
  },
  render: function() {
    var rows = [];
    console.log(this.state.list);
    this.state.list.forEach(function(item) {
      rows.push(React.createElement(NewDefectRow, {item: item}));
    }.bind(this));
    return (
      React.createElement("div", {id: "todayItems"}, 
        React.createElement("h2", null, "Defects since last check:"), 
        React.createElement("ol", null, rows)
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
        React.createElement("h2", null, "Following:"), 
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