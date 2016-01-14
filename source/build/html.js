
var CurrentFilters = React.createClass({
  render: function() {
    return (
    <section>
        <h2>Current filters:</h2>
        <table id="filter">
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
      <button id="add">Add</button>
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

var FocusingOn = React.createClass({
  render: function() {
    return (
      <div id="focusingOn">
        <h2>Focusing On:</h2>
        <ol></ol>
      </div>
    );
  }
});

var Options = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <OptionsBox/>
        <FocusingOn/>
        <TodayItems/>
      </div>
    );
  }
});



React.render(
  <Options/>,
  document.getElementById('content')
);