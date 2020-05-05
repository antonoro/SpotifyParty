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

  render()
  {  
    return (
      <div className="App">

          <TopHeader user={this.state.userState}/>
          
          <Dashboard user={this.state.userState}/>
          
        
        

      </div>
    );
  }
}

export default App;
