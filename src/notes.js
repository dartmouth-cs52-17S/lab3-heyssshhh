import React, { Component } from 'react';
import Draggable from 'react-draggable';
import textarea from 'react-textarea-autosize';
import marked from 'marked';


class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: false,
    };

    this.onDrag = this.onDrag.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.editOrSave = this.editOrSave.bind(this);
    this.noteStyle = this.noteStyle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.renderThis = this.renderThis.bind(this);
    this.enter = this.enter.bind(this);
    this.titleStyle = this.titleStyle.bind(this);
  }


  onDrag(event, ui) {
    this.props.updateNote(this.props.id, { x: ui.x, y: ui.y });
    this.props.bringForward(this.props.id);
  }

  delete() {
    this.props.deleteNote(this.props.id);
  }

  update(event) {
    this.props.updateNote(this.props.id, { text: event.target.value });
  }

  updateTitle(event) {
    this.props.updateNote(this.props.id, { title: event.target.value });
  }

  toggle() {
    this.setState({ chosen: !this.state.chosen });
  }

  editOrSave() {
    if (this.state.chosen) { return <i className="fa fa-check" onClick={this.toggle} />; }
    return <i className="fa fa-pencil" onClick={this.toggle} />;
  }

  enter(event) {
    if (event.which === 13) { this.toggle(); }
  }

  noteStyle() {
    if (this.state.chosen) return (<textarea className="editText" value={this.props.note.text} onChange={this.update} onKeyPress={this.enter} />);
    return (<div className="displayText" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />);
  }

  titleStyle() {
    if (this.state.chosen) return (<textarea className="editTitle" value={this.props.note.title} onChange={this.updateTitle} onKeyPress={this.enter} />);
    return (<span>{this.props.note.title}</span>);
  }

  renderThis() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
        zIndex={this.props.note.zIndex}
      >
        <div className="note" style={{ zIndex: this.props.note.zIndex }}>
          <div className="note_top">
            <div className="left">
              {this.titleStyle()}
              <i onClick={this.delete} className="fa fa-trash-o" />
              {this.editOrSave()}
            </div>
            <i className="fa fa-arrows-alt note-mover" aria-hidden="true" />
          </div>
          {this.noteStyle()}
        </div>
      </Draggable>
    );
  }


  render() {
    return (
      this.renderThis()
    );
  }

}

export default Notes;
