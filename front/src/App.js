import React from 'react';
import TopHeader from './topheader/topheader';
import Dashboard from './dashboard/dashboard';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      access_token: null,
      itemPlaying:'HEHEH',
      loggedIn: false,
    };
  };

  getAccessToken = (token) => {
    this.setState({access_token: token});
    
  }
  
  getLoginState = (state) => {
    if(state ===true){
      this.setState({loggedIn: true});
    }
    else{
      this.setState({loggedIn: false});
    }
  }

  render()
  {  
    return (
      <div className="App">

          { this.state.access_token == null ?
            <TopHeader getAccessToken={this.getAccessToken}/>
          :
            <TopHeader getAccessToken={this.getAccessToken}/>
          }
          
          
          { this.state.access_token == null ?
            <div>
              <Dashboard />
            </div>
          :
            <Dashboard token={this.state.access_token} />
          }
          
        
        

      </div>
    );
  }
}

export default App;
