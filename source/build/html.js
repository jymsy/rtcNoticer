var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';

var CurrentFilters = React.createClass({
  render: function() {
    return (
    <section>
        <h2>Current filters:</h2>
          <table className="table" id="filter">
            <thead>
                <tr>
                    <th>name</th>
                    <th>id</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody></tbody>
          </table>
      </section>
    );
  }
});

var NewFilter = React.createClass({
  render: function() {
    var inputStyle = {width:'200px'};
    return (
    <div>
      Add filter:<br/>
      name: <input id="name" type="text" style={inputStyle}/>    id:<input id="id" type="text" style={inputStyle}/>
      <button className="btn btn-primary" id="add">Add</button>
    </div>
    );
  }
});

var OptionsBox = React.createClass({
  render: function() {
    return (
      <div id="options">
        <h2>Options</h2>
        Check new defects every
        <select id="frequency">
          <option>10</option>
          <option>30</option>
          <option>60</option>
        </select>
        second(s).<br/>
        <CurrentFilters />
        <NewFilter />
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

var TodayItems = React.createClass({
  render: function() {
    return (
      <div id="todayItems">
        <h2>Defects since last check:</h2>
        <ol></ol>
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
  render: function() {
    var rows = [];
    this.state.list.forEach(function(item) {
      rows.push(<FocusingOnRow item={item} onDeleted={this.handleDeleteFocusing} />);
    }.bind(this));
    return (
      <div id="focusingOn">
        <h2>Focusing On:</h2>
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