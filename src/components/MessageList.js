import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: [],
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount(){
    this.messagesRef.orderByChild('roomId').on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    })
  }

  handleChange(e) {
    this.setState({newMessage: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.newMessage){return};
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.roomId,
      username: this.props.user.displayName,
      sentAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    this.setState({newMessage: []});
  }

  handleDelete(message) {
    this.messagesRef.child(message.key).remove();
    this.setState({
      messages: this.state.messages.filter(i => i !== message)
    });
  }

  render(){
    return (
      <section className="messages">
        <section className="message-list">
          {this.state.messages.filter(message => message.roomId === this.props.roomId).map((message) =>
            <div className="message" key={message.key}>
              <div>
                {message.username}
              </div>
              <div className="message-info">
                <div>
                  {message.content}
                </div>
                <div className="message-controls">
                  <div className="timestamp">
                    {message.sentAt}
                  </div>
                  <button className="delete-button" onClick={(e)=>{this.handleDelete(message)}}>X</button>
                </div>
              </div>
            </div>
          )}
        </section>
        <form onSubmit={(e) => {this.handleSubmit(e)}} className="message-form">
          <input type="text" value={this.state.newMessage} onChange={(e) => {this.handleChange(e)}} className="message-input"/>
          <input type="submit" value="Submit" className="message-submit"/>
        </form>
      </section>
    );
  }
}

export default MessageList;
