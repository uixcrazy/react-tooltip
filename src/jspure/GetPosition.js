/**
 * Calculate the position of tooltip
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

export default function (event, container, tooltipEl, place, offset) {

  const widthTooltipEl = tooltipEl.offsetWidth;
  const heightTooltipEl = tooltipEl.offsetHeight;
  const actualOffset = 10 + offset;
  const actualOffsetReverse = 30 + offset;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const boundingClientRectContainer = container.getBoundingClientRect(); // for browser's window
  const topContainerEl = boundingClientRectContainer.top;  // border + padding
  const leftContainerEl = boundingClientRectContainer.left;
  const widthContainerEl = container.offsetWidth; // border
  const heightContainerEl = container.offsetHeight;

  const maxLeftContainer = widthContainerEl + leftContainerEl; // ←-- rightContainerEl
  const bottomContainerEl = topContainerEl + heightContainerEl;

  // ↓↓↓ top && bottom ↓↓↓
  if ((place === 'top') || (place === 'bottom')) {
    const xCursor = mouseX - (widthTooltipEl / 2);
    const yCursor = (place === 'top')
      ? mouseY - (heightTooltipEl + actualOffset)
      : mouseY + actualOffsetReverse;
    const rightEl = xCursor + widthTooltipEl;
    const bottomEl = yCursor + heightTooltipEl;

    let xCursorFinal = xCursor;
    let yCursorFinal = yCursor;
    let positionArrowLeft = widthTooltipEl / 2;
    let currentPlace = place;
    let currentHide = false;

    // ↓↓↓ not enough width to show tooltip
    if (widthContainerEl < widthTooltipEl) return { hide: true };
    // ↑↑↑

    if (xCursor < leftContainerEl) { // to left
      const deviate = leftContainerEl - xCursor;
      xCursorFinal = leftContainerEl;
      positionArrowLeft = (widthTooltipEl / 2) - deviate;
      if (positionArrowLeft < 10) positionArrowLeft = 10;
    }

    if (rightEl > maxLeftContainer) { // to right
      xCursorFinal = maxLeftContainer - widthTooltipEl;
      let deviate = xCursor - xCursorFinal;
      const deviateMax = (widthTooltipEl / 2) - 10;
      if (deviate > deviateMax) deviate = deviateMax;
      positionArrowLeft = (widthTooltipEl / 2) + deviate;
    }

    if ((place === 'top') && (yCursor < topContainerEl)) { // to bottom
      yCursorFinal = mouseY + actualOffsetReverse;
      currentPlace = 'bottom';
      const bottomTooltipEl = yCursorFinal + heightTooltipEl;
      // ↓↓↓ not enough height to show tooltip
      if (bottomContainerEl - bottomTooltipEl < 0) currentHide = true;
    }

    if ((place === 'bottom') && (bottomEl > bottomContainerEl)) { // to top
      yCursorFinal = mouseY - (heightTooltipEl + actualOffset);
      currentPlace = 'top';
      if (yCursorFinal < topContainerEl) currentHide = true;
    }

    return {
      place: currentPlace,
      hide: currentHide,
      position: {
        left: xCursorFinal,
        top: yCursorFinal,
      },
      positionArrow: {
        left: positionArrowLeft,
      },
    };
  }

  // ↓↓↓ left && right ↓↓↓
  if (place === 'left' || (place === 'right')) {
    const xCursor = (place === 'left')
      ? mouseX - (widthTooltipEl + actualOffset)
      : mouseX + actualOffset;
    const yCursor = mouseY - (heightTooltipEl / 2);
    const rightEl = xCursor + widthTooltipEl;
    const bottomEl = yCursor + heightTooltipEl;

    let xCursorFinal = xCursor;
    let yCursorFinal = yCursor;
    let positionArrowTop = heightTooltipEl / 2;
    let currentPlace = place;
    let currentHide = false;

    if (yCursor < topContainerEl) { // top
      const deviate = topContainerEl - yCursor;
      yCursorFinal = topContainerEl;
      positionArrowTop = (heightTooltipEl / 2) - deviate;
      if (positionArrowTop < 10) positionArrowTop = 10;
    }

    if (bottomEl > bottomContainerEl) { // bottom
      yCursorFinal = bottomContainerEl - heightTooltipEl;
      let deviate = yCursor - yCursorFinal;
      const deviateMax = (heightTooltipEl / 2) - 10;
      if (deviate > deviateMax) deviate = deviateMax;
      positionArrowTop = (heightTooltipEl / 2) + deviate;
    }

    if ((place === 'left') && (xCursor < leftContainerEl)) { // to left
      xCursorFinal = mouseX + actualOffsetReverse;
      currentPlace = 'right';
      const rightTooltipEl = xCursorFinal + widthTooltipEl;
      // ↓↓↓ not enough width to show tooltip
      if (maxLeftContainer - rightTooltipEl < 0) currentHide = true;
    }

    if ((place === 'right') && (rightEl > maxLeftContainer)) { // to right
      xCursorFinal = mouseX - (widthTooltipEl + actualOffset);
      currentPlace = 'left';
      if (xCursorFinal < leftContainerEl) currentHide = true;
    }

    return {
      place: currentPlace,
      hide: currentHide,
      position: {
        left: xCursorFinal,
        top: yCursorFinal,
      },
      positionArrow: {
        top: positionArrowTop,
      },
    };
  }

  return ({ hide: true }); // when incorrect
}
