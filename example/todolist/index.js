import React, { Component } from 'react';
import './todolist.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    this.props.onClickClose(Number(this.props.index));
  }
  onClickDone() {
    this.props.onClickDone(Number(this.props.index));
  }

  render() {
    const itemClass = this.props.item.done ? 'done' : 'undone';
    return (
      <div className= {`item ${itemClass}`} rel="tooltip" data-tip={this.props.item.text}>
        <span className='mark-done' onClick={this.onClickDone}>{'\u2714'}</span>
        <span className="text">{this.props.item.text}</span>
        <span className='close' onClick={this.onClickClose}>{'\u2718'}</span>
      </div>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
    this.state = ({
      inputValue: '',
    });
  }

  componentDidUpdate() {
    const { rebind } = this.props;
    if (this.state.update && rebind) {
      this.setState({
        update: false,
      }, rebind());
    }
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addTodo(e) {
    e.preventDefault();
    const newItem = this.props.initItems.unshift({
      text: this.state.inputValue,
      done: false,
    });
    this.setState({
      initItems: newItem,
      inputValue: '',
      update: true,
    });
  }

  deleteTodo(index) {
    this.props.initItems.splice(index, 1);
    this.setState({
      initItems: this.props.initItems,
    });
  }

  doneTodo(index) {
    let todo = this.props.initItems[index];
    let item = this.props.initItems;
    item.splice(index, 1);
    todo.done = !todo.done;
    todo.done ? item.push(todo) : item.unshift(todo);
    this.setState({
      item: item
    });
  }

  render() {
    const items = this.props.initItems.map((item, index) => {
      return (
        <Item
          key={index}
          item={item}
          index={index}
          onClickClose={this.deleteTodo.bind(this, index)}
          onClickDone={this.doneTodo.bind(this)} />
      );
    });
    return (
      <div>
        <ul className="list-group"> {items} </ul>
        <form id='add-form' onSubmit={this.addTodo.bind(this)}>
          <input type='text'
            placeholder='Add your todo!'
            value={this.state.inputValue}
            onChange={this.handleChange.bind(this)}
            required
            />
            <button className='add-button'>Add Todo</button>
        </form>
      </div>
    );
  }
}

export default List;
// React.render(
//   <List initItems={todoItems} />,
//   document.getElementById('content')
// );
