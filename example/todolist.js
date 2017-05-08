
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom'; // eslint-disable-line
import List from './todolist/index'; // eslint-disable-line
import Ttt from '../src/jspure/Tooltip';

const todoItems = [
  { text: 'redux', done: false },
  { text: 'unit test', done: false },
  { text: 'CSS in JS', done: false },
  { text: 'learn react', done: false },
  { text: 'go shopping', done: true },
  { text: 'buy flowers', done: true },
];
// const FinalList = makeWrapperTooltip(List);
// <DemoA />
// <FinalList
//   tooltip={{ dataTooltip: 'daile' }}
//   initItems={todoItems} />


setTimeout(() => {
  new Ttt({ ttContainer: 'list-group' });
}, 1000);
render(
  <div>
    <List initItems={todoItems}/>
  </div>
  , document.getElementById('root'));
