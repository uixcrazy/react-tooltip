
/*
 * data-param for tooltipItem
 *----------------------------
 * data-tip="content tooltip"
 * data-place="top"
 * data-offset="10"
 * data-resize-window
 * data-static
*/

/*
 * container ----- must className
 * afterShow → not yet
 * afterHide → not yet
 */

/*
 * Event
 * ----- mouseover
 * ----- onmouseout
 * ----- onmousemove
 */

import getPosition from '../GetPosition';

class Tooltip {
  constructor(className) {
    console.log(className);
    const container = document.querySelector(`.${className}`);
    this.container = container;
    console.log(container);
    if (container) {
      container.addEventListener('mouseover', (event) => {
        const elm = event.target;
        if (elm.getAttribute('rel') === 'tooltip') {
          this.showTooltip(event, elm);
        }
      }, false);
    }
    this.state = {
      dataTip: null,
      place: 'top',
      offset: 0,
      resizeHide: true,
      isFollowMouse: true,
      show: false,
    };
  }

  showTooltip(event, elm) {
    const dataTip = elm.getAttribute('data-tip');
    const place = elm.getAttribute('data-place') || 'top';
    const offset = Number(elm.getAttribute('data-offset')) || 0;
    const resizeHide = elm.hasAttribute('data-resize-window'); // → true/false
    const isFollowMouse = elm.hasAttribute('data-static'); // → true/false

    console.log(dataTip, place, offset, resizeHide, isFollowMouse);
    if (dataTip) {
      Object.assign({}, this.state, { dataTip, place, offset, resizeHide, isFollowMouse });
    }
    this.updateTooltip(event, elm);
  }

  updateTooltip(event, elm) {
    console.log(this.state);
    const { place, offset, isFollowMouse } = this.state;


    if (elm.classList.contains('top')) elm.classList.remove('top');
    if (elm.classList.contains('bottom')) elm.classList.remove('bottom');
    if (elm.classList.contains('right')) elm.classList.remove('right');
    if (elm.classList.contains('left')) elm.classList.remove('left');
    elm.classList.add(this.state.place);

    // (event, target, container, tooltipEl, place, isFollowMouse, offset)
    const result = getPosition(event, elm, this.container, elm, place, isFollowMouse, offset);
    console.log(result);

  }
}

export default Tooltip;


        // target.addEventListener('mouseenter', this.showTooltip);
        //   target.addEventListener('mousemove', this.updateTooltip);
        // target.addEventListener('mouseleave', this.hideTooltip);
