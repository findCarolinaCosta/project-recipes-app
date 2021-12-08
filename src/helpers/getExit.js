export default function getExit(history) {
  localStorage.clear();
  history.push('/');
}
