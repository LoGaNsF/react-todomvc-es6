import React from 'react';

export default class TodoItem extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    onDestroyTask: React.PropTypes.func,
    onEditTask: React.PropTypes.func,
    onToggleTask: React.PropTypes.func
  };

  state = {
    editing: false,
    editText: this.props.data.name
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleSubmit = () => {
    var val = this.state.editText.trim();
    if (val) {
      this.setState({editing: false, editText: val});
      this.props.onEditTask(this.props.data.id, val);
    } else {
      this.props.onDestroyTask();
    }
  };

  handleToggle = () => {
    this.props.onToggleTask(this.props.data.id);
  };

  handleDestroy = () => {
    this.props.onDestroyTask(this.props.data.id);
  };

  handleKeyDown = (event) => {
    if (event.which === 27) {
      this.setState({editing: false, editText: this.props.data.name});
    } else if (event.which === 13) {
      this.handleSubmit();
    }
  };

  handleChange = (event) => {
    this.setState({editText: event.target.value});
  };

  render() {
    let className = '';
    if (this.props.data.completed) { className += ' completed' }
    if (this.state.editing) { className += ' editing' }

    return (
      <li className={className}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={this.props.data.completed}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>{this.props.data.name}</label>
          <button className="destroy" onClick={this.handleDestroy}/>
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.editText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }

}
