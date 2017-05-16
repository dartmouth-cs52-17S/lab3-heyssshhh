import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Immutable from 'immutable';
import CreateBar from './CreateBar';
// import * as firebasedb from './firebasedb';
import Notes from './notes';
import './style.scss';

const socketserver = 'http://localhost:9090';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      undo: Immutable.Stack(),
      topZ: 0,
    };
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });


    this.delete = this.delete.bind(this);
  //  this.undo = this.undo.bind(this);
    this.update = this.update.bind(this);
  //  this.bringForward = this.bringForward.bind(this);
  }

  componentWillMount() {
    // firebasedb.fetchNotes((notes) => {
    //   this.setState({ notes: Immutable.Map(notes) });
    // });
    this.socket.on('notes', (notes) => {
      // where you handle all the setState and immutable stuff
      // keep this
      this.setState({ notes: Immutable.Map(notes) });
    });

    // firebasedb.fetchZ(z =>
    //   this.setState({
    //     topZ: z.topZ,
    //   }),
    // );
  }

  add(newtitle) {
    const note = {
      title: newtitle,
      text: '',
      x: 200,
      y: 200,
      zIndex: 0,
    };
    // this.setState({
    //   undo: this.state.undo.unshift(this.state.notes),
    // });
  //  firebasedb.updateZ(this.state.topZ + 1);
  //  firebasedb.addNote(note);
    this.socket.emit('createNote', note);
  }

  // bringForward(id) {
  //  firebasedb.updateZ(this.state.topZ + 1);
  //   this.update(id, { zIndex: this.state.topZ });
  // }

  delete(id) {
    // this.setState({
    //   undo: this.state.undo.unshift(this.state.notes),
    // });
    // firebasedb.removeNote(id);
    this.socket.emit('deleteNote', id);
  }

  update(id, field) {
    // this.setState({
    //   undo: this.state.undo.unshift(this.state.notes),
    // });
    // firebasedb.updateNote(id, field);
    this.socket.emit('updateNote', id, field);
  }

  // undo() {
  //   if (this.state.undo.size !== 0) {
  //     this.setState({
  //       undo: this.state.undo.shift(),
  //       notes: this.state.undo.first(),
  //     });
  //   }
  // }

  render() {
    return (
      <div id="board">
        <CreateBar onAdd={newtitle => this.add(newtitle)} undoChange={this.undo} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Notes
              note={note}
              id={id}
              key={id}
              updateNote={this.update}
              deleteNote={this.delete}
            //  bringForward={this.bringForward}
              z={note.zIndex}
            />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
