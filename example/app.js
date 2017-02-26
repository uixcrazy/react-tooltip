
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom'; // eslint-disable-line
import DemoA from './demo01'; // eslint-disable-line
import List from './todolist/index';
import makeWrapperTooltip from '../src/WrapperTooltip';


const todoItems = [
  { text: 'learn react', done: false },
  { text: 'Go shopping', done: true },
  { text: 'buy flowers', done: true },
];
const FinalList = makeWrapperTooltip(List);
// <DemoA />

render(
  <div>
    <FinalList
      tooltip={{ dataTooltip: 'daile' }}
      initItems={todoItems} />
  </div>
  , document.getElementById('app'));
