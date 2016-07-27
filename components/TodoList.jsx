import React from 'react';

import TodoItem from './TodoItem';

export default class TodoList extends React.Component {

  static propTypes = {
    dataSource: React.PropTypes.array,
    onDestroyTask: React.PropTypes.func,
    onEditTask: React.PropTypes.func,
    onToggleTask: React.PropTypes.func,
    onToggleAll: React.PropTypes.func
  };

  handleToggle = (event) => {
    this.props.onToggleAll(event.target.checked);
  };

  renderToggleAll() {
    const completedCount = this.props.dataSource.reduce((count, task) => task.completed ? count + 1 : count, 0);

    if (this.props.dataSource.length) {
      return (
        <input
          type="checkbox"
          className="toggle-all"
          checked={completedCount === this.props.dataSource.length}
          onClick={this.handleToggle}
        />
      );
    }
  }

  render() {
    return (
      <section className="main">
        {this.renderToggleAll()}
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className="todo-list">
          {
            this.props.dataSource.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  data={item}
                  onDestroyTask={this.props.onDestroyTask}
                  onEditTask={this.props.onEditTask}
                  onToggleTask={this.props.onToggleTask}
                />
              );
            })
          }
        </ul>
      </section>
    );
  }

}
