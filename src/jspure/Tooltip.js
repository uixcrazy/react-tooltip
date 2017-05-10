/*
 * data-param when init tooltip
 *----------------------------
 * Object ↓↓↓
 * container: body || className || HTML element -------- at container, not use Flexbox CSS
 * document: document or document of iframe
 * className: allow you change ClassName of Tooltip
*/

/*
 * data-param for tooltipItem
 *----------------------------
 * data-tip="content tooltip"
 * data-place="top"
 * data-offset="10"
*/

/*
 * Return: Function
 *----------------------------
 * changeClassName()
 * afterShow()  // this.afterShow
 * afterHide()
*/

import getPosition from './GetPosition';
import FindTooltip from './FindTooltip';
import '../tooltip.scss';

class Tooltip {
  constructor(props) {
    let container = 'body'; // default
    this._document = document; // default
    this._className = 'tooltip'; // default

    if (props) {
      if (props.container) container = props.container;
      if (props.document) this._document = props.document;
      if (props.className) this._className = props.className;
    }

    this._container = this._document.getElementsByTagName('BODY')[0];
    if (typeof container === 'string' && container.toUpperCase() !== 'BODY') { // is className
      this._container = this._document.querySelector(`.${container}`);
    }
    if (typeof container === 'object' && container.nodeType === 1) {
      this._container = container;
    }

    // if (!!('ontouchstart' in window)) {
    //   return;
    // }
    if (this._container) {
      // Event Delegation
      // ------------------------------------------------------
      // this._container.addEventListener('mouseenter', (event) => { // only fire one time.
      this._container.addEventListener('mouseover', (event) => {
        const target = event.target;
        const isShow = FindTooltip(target, this._container);
        if (isShow !== -1) this.showTooltip(event, isShow);
      });

      this._container.addEventListener('mousemove', (event) => { this.updateTooltip(event); }, false);
      this._container.addEventListener('mouseout', () => { this.hideTooltip(); }, false);
    }
    this._state = {
      dataTip: null,
      place: 'top',
      offset: 0,
      tooltipEl: null,
      tooltipContent: null,
      tooltipArrowOutside: null,
      tooltipArrowInside: null,
    };
    this.createTooltip();
  }

  showTooltip(event, target) {
    if (target) {
      const dataTip = target.getAttribute('data-tip');
      const place = target.getAttribute('data-place') || 'top';
      const offset = Number(target.getAttribute('data-offset')) || 0;

      const { tooltipEl } = this._state;
      Object.assign(this._state, { dataTip, place, offset });
      if (dataTip) {
        tooltipEl.classList.add('show');
        if (this.afterShow && typeof this.afterShow === 'function') this.afterShow();
      }
      this.updateTooltip(event);
    }
  }

  hideTooltip() { // event
    const { tooltipEl } = this._state;
    tooltipEl.classList.remove('show');
    if (this._state.dataTip && this.afterHide && typeof this.afterHide === 'function') {
      this.afterHide();
    }

    // this._container.removeEventListener('mouseenter', (event) => { this.showTooltip(event); }, false);
    // this._container.removeEventListener('mousemove', (event) => { this.updateTooltip(event); }, false);
    // this._container.removeEventListener('mouseleave', (event) => { this.hideTooltip(event); }, false);
  }

  updateTooltip(event) {
    const {
      dataTip,
      place,
      offset,
      tooltipEl,
      tooltipContent,
      tooltipArrowOutside,
      tooltipArrowInside,
    } = this._state;

    const position = getPosition(event, this._container, tooltipEl, place, offset);

    if (position.hide || !dataTip) {
      this.hideTooltip();
      return;
    }

    tooltipContent.innerHTML = dataTip;
    if (position.place) {
      if (tooltipEl.classList.contains('top')) tooltipEl.classList.remove('top');
      if (tooltipEl.classList.contains('bottom')) tooltipEl.classList.remove('bottom');
      if (tooltipEl.classList.contains('right')) tooltipEl.classList.remove('right');
      if (tooltipEl.classList.contains('left')) tooltipEl.classList.remove('left');
      tooltipEl.classList.add(position.place);
    }

    // Set tooltip position ~~ ← Math.floor(Double)
    tooltipEl.style.left = `${Math.round(position.position.left)}px`;
    tooltipEl.style.top = `${Math.round(position.position.top)}px`;
    tooltipArrowOutside.removeAttribute('style'); // reset
    tooltipArrowInside.removeAttribute('style'); // reset
    if (position.positionArrow) {
      tooltipArrowOutside.style.left = `${Math.round(position.positionArrow.left)}px`;
      tooltipArrowInside.style.left = `${Math.round(position.positionArrow.left)}px`;
      tooltipArrowOutside.style.top = `${Math.round(position.positionArrow.top)}px`;
      tooltipArrowInside.style.top = `${Math.round(position.positionArrow.top)}px`;
    }
  }

  createTooltip() {
    let { tooltipEl } = this._state;
    const haveTooltipEl = this._container.querySelector(`.${this._className}`);
    if (!tooltipEl && !haveTooltipEl) {
      tooltipEl = this._document.createElement('div');
      tooltipEl.setAttribute('class', `${this._className}`);
      const tooltipArrowOutside = this._document.createElement('span');
      tooltipArrowOutside.setAttribute('class', `${this._className}-arrow-outside`);
      const tooltipArrowInside = this._document.createElement('span');
      tooltipArrowInside.setAttribute('class', `${this._className}-arrow-inside`);
      const tooltipContent = this._document.createElement('span');
      tooltipContent.setAttribute('class', `${this._className}-content`);
      tooltipEl.appendChild(tooltipArrowOutside);
      tooltipEl.appendChild(tooltipArrowInside);
      tooltipEl.appendChild(tooltipContent);
      this._container.appendChild(tooltipEl);
      Object.assign(this._state, { tooltipEl, tooltipArrowOutside, tooltipArrowInside, tooltipContent });
    } else {
      tooltipEl = haveTooltipEl;
      const tooltipArrowOutside = tooltipEl.querySelector(`.${this._className}-arrow-outside`);
      const tooltipArrowInside = tooltipEl.querySelector(`.${this._className}-arrow-inside`);
      const tooltipContent = tooltipEl.querySelector(`.${this._className}-content`);
      Object.assign(this._state, { tooltipEl, tooltipArrowOutside, tooltipArrowInside, tooltipContent });
    }
  }

  set className(className) {
    this._className = className;
  }
}

export default Tooltip;

// Reference:
//    https://www.w3schools.com/jsref/prop_node_nodetype.asp
//    https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/typeof
