import React from 'react';
import TopHeader from './topheader/topheader';
import Dashboard from './dashboard/dashboard';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      loggedin: false,
      userState: null,
      deviceID: null,
      devicename: null,
      deviceactive: false,
      userID: null,
      getUserToggled: false,
    };
  };

  componentDidMount(){
    if(this.state.loggedin !== true)
    {
      console.log("fetching getUser...");
      fetch("/getUser", 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid: this.state.userID}),
      })
      .then(res => res.json()
      .then(res => {
        if(res.statusCode === 200)
        {
          if(res.displayname !== this.state.userState)
          {
            console.log("Fetched!");
            this.setState({userState: res.displayname, loggedin: true});
          }
        }
        else{
          console.log("Error code: ", res.statusCode);
          if(res.statusCode === "tryagain")
          {
            this.setState({getUserToggled: true});
          }
        }
        
      }))
      .catch(err =>{
        console.log("Error with GetUser");
      });
    }
  }

  componentDidUpdate(){

    if(this.state.getUserToggled ===  true)
    {
      setTimeout( () => {
        
      
      console.log("fetching getUser...");
      fetch("/getUser", 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid: this.state.userID}),
      })
      .then(res => res.json()
      .then(res => {
        if(res.statusCode === 200)
        {
          if(res.displayname !== this.state.userState)
          {
            console.log("Fetched!");
            this.setState({userState: res.displayname, loggedin: true, getUserToggled: false});
          }
        }
        else{
          console.log("Error code: ", res.statusCode);
          if(res.statusCode === "tryagain")
          {
            this.setState({getUserToggled: true});
          }
        }
        
      }))
      .catch(err =>{
        console.log("Error with GetUser");
      });

      }, 500);
    }

    if(this.state.deviceID === null && this.state.loggedin ===  true)
    {
      fetch("/mydevices", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid: this.state.userID}),
      })
      .then(res => res.json()
      .then(res => {
        if(res.length === 0)
        {
          alert("No listening is activated. Open your web browser at open.spotify.com, active your device (play/pause) and reload page.");
        }
        else{
          console.log("Device found: ", res[0]);
          if(res[0].deviceid !== this.state.deviceID)
        {
          this.setState({deviceID: res[0].deviceid, devicename: res[0].devicename, deviceactive: res[0].deviceactive});
        }
        }
        
      }));
    }
  }

  getID = (id) =>{
    this.setState({userID: id});
    console.log("App got client id:", this.state.userID);
  }

  render()
  {  
    return (
      <div className="App">

          <TopHeader user={this.state.userState} getID={this.getID} devicename={this.state.devicename} deviceactive={this.state.deviceactive}/>
        <div className="container-fluid">  
          <Dashboard user={this.state.userState} deviceID={this.state.deviceID} userid={this.state.userID}/>
        </div>
        
        

      </div>
    );
  }
}

export default App;
