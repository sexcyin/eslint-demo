// function foo() { return; }

function foo() {
  let str = 'abc';
  document.getElementById('id')
  // doSomething();
  /* eslint-disable no-debugger */
  debugger
  return;
}

// function foo() {
//   if (condition) {
//     bar();
//     return;
//   } else {
//     baz();
//   }
// }

// function foo() {
//   let a = 1;
//   switch (bar) {
//     case 1:
//       doSomething();
//     default:
//       doSomethingElse();
//       return;
//   }
// }