//  This is valid Typescript, but not valid javascript
let foo : string = 'bar';

//  foo cannot be reassigned to a different type
//  foo = 3 would give an error

function greet () : void
{
	console.log ("Hello World");
}

function add (a:number, b:number) : number
{
	return a + b;
}

const someTable : HTMLTableElement = document.getElementById ("some-table-id") as HTMLTableElement;

//  Can be anything, but once assigned, it will have to stay that
let tbd : unknown;
tbd = 3;
//  tbd is now of the type number and cannot be changed

//  Anything declared as an interface must have all of the properties
//  listed in the blueprint
interface exampleInterface
{
	a: string,
	b: number
}

const usingInterface : exampleInterface = {"Hello", 57};

function domOps (elem : HTMLElement) : void
{
	elem.id = 'some-id';
	elem.innerHTML = '<div>some class</div>';
}

function usingCustomInterface (param : exampleInterface) : void
{
	console.log (param);
}

usingCustomInterface (usingInterface);

const notExampleInterface : any =
{
	a : "hello",
	b: 3,
	c [],
	d {'hello', 'world'}
}

//  This will work because notExampleInterface has a string and number in the place
//  expected of the exampleInterface even though they are not the same
//  This is referred to as the 'shape' of the object 
usingCustomInterface (notExampleInterface);

interface oneThatUsesDate
{
	created: Date | string | number
}

/*
This works with any
function fn1 (bar : any)
{
	bar ();
}

This doesn't work with unknown
function fn2 (foo : unknown)
{
	foo ();
}

let z : unknown;
Can't assign unknown to anything other than any without a cast
This doesn't work
let x : number = z;

This does work
let x : number = z as number;

This also works 
let x : any = z;
*/

//  This can be done without node complaining because w is declared as any
let w : any = "string";
let t : string = w;
let i : number = w;