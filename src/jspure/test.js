/**
 * Calculate the position of tooltip
 *
 * ----------------------------------------------------------------------------
 * https://github.com/wwayne/react-tooltip/blob/master/src/utils/getPosition.js
 * ----------------------------------------------------------------------------
 *
 * @params
 * - `event` {Event} the event of current mouse
 * - `tooltipEl` {DOM}
 * - `container` {DOM} Keeps the tooltip within the bounds of this element.
 * - `place` {String} top / right / bottom / left
 * - `offset` {Number} the offset to default position
 *
 * @return {Object
 * - `place` {String} new placement
 * - `hide` {Boolean} return true, if incorrect
 * - `position` {OBject} {left: {Number}, top: {Number}}
 * - `positionArrow` {OBject} {left: {Number}, top: {Number}}
 */



const marginLeft = parseInt(getComputedStyle(container, '').getPropertyValue('margin-left'), 10);
const borderLeftWidth = parseInt(getComputedStyle(container, '').getPropertyValue('border-left-width'), 10);
const marginTop = parseInt(getComputedStyle(container, '').getPropertyValue('margin-top'), 10);
const borderTopWidth = parseInt(getComputedStyle(container, '').getPropertyValue('border-top-width'), 10);

const containerList = this.document.querySelectorAll(`.${className}`);

