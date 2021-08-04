import '../css/index.css';

function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3))
