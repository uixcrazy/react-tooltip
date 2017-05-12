# react-tooltip
react, tooltip, es6, webpack2, scss

##### run project
`npm start`

##### port
`9010`

#### How to view

localhost:9010/demo

localhost:9010/todolist

#### How to use

#####  1 . init


``` import Tooltip from '../src/jspure/Tooltip'; ```
```
const Tooltip = new Tooltip({
container: 'list-group', // className of container or Node
document: document, // maybe document of iframe,
className: 'tooltip', // help you figure out your style
});
```

> *note: if you don't input any option, we will get default;

#### 2 . Add data-tip, data-place, data-offset to your element

```<p rel="tooltip" data-tip="hello world">Tooltip</p>```
```<p rel="tooltip" data-tip="hello world" data-place="bottom">Tooltip</p>```

> *note: always have rel="tooltip"
> data-tip is mandatory
