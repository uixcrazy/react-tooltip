
export default function FindTooltip(target, container) {
  // const target = event.target;
  if (target.getAttribute('rel') === 'tooltip') {
    return target;
  }
  if (target === container) return -1;
  if (target.nodeName === 'BODY') return -1;
  return FindTooltip(target.parentNode, container);
}


// export default function (event, container, tooltipEl, place, offset) {


// export FindTooltip;

// function helper(base, power, num) {
//   if (power === 1) return num;
//   return helper(base, power - 1, base * num);
// }

// export const FIND_TOOLTIP = FindTooltip;
// export const DEV_PORT = 9010;
