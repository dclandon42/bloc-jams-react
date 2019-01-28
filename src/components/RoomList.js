import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state= {
      rooms: [],
      newRoomName: "",
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room)})
    })
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value}) ;
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.newRoomName){return};
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({newRoomName: ""});
  }

  handleDelete(room) {
    this.roomsRef.child(room.key).remove();
    this.setState({
      rooms: this.state.rooms.filter(i => i !== room)
    });
  }

  render(){
    return (
      <section className="room-list">
        {this.state.rooms.map((room) =>
          <div key={room.key} className="room">
            <div onClick={(e)=>{this.props.handleRoomClick(room)}}>
              {room.name}
            </div>
            <button className="delete-button" onClick={(e)=>{this.handleDelete(room)}}>X</button>
          </div>
        )}
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <input type="text" placeholder="Add New Room" value={this.state.newRoomName} onChange={(e) => {this.handleChange(e)}} className="room-input"/>
          <input type="submit" value="+" className="room-button"/>
        </form>
      </section>
    );
  }
}



export default RoomList;
