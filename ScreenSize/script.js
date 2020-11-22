const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  const res = `
width: ${window.screen.width}
height: ${window.screen.height}
`;
  alert(res);
});