import React, {Component} from 'react';

class User extends Component {

  handleSignInClick(e) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  handleSignOutClick(e) {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render(){
    return (
      <div className="log-in">
        <div>{this.props.user === null ? 'Guest' : this.props.user.displayName}</div>
        {this.props.user === null ?
          <button onClick={(e)=>{this.handleSignInClick(e)}}>Sign In</button>
          :
          <button onClick={(e)=>{this.handleSignOutClick(e)}}>Sign Out</button>
        }
      </div>
    );
  }
};

export default User;
