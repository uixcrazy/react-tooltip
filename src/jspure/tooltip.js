
/*
 * data-param for tooltipItem
 *----------------------------
 * data-tip="content tooltip"
 * data-place="top"
 * data-offset="10"
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

import getPosition from './GetPosition';
import '../tooltip.scss';

class Tooltip {
  constructor(className) {
    // console.log(className);
    this.document = document;
    this.container = this.document.querySelector(`.${className}`);
    this.baseClassName = 'tooltip';

    // console.log(this.container);

    if (!!('ontouchstart' in window)) {
      return;
    }
    if (this.container) {
      this.container.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target.getAttribute('rel') === 'tooltip') {
          this.showTooltip(event, target);
        }
      }, false);
      this.container.addEventListener('mousemove', (event) => { this.updateTooltip(event); }, false);
      this.container.addEventListener('mouseout', (event) => { this.hideTooltip(event); }, false);
    }
    this.state = {
      dataTip: null,
      place: 'top',
      offset: 0,
      // tooltipEl: null,
      // tooltipContent: null,
      // tooltipArrowOutside: null,
      // tooltipArrowInside: null,
    };
    this.createTooltip();
  }

  showTooltip(event, target) {
    if (target) {
      const dataTip = target.getAttribute('data-tip');
      const place = target.getAttribute('data-place') || 'top';
      const offset = Number(target.getAttribute('data-offset')) || 0;

      // console.log(dataTip, place, offset);
      if (dataTip) {
        const { tooltipEl } = this.state;
        Object.assign(this.state, { dataTip, place, offset });
        tooltipEl.classList.add('show');
        this.updateTooltip(event);
      }
    }
  }

  hideTooltip(event) {
    const { tooltipEl } = this.state;
    tooltipEl.classList.remove('show');

    // this.container.removeEventListener('mouseenter', (event) => { this.showTooltip(event); }, false);
    // this.container.removeEventListener('mousemove', (event) => { this.updateTooltip(event); }, false);
    // this.container.removeEventListener('mouseleave', (event) => { this.hideTooltip(event); }, false);
  }

  updateTooltip(event) {
    // console.log(this.state);
    const {
      dataTip,
      place,
      offset,
      tooltipEl,
      tooltipContent,
      tooltipArrowOutside,
      tooltipArrowInside,
    } = this.state;

    const position = getPosition(event, this.container, tooltipEl, place, offset);

    if (position.hide) {
      this.hideTooltip(event);
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

    // Set tooltip position ~~ Math.floor(Double)
    tooltipEl.style.left = `${~~position.position.left}px`;
    tooltipEl.style.top = `${~~position.position.top}px`;
    if (position.positionArrow) {
      tooltipArrowOutside.style.left = `${position.positionArrow.left}px`;
      tooltipArrowInside.style.left = `${position.positionArrow.left}px`;
      tooltipArrowOutside.style.top = `${position.positionArrow.top}px`;
      tooltipArrowInside.style.top = `${position.positionArrow.top}px`;
    }
    // console.log(position);
  }

  createTooltip() {
    let { tooltipEl } = this.state;
    const haveTooltipEl = this.container.querySelector(`.${this.baseClassName}`);
    if (!tooltipEl && !haveTooltipEl) {
      tooltipEl = this.document.createElement('div');
      tooltipEl.setAttribute('class', `${this.baseClassName}`);
      const tooltipArrowOutside = this.document.createElement('span');
      tooltipArrowOutside.setAttribute('class', `${this.baseClassName}-arrow-outside`);
      const tooltipArrowInside = this.document.createElement('span');
      tooltipArrowInside.setAttribute('class', `${this.baseClassName}-arrow-inside`);
      const tooltipContent = this.document.createElement('span');
      tooltipContent.setAttribute('class', `${this.baseClassName}-content`);
      tooltipEl.appendChild(tooltipArrowOutside);
      tooltipEl.appendChild(tooltipArrowInside);
      tooltipEl.appendChild(tooltipContent);
      this.container.appendChild(tooltipEl);
      Object.assign(this.state, { tooltipEl, tooltipArrowOutside, tooltipArrowInside, tooltipContent });
    } else {
      tooltipEl = haveTooltipEl;
      const tooltipArrowOutside = tooltipEl.querySelector(`.${this.baseClassName}-arrow-outside`);
      const tooltipArrowInside = tooltipEl.querySelector(`.${this.baseClassName}-arrow-inside`);
      const tooltipContent = tooltipEl.querySelector(`.${this.baseClassName}-content`);
      Object.assign(this.state, { tooltipEl, tooltipArrowOutside, tooltipArrowInside, tooltipContent });
    }
  }
}

export default Tooltip;


// target.addEventListener('mouseenter', this.showTooltip);
//   target.addEventListener('mousemove', this.updateTooltip);
// target.addEventListener('mouseleave', this.hideTooltip);
