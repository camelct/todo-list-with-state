import React from 'react';
import TodoItem from './todoItem/todoItem';
import './todoList.css'

let i = 0;
export default class TodoList extends React.Component {

  state = {
    list: [{ id: 0, content: 'hehe', finish: true }],
    value: '',
    status: 'all',
    searchText: ''
  };

  handleInput = (event) => {
    this.setState({ value: event.target.value })
  };

  onSearchInput = (event) => {
    this.setState({ searchText: event.target.value })
  }

  handleAdd = () => {
    const { value, list } = this.state;
    if (value === '') {
      return
    }
    const newList = [...list, { content: value, finish: false, id: ++i }];
    this.setState({ list: newList, value: '' });
  };

  handleRemove = (id) => {
    const list = this.state.list.filter(item => item.id !== id);
    this.setState({ list })
  };

  handleToggle = (id) => {
    const list = this.state.list.map(item => {
      if (item.id === id) {
        return {
          ...item, finish: !item.finish
        }
      }
      return item;
    });
    this.setState({ list })
  };

  handleStatus = (status) => {
    this.setState({ status })
  };

  render() {
    const { value, list, status, searchText } = this.state;
    return (
      <div className={'todo-list'}>
        <div>
          <input
            type="text"
            className={'todo-list-input'}
            onChange={this.handleInput}
            value={value.slice(0, 20)}
          />
          <button className={'button'} onClick={this.handleAdd}> 新增 </button>
        </div>
        <div>
          <input
            type="text"
            className={'todo-list-input'}
            onChange={this.onSearchInput}
            value={searchText.slice(0, 20)}
          />
          <button className={'button'} onClick={this.handleSearch}> 搜索 </button>
        </div>
        <div className={'button-group'}>
          <button onClick={this.handleStatus.bind(null, 'all')}>全部</button>
          <button onClick={this.handleStatus.bind(null, 'finished')}>已完成</button>
          <button onClick={this.handleStatus.bind(null, 'unfinishde')}>未完成</button>
        </div>
        {
          list.filter((item) => {
            const text = searchText.replace(/\\+/g, '')
            if (text === '') return true;
            const pattrn = new RegExp(text + '', 'g');
            return pattrn.test(item.content);
          }).filter(item => {
            if (status === 'all') {
              return true
            } else if (status === 'finished') {
              return item.finish
            } else {
              return !item.finish
            }
          }).map(item =>
            <TodoItem
              item={item}
              key={item.id}
              handleRemove={this.handleRemove}
              handleToggle={this.handleToggle}
            />
          )
        }

      </div>
    )
  }
}

