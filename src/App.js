import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

//Initialize Firebase
var config = {
   apiKey: "AIzaSyBhtVa59rx03xYh9LuWiaaVpOy5pSz6H1U",
   authDomain: "bloc-chat-react-575f9.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-575f9.firebaseio.com",
   projectId: "bloc-chat-react-575f9",
   storageBucket: "bloc-chat-react-575f9.appspot.com",
   messagingSenderId: "385327052033"
 };
 firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      activeRoomId: "",
      user: "",
    }
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleRoomClick(room){
    this.setState({
      activeRoom: room.name,
      activeRoomId: room.key,
    });
  }

  setUser(user){
    this.setState({user: user});
  }

  render() {
    return (
      <div className="App">
        <div className="left-bar">
          <h1>ChatHatch</h1>
          <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>
          <RoomList firebase={firebase} handleRoomClick={this.handleRoomClick}/>
        </div>
        <div className="right-bar">
          <div className="active-room">
            {this.state.activeRoom}
          </div>
          <MessageList firebase={firebase} roomId={this.state.activeRoomId} user={this.state.user}/>
        </div>
      </div>
    );
  }
}

export default App;
