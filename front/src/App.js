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
      userState: null,
      deviceID: null,
      devicename: null,
      deviceactive: false,
      userID: null,
      getUserToggled: false
    };
  };

  componentDidMount(){
    if(this.state.userID === null)
        {
            console.log("Requesting client id...");
            fetch("/authorize")
            .then(res => res.json()
            .then(res => {
                console.log("Fetched client ID:", res.userid);
                this.setState({userid: res.userid});
                console.log("client id:", this.state.userid);
                this.getID(res.userid);
            }));
    }
    
    console.log("entra");
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
        {this.state.loggedin
                  ? <div><TopHeader user={this.state.userState} getID={this.getID} devicename={this.state.devicename} deviceactive={this.state.deviceactive}/>
                      <div className="container-fluid">  
                        <Dashboard user={this.state.userState} deviceID={this.state.deviceID} userid={this.state.userID}/>
                      </div>
                      </div>
                  : <div className="Plus">
                    <header className="App-header">
                      <button className="Home">
                      </button>
                      <div className="">
                        <a className="Login" href={`/login/${this.state.userID}`}>
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
                      <button className="Button">
                      <svg><g><line x2="227.62" y1="31.28" y2="31.28"></line><polyline points="222.62 25.78 228.12 31.28 222.62 36.78"></polyline><circle cx="224.67" cy="30.94" r="30.5" transform="rotate(180 224.67 30.94) scale(1, -1) translate(0, -61)"></circle></g>
                      </svg><font>Enter the Sound</font></button>
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
