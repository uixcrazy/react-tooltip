export default function getTip(target, container) {
  if (target.getAttribute('rel') === 'tooltip') {
    return target;
  }
  if (target === container) return -1;
  if (target.nodeName === 'BODY') return -1;
  return getTip(target.parentNode, container);
}
