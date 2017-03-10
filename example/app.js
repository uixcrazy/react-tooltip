
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom'; // eslint-disable-line
// import DemoA from './demo01'; // eslint-disable-line
import List from './todolist/index';
// import makeWrapperTooltip from '../src/WrapperTooltip';
import ttt from '../src/jspure/tooltip';

const todoItems = [
  { text: 'learn react', done: false },
  { text: 'Go shopping', done: true },
  { text: 'buy flowers', done: true },
];
// const FinalList = makeWrapperTooltip(List);
// <DemoA />
// <FinalList
//   tooltip={{ dataTooltip: 'daile' }}
//   initItems={todoItems} />


setTimeout(() => {
  new ttt('list-group');
}, 1000);
render(
  <div>
    <List initItems={todoItems}/>
  </div>
  , document.getElementById('app'));
