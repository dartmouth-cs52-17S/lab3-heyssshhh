import React, { Component } from 'react';

class CreateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.undoChange = this.undoChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ title: e.target.value });
  }

  submit(e) {
    this.props.onAdd(this.state.title);
  }

  undoChange() {
    this.props.undoChange();
  }

  render() {
    return (
      <div id="CreateBar" >
        <input id="bar" onChange={this.onInputChange} value={this.state.value} />
        <button className="myButtons" onClick={this.submit}>Add</button>
        <button className="myButtons" onClick={this.undoChange}>Undo</button>
      </div>
    );
  }
}

export default CreateBar;
