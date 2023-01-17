//  This is valid Typescript, but not valid javascript
let foo = 'bar';
//  foo cannot be reassigned to a different type
//  foo = 3 would give an error
function greet() {
    console.log("Hello World");
}
function add(a, b) {
    return a + b;
}
const someTable = document.getElementById("some-table-id");
//  Can be anything, but once assigned, it will have to stay that
let tbd;
tbd = 3;
//  tbd is now of the type number and cannot be changed
