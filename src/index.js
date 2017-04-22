import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import CreateBar from './CreateBar';
import * as firebasedb from './firebasedb';
import Notes from './notes';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      undo: Immutable.Stack(),
      id: 0,
      topZ: 0,
    };

    this.addNotes = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.undo = this.undo.bind(this);
    this.update = this.update.bind(this);
    this.bringForward = this.bringForward.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  add(newtitle) {
    const note = {
      title: newtitle,
      text: '',
      x: 200,
      y: 200,
      zIndex: 0,
    };
    this.setState({
      id: this.state.id + 1,
      notes: this.state.notes.set(this.state.id, note),
      undo: this.state.undo.unshift(this.state.notes),

    });
    firebasedb.addNote(note);
  }

  bringForward(id) {
    this.setState({
      topZ: this.state.topZ + 1,
    });
    this.update(id, { zIndex: this.state.topZ });
  }

  delete(id) {
    this.setState({
      notes: this.state.notes.delete(id),
      undo: this.state.undo.unshift(this.state.notes),
    });
    firebasedb.removeNote(id);
  }

  update(id, field) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, field); }),
      undo: this.state.undo.unshift(this.state.notes),
    });
    firebasedb.updateNote(id, field);
  }

  undo() {
    if (this.state.undo.size !== 0) {
      this.setState({
        undo: this.state.undo.shift(),
        notes: this.state.undo.first(),
      });
    }
  }

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
              bringForward={this.bringForward}
            />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
