import React from 'react';

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

export default class Footer extends React.Component {

  static propTypes = {
    activeCount: React.PropTypes.number,
    completedCount: React.PropTypes.number,
    filter: React.PropTypes.string,
    onFilter: React.PropTypes.func,
    onClearCompleted: React.PropTypes.func
  };

  renderFilterLink(filter) {
    const selectedClass = filter === this.props.filter ? 'selected' : '';

    return (
      <a className={selectedClass} onClick={() => this.props.onFilter(filter)} style={{cursor: 'pointer'}}>
        {FILTER_TITLES[filter]}
      </a>
    );
  }

  renderClearButton() {
    if (this.props.completedCount) {
      return (
        <button className="clear-completed" onClick={() => this.props.onClearCompleted()}>
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.activeCount}</strong> item left
        </span>
        <ul className="filters">
          {['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }

}
