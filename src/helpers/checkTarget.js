function checkTarget({ target }) {
  const elementToCheck = target.parentElement;
  if (target.checked) {
    elementToCheck.style.textDecoration = 'line-through';
  }
  if (!target.checked) {
    elementToCheck.style.textDecoration = 'none';
  }
}

export default checkTarget;
