var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';
var reloadFilterEvt = 'reload Filter';

var FilterRow = React.createClass({
  handleClick: function() {
    this.props.onDeleted(this.props.item);
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.id}</td>
        <td><button onClick={this.handleClick} className="delete_filter btn btn-danger" >Delete</button></td>
      </tr>
    );
  }
});

var CurrentFilters = React.createClass({
  getInitialState: function() {
    var currentFilterList = JSON.parse(localStorage.filter);
    return {
      list: currentFilterList
    };
  },
  componentDidMount: function() {
    PubSub.subscribe(reloadFilterEvt, function(){
      var currentFilterList = JSON.parse(localStorage.filter);
      this.setState({list: currentFilterList});
    }.bind(this));
  },
  componentWillUnmount: function() {
    PubSub.unsubscribe(reloadFilterEvt);
  },
  handleDeleteFilter: function(filter) {
    var deleteIndex;
    var currentFilter = JSON.parse(localStorage.filter);

    for (var i = currentFilter.length - 1; i >= 0; i--) {
        if (currentFilter[i].id == filter.id) {
            deleteIndex = i;
            break;
        }
    }

    currentFilter.splice(i,1);
    localStorage.filter=JSON.stringify(currentFilter);
    this.setState({list: currentFilter});
  },
  render: function() {
    var rows = [];
    this.state.list.forEach(function(item) {
      rows.push(<FilterRow item={item} onDeleted={this.handleDeleteFilter} />);
    }.bind(this));
    return (
    <section>
        <h2>Current filters:</h2>
        <div className="row">
          <div className="col-lg-6">
          <table className="table table-bordered" id="filter">
            <thead>
                <tr>
                    <th>name</th>
                    <th>id</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          </div>
          </div>
      </section>
    );
  }
});

var NewFilter = React.createClass({
  onSubmit: function(event) {
    event.preventDefault();
    var nameNode = this.refs.name.getDOMNode();
    var idNode = this.refs.id.getDOMNode();
    var name = nameNode.value.trim();
    var id = idNode.value.trim();

    if (name != "" && id != "") {
        var currentFilter = JSON.parse(localStorage.filter);
        currentFilter.push({name: name, id:id, lastModifyDate:"1"});
        localStorage.filter = JSON.stringify(currentFilter);
        PubSub.publish(reloadFilterEvt);
    }
    nameNode.value = "";
    idNode.value = "";
  },
  render: function() {
    var inputStyle = {width:'200px'};
    return (
    <form className="form-inline" onSubmit={this.onSubmit}>
      Add filter:<br/>
      <div className="form-group">
        <input type="text" ref="name" className="form-control" style={inputStyle} placeholder="Name"/>
      </div>
      <div className="form-group">
        <input type="text" ref="id" className="form-control" style={inputStyle} placeholder="ID"/>
      </div>
      <button className="btn btn-primary" type="submit" >Add</button>
    </form>
    );
  }
});

var OptionsBox = React.createClass({
  handleChange: function(event) {
    localStorage.frequency = event.target.value;
  },
  render: function() {
    var freq = localStorage.frequency;
    return (
      <div id="options">
        <h2>Options</h2>
          <div className="row">
          <div className="col-lg-9 form-inline">
          Check new defects every
        <select className="form-control" defaultValue={freq} onChange={this.handleChange}>
          <option>10</option>
          <option>30</option>
          <option>60</option>
        </select>
        second(s).<br/>
        </div>
        </div>
         
      </div>
    );
  }
});


var Header = React.createClass({
  render: function() {
    return (
    <div className="page-header">
        <h1>
            <img src={'64.png'} alt="Toast"/>
                RTC Notification
        </h1>
    </div>
    );
  }
});

var NewDefectRow = React.createClass({
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      <li>
        <a href={link} target="_blank">{this.props.item.id} - {this.props.item.summary}</a>
      </li>
    );
  }
});

var TodayItems = React.createClass({
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
      rows.push(<NewDefectRow item={item} />);
    }.bind(this));
    return (
      <div id="todayItems">
        <h2>Defects since last check:</h2>
        <ol>{rows}</ol>
      </div>
    );
  }
});

var FocusingOnRow = React.createClass({
  handleClick: function() {
    this.props.onDeleted(this.props.item);
  },
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      <li>
        <button onClick={this.handleClick} itemid={this.props.item.id} className="delete_focusing btn btn-danger">X</button>
        <a href={link} target="_blank">{this.props.item.summary}</a>
      </li>
    );
  }
});

var FocusingOn = React.createClass({
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
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      if(message.type == "addFocusingOn"){
        var focusingOnList = JSON.parse(localStorage.focusingOn);
        self.setState({list: focusingOnList});
      }
    }.bind(this));
  },
  render: function() {
    var rows = [];
    this.state.list.forEach(function(item) {
      rows.push(<FocusingOnRow item={item} onDeleted={this.handleDeleteFocusing} />);
    }.bind(this));
    return (
      <div id="focusingOn">
        <h2>Following:</h2>
        <ol>{rows}</ol>
      </div>
    );
  }
});

var Options = React.createClass({
  render: function() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    return (
      <div>
        <Header />
        <OptionsBox />
         <CurrentFilters />
          <NewFilter />
        <FocusingOn />
        <TodayItems />
      </div>
    );
  }
});



React.render(
  <Options/>,
  document.getElementById('content')
);