import React from 'react';
import Utils from '../utils/utils';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const TODO_FILTER = {
  'SHOW_ALL': () => true,
  'SHOW_ACTIVE': task => !task.completed,
  'SHOW_COMPLETED': task => task.completed
};

export default class TodoApp extends React.Component {

  state = {
    tasks: [],
    filter: 'SHOW_ALL'
  };

  handleAddTask = (value) => {
    let newTasks = this.state.tasks.concat({
      id: Utils.generateId(),
      name: value,
      completed: false,
      created_at: new Date()
    });

    this.setState({tasks: newTasks});
  };

  handleEditTask = (id, value) => {
    let newTasks = this.state.tasks.map((task) => {
      if (id == task.id) {
        task.name = value;
      }

      return task;
    });

    this.setState({tasks: newTasks});
  };

  handleDestroyTask = (id) => {
    let newTasks = this.state.tasks.filter((task) => id != task.id);

    this.setState({tasks: newTasks});
  };

  handleToggle = (id) => {
    let newTasks = this.state.tasks.map((task) => {
      if (id == task.id) {
        task.completed = !task.completed;
      }

      return task;
    });

    this.setState({tasks: newTasks});
  };

  handleToggleAll = (status) => {
    let newTasks = this.state.tasks.map((task) => {
      task.completed = status;

      return task;
    });

    this.setState({tasks: newTasks});
  };

  handleFilter = (filter) => {
    this.setState({filter: filter});
  };

  handleClearCompleted = () => {
    let newTasks = this.state.tasks.filter((task) => !task.completed);

    this.setState({tasks: newTasks});
  };

  renderFooter(completedCount) {
    const activeCount = this.state.tasks.length - completedCount;

    if (this.state.tasks.length) {
      return (
        <Footer
          filter={this.state.filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onFilter={this.handleFilter}
          onClearCompleted={this.handleClearCompleted}
        />
      );
    }
  }

  render() {
    const filterTasks = this.state.tasks.filter(TODO_FILTER[this.state.filter]);
    const completedCount = this.state.tasks.reduce((count, task) => task.completed ? count + 1 : count, 0);

    return (
      <div>
        <Header addTask={this.handleAddTask}/>
        <TodoList
          dataSource={filterTasks}
          onDestroyTask={this.handleDestroyTask}
          onEditTask={this.handleEditTask}
          onToggleTask={this.handleToggle}
          onToggleAll={this.handleToggleAll}
        />
        {this.renderFooter(completedCount)}
      </div>
    );
  }

}
