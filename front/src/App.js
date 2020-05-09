import React from 'react';
import TopHeader from './topheader/topheader';
import Dashboard from './dashboard/dashboard';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      loggedIn: false,
      userState: null,
      deviceID: null,
    };
  };

  componentDidMount(){
    console.log("fetching getUser...");
    fetch("/getUser")
    .then(res => res.json()
    .then(res => {
      if(res !== this.state.userState)
      {
        console.log("Fetched!");
        this.setState({userState: res});
      }
    }));
  }

  componentDidUpdate(){
    if(this.state.deviceID === null)
    {
      fetch("/mydevices")
      .then(res => res.json()
      .then(res => {
        if(res !== this.state.deviceID)
        {
          this.setState({deviceID: res});
        }
      }));
    }
  }


  render()
  {  
    return (
      <div className="App">

          <TopHeader user={this.state.userState}/>
        <div className="container-fluid">  
          <Dashboard user={this.state.userState} deviceID={this.state.deviceID}/>
        </div>
        
        

      </div>
    );
  }
}

export default App;
