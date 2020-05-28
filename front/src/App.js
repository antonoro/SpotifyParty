import React from 'react';
import TopHeader from './topheader/topheader';
import Dashboard from './dashboard/dashboard';
import './App.css';
import Vynil from './img/vynil.svg';
import Record from './img/record.svg';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      loggedin: false,
      sessionExists: false,
      userState: '',
      deviceID: null,
      devicename: null,
      deviceactive: false,
      userID: null,
      LandinguserID: null,
      getUserToggled: false
    };
  };

  componentDidMount(){


    if(!this.state.sessionExists)
    {
      var userIDsession = sessionStorage.getItem('useridsession');
      console.log("SESSION ID:", userIDsession);
    }

    if(this.state.userID === null && sessionStorage.getItem('useridsession') === null)
        {
            console.log("Requesting client id...");
            fetch("/authorize")
            .then(res => res.json()
            .then(res => {
                this.setState({userID: res.userid});
                console.log("Landing on page with id:", this.state.userID);
                this.getID(res.userid);
            }));
    }
    
    if(this.state.loggedin !== true)
    {
      console.log("fetching getUser on mount...");
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
            console.log("Fetched!", res.displayname);
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

    if(!this.state.sessionExists)
    {
      var userIDsession = sessionStorage.getItem('useridsession');
      if(userIDsession === null)
      {
        console.log("No session user ID saved.");
      }
      else{
        console.log("Session id saved:", userIDsession);
        this.setState({userID: userIDsession, loggedin: true, getUserToggled: false, sessionExists: true});
      }
    }

    if(this.state.getUserToggled)
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
            console.log("Fetched!:", res.displayname);
            var userIDsession = sessionStorage.getItem('useridsession');
            
            sessionStorage.setItem('useridsession', this.state.userID);
            
            console.log("SESSION ID:", sessionStorage.getItem('useridsession'));
            this.setState({userState: res.displayname, loggedin: true, getUserToggled: false, sessionExists: true});
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
      console.log("user id:", this.state.userID);
      console.log("Device id:", this.state.deviceid);
      console.log("Logged in:", this.state.loggedin);
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

  getDeviceID = () => {
    console.log("Get DeviceID requested");
    fetch("/mydevices", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userid: this.state.userID}),
    })
    .then(res => res.json()
    .then(res => {
      if(res.length === 0)
      {
        alert("No active computer devices");
      }
      else{
        console.log("Devices found: ", res);
        
      }
      
    }));
  }

  getID = (id) =>{
    this.setState({userID: id});
    console.log("App got client id:", this.state.userID);
  }

  openSpotify = () => {
    const url = 'https://open.spotify.com';
    window.open(url, '_blank');
}


  render()
  {  
    return (
      <div className="App">
        {this.state.loggedin
                  ? <div><TopHeader user={this.state.userState} getID={this.getID} devicename={this.state.devicename} deviceactive={this.state.deviceactive} getDevicesID={this.getDeviceID}/>
                      <div className="container-fluid">  
                        <Dashboard user={this.state.userState} deviceID={this.state.deviceID} userid={this.state.userID}/>
                      </div>
                      </div>
                  : <div className="Plus">
                    <header className="App-header">
                      <button className="Home">
                      </button>
                      <div className="">
                        <a className="Login" onClick={this.openSpotify} href={`/login/${this.state.userID}`}>
                          Log In
                        </a>
                        <a href="https://www.spotify.com/us/" className="Register">
                          Register Now!
                        </a>
                      </div>
                    </header>
                    <div className="MiddleTitle">
                      <h2 className="Black">Be the life of the party!</h2>
                      <h1 className="Title">SHARING MUSIC</h1>
                      <h1 className="Title">NEVER FELT SO <span className="Outline">GOOD</span></h1>
                      <img alt="Vynil" src={Vynil} className="Vynil"/>
                      <img alt="Record" src={Record} className="Record"/>
                      <a  href={`/login/${this.state.userID}`}  className="Button">
                        <svg><g><line x2="227.62" y1="31.28" y2="31.28"></line><polyline points="222.62 25.78 228.12 31.28 222.62 36.78"></polyline><circle cx="224.67" cy="30.94" r="30.5" transform="rotate(180 224.67 30.94) scale(1, -1) translate(0, -61)"></circle></g>
                        </svg><font>Enter the Sound</font>
                      </a>
                    </div>
                    <footer className="Foot">
                      <p className="Copyright">&#xA9; Antoine & Juan</p>
                      <button className="About">
                      ABOUT
                      </button>
                    </footer>
                 </div>
        }
          
      </div>
    );
  }
}

export default App;
