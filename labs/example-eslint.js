// Bad ESLint examples - intentionally wrong code!

var foo = "Hello" ;   // ❌ Missing semicolon (semi)
// ❌ Using var instead of let/const (no-var)
// ❌ Unused variable 'foo' (no-unused-vars)

function add(a, b){
  return a + b;
}
// ❌ Missing semicolon
// ❌ Inconsistent spacing (space-before-function-paren, brace-style)

const result = add(5, "10");
// ❌ Implicit type coercion (eqeqeq or no-implicit-coercion warning if strict rules enabled)

if (result == 15) {  // ❌ Should use === instead of ==
  console.log("Equal!")  // ❌ console.log may be warning in production (no-console)
}

const obj = {name: 'John', age: 30,}
delete obj.name ; // ⚠️ 'delete' on object properties sometimes discouraged (no-delete-var)

for(i=0;i<5;i++){ // ❌ Missing let/const for 'i'
  console.log(i)
}

function sayHi(name) {
  if (name) {
    return "Hi " + name
  }
  else {
    return
  } // ❌ Unnecessary else after return (no-else-return)
}

sayHi() // ⚠️ Missing argument (no-undef / optional warning)

let x = 5
x = x  // ⚠️ no-self-assign

const arr = [1, 2, 3]
arr[3] = 4  // ⚠️ no-magic-numbers (if enabled)

console.log(  "Done!" ) // ❌ Extra spaces, missing semicolon, console usage

// Extra trailing spaces below ⬇️
//  