# My Typescript Notes https://www.typescriptlang.org

## Intro

### https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html

**TypeScript is JavaScript’s runtime with a compile-time type checker**

### [Typescript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

JavaScript provides language primitives like `string` and `number`, but it doesn’t check that you’ve consistently assigned these. TypeScript does.

## [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

#### Static type-checking

_Static types systems_ describe the shapes and behaviors of what our values will be when we run our programs.

#### Non-exception Failures

catches typos, uncalled functions, and basic logic errors. Perhaps vanilla JS might return `undefined`, but TS will help:

```
const user = {
  name: "Daniel",
  age: 26,
};

user.location;
// Property 'location' does not exist on type '{ name: string; age: number; }'.
```

#### Types for Tooling

Typescript can _prevent_ us from making mistakes with type-checker as I'm typing code.

### `tsc`, the TypeScript compiler

```
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}

greet("Brendan");
```

using `tsc` compiles Typescript, creates a js file.
`tsc hello.ts`

### Emitting with Errors

TS won't break JS the way ES Lint w/ React stops it from working. Assumes you may bring things over to TS and need time to fix it up.

```
tsc --noEmitOnError hello.ts
```

### Explicit Types

```
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

### Erased Types

**Type annotations never change the runtime behavior of your program.**

## When TS is compiled, you won't see type-annotations because they aren't part of JS.

### Downleveling

### Strictness

TS settings go in a [`tsconfig.json` file.](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
I don't see where to

#### `noImplicitAny`

#### `strictNullChecks`

---

### The Basics

---

## Everyday Types

### The primitives: `string`, `number`, and `boolean`

### Arrays

`number[]` = `[1, 2, 3]`
syntax works for any type, e.g. `string[]` is an array of strings
Can also be written as `Array<number>`

### `any`

when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

```
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

### `noImplicitAny`

Use the compiler flag `noImplicitAny` to flag any implicit `any` as an error.

### Type Annotations on Variables

```
let myName: string = "Alice";
```

```
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

### Functions

you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its `return` statements.

#### Parameter Type Annotations

```
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

#### Return Type Annotations

```
function getFavoriteNumber(): number {
  return 26;
```

### Anonymous Functions

### Object Types

_object type_ = any JS value w/ properties.

To define an object type, list its properties and their types:

```
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

-   use `,` or `;` to separate the properties.
-   If no type is specified, it will be assumed to be `any`.

#### Optional Properties

add a `?` after property name to make it optional.

```
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

if you access a non-existant property, you get `undefined` rather than a runtime error. Therefore, when you _read_ from an optional property, you'll have to check for `undefined` before using it:

```
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
Object is possibly 'undefined'.

  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

### Union Types

TS allows you to build new types out of existing ones by combining them using operators.

#### Defining a Union Type

_union type_ = type formed from 2 or more other types, representing values taht may be _any one_ of those types. Each of these types are the union's _members._

```
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
```

#### Working with Union Types

values must be valid for _every_ member of the union. E.g., with `union string | number`, you can't use methods only availble on `string`.

### Type Aliases

_type alias_ = a _name_ for any _type_.

```
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

You can use a type alias to give a name to any type, not just object types. E.g., a union type:

```
type ID = number | string;
```

### Interfaces

_interface declaration_ = another way to name an object type:

```
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

### [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

(helpful tables)

-   a type cannot be re-opened to add new properties vs an interface which is always extendable.

### Type Assertions

_type assertions_ specify a more specific type. E.g., you know you're going through the DOM and it should always have an `HTMLCanvasElement` with a given ID:

```
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

### Literal Types

In addition to general types `string` and `number`, we can refer to _specific_ strings & numbers in type positions.

In JS, `var` and `let` allow for changing what's held inside a variable.

`const` does not.
When hovering over this const below, it will say `const constantString: "Hello World"`

```
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
// -> const constantString = "Hello World";

```

With `let`, it will say `let changingString: string`.

```
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
```

By _combining_ literals into unions, e.g. functions that only accept a certain set of known values:

```
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

Numeric literal types:

```
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

combination:

```
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

Only two boolean literal types: `true` and `false`. `boolean` type itself just an alias for the union `true | false`.

#### Literal Inference

Because TS infers types for both _reading_ and _writing_ behavior, TS assumes the properties of objects may change values.

In this example, `obj.counter` must have the type `number` and not `0`:

```
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

Same with strings. In this example, `req.method` in inferred to be `string`, not `"GET"`. This means `handleRequest` could assign a new string like `GUESS` to `req.method. Therefore, it's an error:

```
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

Workarounds:

1. change the inference by adding a type assertion in either location:

    ```
    // Change 1:
    // “I intend for req.method to always have the literal type "GET"”, preventing the possible assignment of "GUESS" to that field after.
    const req = { url: "https://example.com", method: "GET" as "GET" }  ;
    // Change 2
    // “I know for other reasons that req.method has the value "GET"“.
    handleRequest(req.url, req.method as "GET");
    ```

2. use `as const` to convert the entire object to be type literals:

    ```
    const req = { url: "https://example.com", method: "GET" } as const;
    handleRequest(req.url, req.method);
    ```

### `null` and `undefined`

-   JS has two primitive values to signal absent or uninitialized values.
-   TS has two corresponding _types_ by the same names. Their behavior determined by whether or not you have `strictNullChecks` option on or off.

#### strictNullChecks off

-   Don't turn it off. Keep it on whenever possible.
-   When off, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type.
-   Java & C# don't have null checks, either.

#### strictNullChecks on

When on, you need to use _narrowing_ to check for `null` or `undefined` before using methods or properties on those values.

```
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

#### Non-null Assertion Operator (Postfix `!`)

-   `!` after any expression is effecitvely a type assertion that the value is'nt `null` or `undefined`.
-   Only use `!` when you know that the value _can't_ be `null` or `undefined`.

```
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

### Enums

-   hold off using until I understand more.
-   allow for describing a value which could be one of a set of possible named constants.
-   _not_ a type-level addition to JS because it's adde dto the langugae and runtime.

### Less Common Primitives

#### `bigint`

large integers:

```
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```

#### `symbol`

This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap:

```
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {

  // Can't ever happen
}
```

## Narrowing

_narrowing_ = refining types to more specific types than declared.

In TypeScript, checking against the value returned by `typeof` is a type guard. `typeof padding === "number"` = a form of code called a _type guard_.

The next example contains an error. Adding a `number | string` to a `number` might not work.

```
function padLeft(padding: number | string, input: string) {
  return " ".repeat(padding) + input;
}
```

Argument of type 'string | number' is not assignable to parameter of type 'number'.

Type 'string' is not assignable to type 'number'.

Instead, explicitly check if `padding` is a `number` first _and_ handle the case where it's a `string`.

```
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

### `typeof` type guards

`typeof` can return

-   `"string"`
-   `"number"`
-   `"bigint"`
-   `"boolean"`
-   `"symbol"`
-   `"undefined"`
-   `"object"`
-   `"function"`

**_IMPORTANT REMINDERS_**

-   arrays are object types in JS.
    `typeof null` is actuall `"object"`!

```
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
Object is possibly 'null'.

      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
```

### Truthiness narrowing

In JS, we can use any expression in:

-   conditionals
-   `&&`s,
-   `||`s,
-   `if` statements
-   Boolean negations (`!`)
-   etc.

E.g. if statements don't expect their condition to always have type `boolean`:

```
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}
```

#### JS equality checks review IMPORTANT!

-   review `Null` vs. `Undefined` article in evernote
-   review Double Equals vs. Triple Equals article in evernote

in JS, constructs like `if` first "coerce" their conditions to `booleans` to make sense of them. These all coerce to false:

-   `0`
-   `NaN`
-   `""` (the empty string)
-   `0n` (the `bigint` version of zero)
-   `undefined`

Other values get coerced `true`.

looser equality checks with `==` and `!=` get narrowed correctly:

-   checking whether something `== null`..... checks whether it is specifically the value `null` .... _and_ whether it's potentially `undefined`.
-   checking whether something `== undefined` checks whether it is specifically the value `undefined` _and_ whether it's potentially `null`.

You can coerce values to `boolean`s:

```
// both of these result in 'true'

// boolean function:
Boolean("hello"); // type: boolean, value: true

// double-Boolean negation:
!!"world"; //        type: true,    value: true
```

Common pattern to use this to guard against `null` or `undefined` values. This checks to see if `strs` is truthy.

```
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

```
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

Boolean negations with `!` filetr out from negated branches:
???

```
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

### Equality narrowing

TS uses:

-   `switch` statements
-   equality checks
    -   `===`
    -   `!==`
    -   `==`
    -   `!=`

to narrow types.

In this example, `string` is the only common type that both `x` and `y` can take on. Therefore, TS knows that `x` and `y` must be a `string` in the first branch:

```
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();

(method) String.toUpperCase(): string
    y.toLowerCase();

(method) String.toLowerCase(): string
  } else {
    console.log(x);

(parameter) x: string | number
    console.log(y);

(parameter) y: string | boolean
  }
}
```

### The [in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) operator narrowing

The `in` operator returns `true` if the specified property is in the specified object or its prototype chain.

```
const car = { make: 'Honda', model: 'Accord', year: 1998 };

console.log('make' in car);
// expected output: true

delete car.make;
if ('make' in car === false) {
  car.make = 'Suzuki';
}

console.log(car.make);
// expected output: "Suzuki"
```

The `void` operator evaluates the given expression and then returns `undefined`.

```
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

```
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;

(parameter) animal: Fish | Human
  } else {
    animal;

(parameter) animal: Bird | Human
  }
}
```

### instanceof narrowing

savePoint

### Assignments

### Control flow analysis

### Using type predicates

### Discriminated unions

### The never type

### Exhaustiveness checking

---

---

# My JS Notes

## What is a Callback Function?

### Functions are Objects

In JS, functions = first-class objects = work with them by assigning to variables, passing as arguments, etc.

### Callback Functions

| Word                      | Definition                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **callback function**     | function passed _as an argument_ to another function.                                                             |
| **higher-order function** | a function that accepts other functions as arguments & contains logic for _when_ callback function gets executed. |

## Function Expression vs. Function Declaration

|               | Function Expression                                                                                                                                                      | Function Declaration                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description   | function keyword used to define a function inside an expression                                                                                                          | AKA function statement                                                                                                                                            |
| example       | const getRectArea = function(width, height) {<br> &nbsp;&nbsp;&nbsp;&nbsp;return width \* height;<br>};<br><br>console.log(getRectArea(3, 4));<br>// expected output: 12 | function calcRectArea(width, height) {<br> &nbsp;&nbsp;&nbsp;&nbsp;return width \* height;<br>}<br><br>console.log(calcRectArea(5, 6));<br>// expected output: 30 |
| function name | can be _omitted_ for an anonymous function                                                                                                                               | name required                                                                                                                                                     |
| IIFE          | Can be used as IIFE (Immediately Invoked Function Expression)                                                                                                            | Cannot be used as IIFE                                                                                                                                            |
| Hoisting      | _Not_ hoisted. Can't use them until after they've been created                                                                                                           | Yes, hoisted                                                                                                                                                      |

### [Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)

The function keyword can be used to define a function inside an expression.

```
const getRectArea = function(width, height) {
  return width * height;
};

console.log(getRectArea(3, 4));
// expected output: 12
```

#### Description

-   The main difference between a function expression and a function declaration is the function name, which can be omitted in function expressions to create anonymous functions.
-   A function expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined.

#### Function expression hoisting

-   Function expressions in JavaScript are not hoisted, unlike function declarations. You can't use function expressions before you create them:

### Function declaration

The function declaration (function statement) defines a function with the specified parameters.

```
function calcRectArea(width, height) {
  return width * height;
}

console.log(calcRectArea(5, 6));
// expected output: 30
```

## JavaScript Maps

-   holds key-value pairs where keys can be any datatype
-   remembers the original insertion order of the keys

### JavaScript Objects vs. Maps

|           | Object                            | Map                           |
| --------- | --------------------------------- | ----------------------------- |
| Iterable  | Not directly iterable             | Directly iterable             |
| Size      | Do not have a size property       | Have a size property          |
| Key Types | Keys must be Strings (or Symbols) | Keys can be any datatype      |
| Key Order | Keys are not well ordered         | Keys are ordered by insertion |
| Defaults  | Have default keys                 | Do not have default keys      |

## `target` and `currentTarget` Event Properties

|                                      | `target`                    | `currentTarget`                           |
| ------------------------------------ | --------------------------- | ----------------------------------------- |
| Definition: "Returns the element..." | that triggered the event.   | whose event listeners triggered the event |
| Value                                | The associated `EventTarget |
| Useful                               |                             | during capturing and bubbling             |

https://developer.mozilla.org/en-US/docs/Web/API/Event/target

`target` example 1:

```
<!DOCTYPE html>
<html>
<body onclick="myFunction(event)">

<p>Click on a paragraph. An alert box will alert the element that triggered the event.</p>

<p><strong>Note:</strong> The target property returns the element that triggered the event, and not necessarily the eventlistener's element.</p>

<script>
function myFunction(event) {
  alert(event.target.nodeName);
}
</script>

</body>
</html>
```

`target` example 2:

```
// Make a list
const ul = document.createElement('ul');
document.body.appendChild(ul);

const li1 = document.createElement('li');
const li2 = document.createElement('li');
ul.appendChild(li1);
ul.appendChild(li2);

function hide(evt) {
  // evt.target refers to the clicked <li> element
  // This is different than evt.currentTarget, which would refer to the parent <ul> in this context
  evt.target.style.visibility = 'hidden';
}

// Attach the listener to the list
// It will fire when each <li> is clicked
ul.addEventListener('click', hide, false);
```

## Iterating Over Arrays

### Summary of Looping Options

| JS                                                                                                                          | Type      | Definition                                                                                                                                                                                                                                                                                                                                                                                                                          | Use Cases                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)                       | Statement | <ul> <li>a loop that executes until test condition evaluates to false.</li> <li>The condition is evaluated after executing the statement, resulting in the specified statement executing at least once</li></ul>                                                                                                                                                                                                                    | <ul><li></li></ul>                                                                                                                                                                                     |
| [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)                           | Statement | <ul> <li>iterates over all "enumerable properties" of an object that are keyed by strings.</li> <li>The condition is evaluated after executing the statement, resulting in the specified statement executing at least once</li><li>iterates over the <i>entire</i> prototype chain (the objects it inherits)</li></ul>                                                                                                              | <ul><li>debugging to easily check the properties on an object (to console)</li><li>in cases where data is key-value pairs with properties as "keys" to check particular values of those keys</li></ul> |
| [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)                           | Statement | <ul> <li>Most often, I'll be using `for...in`, not `for...of`</li><li>iterates over all "iterable objects" including <ul><li>String</li><li>Array</li><li>array-like objects (e.g. arguments or NodeList)</li><li>TypedArray</li><li>Map</li><li>Set</li><li>user-defined variables</li></ul></li> <li>invokes custom iteration hook with statements to be executed for the value of each distinct property of the object</li></ul> |                                                                                                                                                                                                        |
| [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | Method    | <ul> <li>executes a provided function once for each array element. </li><li>does not mutate the array on which it is called. (However, `callbackFn` may do so) </li></ul>                                                                                                                                                                                                                                                           |                                                                                                                                                                                                        |
| [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)         | Method | <ul><li><strong>creates a new array</strong> populated with results of calling a provided function on every element in the calling array</li></ul>

### `for...of`

-   loops through values of an iterable object (Arrays, Strings, Maps, NodeLists, _and more!_)

for (let i = 0; i < myArray.length; i++) {
myArray[i] +
}

```
<!DOCTYPE html>
<html>
<body>

<h2>JavaScript For Of Loop</h2>
<p>The for of statement loops through the values of any iterable object:</p>

<p id="demo"></p>

<script>
const cars = ["BMW", "Volvo", "Mini"];

let text = "";
for (let x of cars) {
  text += x + "<br>";
}

document.getElementById("demo").innerHTML = text;
</script>

</body>
</html>
```

## `use strict`

??? Why isn't this in use all the time? Seems like an itermediate step to TypeScript

-   The "use strict" directive is only recognized at the beginning of a script or a function.
-   Defines that JavaScript code should be executed in "strict mode".
-   You can use strict mode in all your programs. It helps you to write cleaner code, like preventing you from using undeclared variables.
-   The "use strict" directive was new in ECMAScript version 5.
-   It is not a statement, but a literal expression, ignored by earlier versions of JavaScript.
-   The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
-   With strict mode, you can not, for example, use undeclared variables.
-   All modern browsers support "use strict" except Internet Explorer 9 and lower

```
<!DOCTYPE html>
<html>
<body>

<h2>With "use strict":</h2>
<h3>Using a variable without declaring it, is not allowed.</h3>

<p>Activate debugging in your browser (F12) to see the error report.</p>

<script>
"use strict";
x = 3.14;  // This will cause an error (x is not defined).

function myFunction() {
  y = 3.14;   // This will cause an error (y is not defined)
}
</script>

</body>
</html>
```

scope:

```
<!DOCTYPE html>
<html>
<body>

<p>"use strict" in a function will only cause errors in that function.</p>

<p>Activate debugging in your browser (F12) to see the error report.</p>

<script>
x = 3.14;    // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;  // This will cause an error (y is not defined).
}
</script>

</body>
</html>
```

### Not Allowed in Strict Mode

-   using a variable or object without declaring it
-   deleting not allowed
    -   variables (remember objects are variables, too)
    -   functions
-   duplicating a parameter

```
 "use strict";
function x(p1, p1) {};   // This will cause an error
```

-   octal numeric literals
    `let x = 010;`
-   octal escape characters
    `let x = "\010"`
-   some other stuff like reserved words and other things I don't use yet

### `this` keyword is strict mode

-   The `this` keyword in functions behaves differently in strict mode.
-   The `this` keyword refers to the object that called the function.
-   If the object is not specified, functions in strict mode will return `undefined` and functions in normal mode will return the global object (window):

```
"use strict";
function myFunction() {
  alert(this); // will alert "undefined"
}
myFunction();
```

# My React Notes

React Snippets .md
https://github.com/dsznajder/vscode-react-javascript-snippets/blob/master/docs/Snippets.md

-   when reading React code, organizing it mentally, look at the `export default` to see which function component is the parent

# LeetCode

## Filter/Reduce

https://leetcode.com/problems/sum-of-unique-elements/discuss/2100297/One-line-JavaScript-Solution-or-Filter-and-Reduce-methods

---

---

# JS Modules

# JS Async W3 Schools

## JS Callbacks

---

## JS Asynchronous

**Functions running in parallel with other functions are asynchronous**

---

## JS Promises

**A Promise is a JavaScript object that links producing code and consuming code.**

" I Promise a Result"

-   "producing code" is code that can take some time.
-   "consuming code" is code that must wait for the result.

---

## JS Async/Await

**`async` and `await` make promises easier to write**

-   `async` makes a function return a Promise
-   `await` makes a function wait for a Promise

---

# JS Classes W3 Schools

---

## JS Class Intro

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

-   Classes are a template for creating objects.
-   They encapsulate data with code to work on that data.
-   Classes in JS are built on prototypes but also have some syntax and semantics that are not shared with ES5 class-like semantics.

### JS Class Syntax

-   use keyword `class` to create a class

```
 class ClassName {
  constructor() { ... }
}
```

-   Always add a method named `constructor()`

```
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}
```

### Using a Class

use class to create new objects:

```
let myCar1 = new Car("Ford", 2014);
let myCar2 = new Car("Audi", 2019);
```

### The Constructor Method

The constructor method is a special method:

-   It has to have the exact name "constructor"
-   It is executed automatically when a new object is created
-   It is used to initialize object properties

If you do not define a constructor method, JavaScript will add an empty constructor method.

### Class Methods

-   class methods created with the same syntax as object methods.
-   Use the keyword `class` to create a class.
-   Always add a `constructor` method
-   Add as many methods as desired

Syntax:

```
class ClassName {
  constructor() { ... }
  method_1() { ... }
  method_2() { ... }
  method_3() { ... }
}
```

You can send parameters to Class methods. Example:

```
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age() {
    let date = new Date();
    return date.getFullYear() - this.year;
  }
}

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML =
"My car is " + myCar.age() + " years old.";
```

### "use strict"

-   syntax in classes must be written in "strict mode," otherwise you get an error.
    Example:

```
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age() {
    // date = new Date();  // This will not work
    let date = new Date(); // This will work
    return date.getFullYear() - this.year;
  }
}
```

## JavaScript Class inheritance

-   Use the `extends` keyword
-   a class created with a class inheritance inherits all the methods from another class
-   inheritance useful for code reusability: reuse properties and methods of an exissting class when you create a new class

Create a class named "Model" which will inherit the methods from the "Car" class:

-   `super()` method refers to the parent class
-   By calling `super()` method in the constructor method, the parent's constructor method is called, giving access to parent's properties and methods.

```
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = myCar.show();
```

### Getters and Setters

use `get` and `set` keywords.

### What is a getter?

Example:

```
const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    if (this.log.length === 0) {
      return undefined;
    }
    return this.log[this.log.length - 1];
  }
};

console.log(obj.latest);
// expected output: "c"
```

## [JavaScript Object Accessors (Getters and Setters)](https://www.w3schools.com/js/js_object_accessors.asp)

### JavaScript Getter (The `get` Keyword)

use a `lang` property to `get` the value of the `language` property:

```
// Create an object:
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "en",
  get lang() {
    return this.language;
  }
};

// Display data from the object using a getter:
document.getElementById("demo").innerHTML = person.lang;
// en
```

### JavaScript Setter (the `set` Keyword)

use a `lang` property to `set` the value of the `language` property:

```
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "",
  set lang(lang) {
    this.language = lang;
  }
};

// Set an object property using a setter:
person.lang = "en";

// Display data from the object:
document.getElementById("demo").innerHTML = person.language;
// en
```

### Why Using Getters and Setters?

-   It gives simpler syntax
-   It allows equal syntax for properties and methods
-   It can secure better data quality (allows you to use methods like `.toUpperCase()`)
-   It is useful for doing things behind-the-scenes

## JavaScript Object Constructors

**object constructor function:**

```
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}
```

-   name constructor functions with an uppercase letter
-   `this` doesn't have a value in a constructor function because it's a substitute for the new object. The value of `this` will become the value of the new object when a new object is created.

# ES6 FreeCodeCamp

## Arrow Functions

|                        | traditional function                                                                                                                                          | arrow function                                                                                                                                                     | one-line arrow function       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| original:              | const myFunc = function() { <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const myVar = "value"; <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return myVar; <br> }     | const myFunc = () `=>` { <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const myVar = "value"; <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return myVar; <br> }             | const myFunc = () => "value"; |
| showing strikethrough: | const myFunc = ~~function~~() { <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const myVar = "value"; <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return myVar; <br> } | const myFunc = () `=>` ~~{~~ <br> ~~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const myVar =~~ "value"; <br> ~~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return myVar; <br> }~~ | const myFunc = () => "value"; |

## Reduce

[explanation link](https://www.youtube.com/watch?v=g1C40tDP0Bk)

## Destructuring Assignment

given: <br>
`const user = { name: 'John Doe', age: 34 };`
| ES5 | ES6 | Destructuring Assignment to Assign Variables from Objects |
| --- | --- | --- |
|`const name = user.name;`<br>`const age = user.age;` | `const { name, age } = user;`<br><br>| `const { name: userName, age: userAge } = user;`<br>_Now, `user.name` and `user.age` have been assigned to variables named `userName` and `userAge_<br> |

## Destructure Values from Nested Objects.

replay

```
const user = {
  johnDoe: {
    age: 34,
    email: 'johnDoe@freeCodeCamp.com'
  }
};
```

Extract the values of object properties and assign them to variables with the same name:

`const { johnDoe: { age, email }} = user; `

Assign an object properties' values to variables with different names:

`const { johnDoe: { age: userAge, email: userEmail }} = user; `

## Use Destructuring Assignment to Assign Variables from Arrays

spread operator:

-   unpacks all contents of an array into a comma-separated list
-   you can't pick or choose which elemenst you want to assign variables

```
const [a, b] = [1, 2, 3, 4, 5, 6];
console.log(a, b);
// 1 2
```

## Use Destructuring Assignment with the Rest Parameter to Reassign Array Elements

replay

```
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b);
console.log(arr);

// 1 2
// [3, 4, 5, 6, 7]
```

## Use Destructuring Assignment to Pass an Object as a Function's Parameters

destructure object sent into the function:

```
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;

}
```

do the same in-place:

```
const profileUpdate = ({ name, age, nationality, location }) => {

}
```

## Create Strings using Template Literals

### Looping

Array indexes are just enumerable properties with integer names and are otherwise identical to general object properties.

| Option   | Description                                                                                                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| for...of | <ul><li>No guarantee that `for...in` will return indexes in any particular order</li><li>returns all enumerable properties, including those with non-integer names and those that are inherited.</li></ul> |

---

## Write Concise Object Literal Declarations Using Object Property Shorthand

---

| old                                                                                                                                      | new                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| const getMousePosition = (x, y) => ({ <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; x: x,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y: y<br>}); | const getMousePosition = (x, y) => ({ x, y });<br><br><br><br> |

---

## Write Concise Declarative Functions with ES6

---

_Remove the function keyword and colon altogether when defining functions in objects._ Another way of writing a method?
| old | new |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| const person = { <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name: "Taylor",<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sayHello: ~~function~~() {<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return `Hello! My name is ${this.name}.`;<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br> }; | const person = { <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name: "Taylor",<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sayHello() {<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return `Hello! My name is ${this.name}.`;<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br> }; |

---

## Use class Syntax to Define a Constructor Function

---

-   ES6 introduced JavaScript classes.
-   JS Classes are templates for JS Objects. Classes are **not** objects, they're templates.
-   `constructor` functions defined, and the `new` keyword instantiates objects:
-

### Syntax

```
class ClassName {
  constructor() { ... }
}
```

Create a class named "SpaceShuttle" with initial properties "name" and "targetPlanet".

```
var SpaceShuttle = function(model, targetPlanet){
  this.model = model;
  this.targetPlanet = targetPlanet;
}
```

### Using a Class to Create Objects

Older way to create object:

```
var zeus = new SpaceShuttle('Model 1', 'Jupiter');
```

The class syntax simply replaces the constructor function creation:

Class declaration:

```
class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}
const zeus = new SpaceShuttle('Jupiter');
```

-   `class` keyword declares a new function, constructor added to this function
-   constructor invoked when `new` is called to create a new object
-   UpperCamelCase should be used for ES6 class names, e.g. `SpaceShuttle`

### The Constructor Method

The constructor method is a special method:

-   It has to have the exact name "constructor"
-   It is executed automatically when a new object is created
-   It is used to initialize object properties

If you do not define a constructor method, JavaScript will add an empty constructor method.

### Class Methods

-   create with same syntax as object methods.
-   `class` keyword used to create a class
-   always add a `constructor()` method.

#### Syntax

```
class ClassName {
  constructor() { ... }
  method_1() { ... }
  method_2() { ... }
  method_3() { ... }
}
```

#### Example

```
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age() {
    let date = new Date();
    return date.getFullYear() - this.year;
  }
}

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML =
"My car is " + myCar.age() + " years old.";
```

Send parameters to Class methods:

```
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age(x) {
    return x - this.year;
  }
}

let date = new Date();
let year = date.getFullYear();

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML=
"My car is " + myCar.age(year) + " years old.";
```

---

## Use getters and setters to Control Access to an Object

---

_obtain (**get**) values from an object and **set** the value of a property within an object._

-   don't look like functions
-   they hide internal implementation details.
-   It's convention to precede name of private variable with an underscore. However, an underscore alone doesn't make a variable private

    getter functions return (get) the value of an object's private variable to the user without the user directly accessing the private variable.

setter functions modify (set) the value of an object's private variable based on the value passed into the setter function. Could be calculations or overwriting the previous value.

### [Prototype methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#prototype_methods)

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

---

# Object-Oriented Programming

---

## Create a Basic JavaScript Object

---

```
let duck = {
  name: "Daffy",
  numLegs: 2
};
```

---

## Use Dot Notation to Access the Properties of an Object

---

```
let duck = {
  name: "Daffy",
  numLegs: 2
};
console.log(duck.name);
```

---

## Create a Method on an Object

---

Method =

-   a special property of an object.
-   Methods are properties that are functions. This adds different behavior to an object.

```
let duck = {
  name: "Aflac",
  numLegs: 2,
  sayName: function() {return "The name of this duck is " + duck.name + ".";}
};
duck.sayName();

```

---

## Make Code More Reusable with the this Keyword

---

_If the variable name changes, any code referencing the original name would need to be updated as well. In a short object definition, it isn't a problem, but if an object has many references to its properties there is a greater chance for error._

```
let dog = {
  name: "Spot",
  numLegs: 4,
  sayLegs: function() {return "This dog has " + this.numLegs + " legs.";}
};

dog.sayLegs();
```

---

## Define a Constructor Function

---

Constructors = functions that create new objects.

```
function Bird() {
  this.name = "Albert";
  this.color = "blue";
  this.numLegs = 2;
}

```

---

## Use a Constructor to Create Objects

---

```
function Bird() {
  this.name = "Albert";
  this.color  = "blue";
  this.numLegs = 2;
}

let blueBird = new Bird();

```

-   `this` inside the constructor always refers to the object being created.
-   the `new` operator is used when calling a constructor.
-   in code above, JS creates new instance of `Bird` called `blueBird` with the given properties in the `Bird` constructor:

    ```
    blueBird.name;
    blueBird.color;
    blueBird.numLegs;
    ```

-   properties can be accessed and modified:

    ```
    blueBird.name = 'Elvira';
    blueBird.name;
    ```

---

## Extend Constructors to Receive Arguments

---

All constructors created in fashion used above will assign those properties. This is not useful.
Constructor can accept parameters:

```
function Bird(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}
```

design constructor to accept parameters:

```
function Bird(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}
```

```
let cardinal = new Bird("Bruce", "red");
```

---

## Verify an Object's Constructor with instanceof

---

instance = any time a constructor function creates a new object

`instanceof` allows you to compare an object to a constructor, returning true or false based on whether or not that object was created with the constructor:

```
let Bird = function(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}

let crow = new Bird("Parker", "black");

crow instanceof Bird; // true
```

---

## Understand Own Properties

---

`name` and `numLegs` are called _own properties_ because they are defined directly on the instance object.

```
function Bird(name) {
  this.name = name;
  this.numLegs = 2;
}

let duck = new Bird("Donald");
let canary = new Bird("Tweety");

```

`duck` and `canary` will automatically have 2 legs.

---

## Use Prototype Properties to Reduce Duplicate Code

---

If you have a duplicated variable for `numLegs` across each instance of `Bird`, that could be millions of unnecessary lines of code. Therefore, `prototype` properties are shared among ALL object instances.

```
Bird.prototype.numLegs = 2;
```

---

## Iterate Over All Properties

---

_MDN says to use `hasOwn()` instead of `hasOwnProperty()`_

```
function Bird(name) {
  this.name = name;  //own property
}

Bird.prototype.numLegs = 2; // prototype property

let duck = new Bird("Donald");
```

```
let ownProps = [];
let prototypeProps = [];

for (let property in duck) {
  if(duck.hasOwnProperty(property)) {
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

console.log(ownProps); // ['name]
console.log(prototypeProps); ['numLegs']
```

```
function Dog(name) {
  this.name = name;
}

Dog.prototype.numLegs = 4;

let beagle = new Dog("Snoopy");

let ownProps = [];
let prototypeProps = [];

// Only change code below this line
for (let prop in beagle) {
  if(Object.hasOwn(beagle, prop)) {
    ownProps.push(prop);
    console.log(ownProps)
  } else {
    prototypeProps.push(prop);
  }
}
```

---

## Understand the Constructor Property

---

```
let duck = new Bird();
let beagle = new Dog();

console.log(duck.constructor === Bird); // true
console.log(beagle.constructor === Dog); // true
```

`constructor` property can check the kind of object. BUT, better to use `instanceof` method because `constructor` can be overwritten.

```
function joinBirdFraternity(candidate) {
  if (candidate.constructor === Bird) {
    return true;
  } else {
    return false;
  }
}
```

---

## Change the Prototype to a New Object

---

| verbose                                                                                                                                                                                                                         | simple                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bird.prototype.eat = function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("nom nom nom");<br>}<br><br>Bird.prototype.describe = function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("My name is " + this.name);<br>} | Bird.prototype = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numLegs: 2,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eat: function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("nom nom nom");<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describe: function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("My name is " + this.name);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}; |

---

## Remember to Set the Constructor Property when Changing the Prototype

---

Manually setting the prototype to a new object erases the `constructor` property.

```
duck.constructor === Bird; // false
duck.constructor === Object; // true
duck instanceof Bird; // true
```

Whenever a prototype is manually set to a new object, define the `constructor` property:

```
Bird.prototype = {
  constructor: Bird,
  numLegs: 2,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```

```
function Dog(name) {
  this.name = name;
}

Dog.prototype = {
  constructor: Dog,
  numLegs: 4,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
  console.log(Dog.prototype)
```

console logs:

```
{ construtor: [Function: Dog],
  numLegs: 4,
  eat: [Function: eat],
  describe: [Function: describe] }
```

Without the `constructor` definition:

```
{ numLegs: 4,
  eat: [Function: eat],
  describe: [Function: describe] }
```

---

## Understand Where an Object’s Prototype Comes From

---

```
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Donald");

Bird.prototype.isPrototypeOf(duck); // true
```

---

## Understand the Prototype Chain

---

-   Almost all objects in JS have a `prototype`.
-   An object's `prototype` itself is an object.

```
function Bird(name) {
  this.name = name;
}

typeof Bird.prototype;

Object.prototype.isPrototypeOf(Bird.prototype);
```

---

## Use Inheritance So You Don't Repeat Yourself

---

_Not DRY:_

```
Bird.prototype = {
  constructor: Bird,
  describe: function() {
    console.log("My name is " + this.name);
  }
};

Dog.prototype = {
  constructor: Dog,
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```

_DRY with supertype (or parent) `Animal`:_

```
function Animal() { };

Animal.prototype = {
  constructor: Animal,
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```

Thus `Bird` and `Dog` become:

```
Bird.prototype = {
  constructor: Bird
};

Dog.prototype = {
  constructor: Dog
};
```

---

## Inherit Behaviors from a Supertype

---

Create `supertype` called `Animal`:

```
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
```

Then when creating an instance, the following syntax has disadvantages and is _undesirable_ for inheritance:

```
let animal = new Animal();
```

Instead, use:

```
let animal = Object.create(Animal.prototype)
```

This sets the `prototype` of `animal` to be the `prototype` of `Animal`.

```
animal.eat();
animal instanceof Animal; // true
```

---

## Set the Child's Prototype to an Instance of the Parent

---

`prototype` = "recipe" for creating an object.

`Bird.prototype = Object.create(Animal.prototype);`

Now, `Bird` includes all the key "ingredients" from `Animal`

---

## Reset an Inherited Constructor Property

---

So far, there's the `Animal` supertype, and the `Bird` instance. If a new instance is created using the `Bird` constructor...

```
// Animal supertype

function Animal() {}
Animal.prototype = {
	constructor: Animal,
	eat: function () {
		console.log("nom nom nom");
	},
};

// Bird object based on Animal supertype

function Bird() {}
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor;

console.log(duck.constructor) // [Function: Animal]
```

Since we want `duck` and all other instances of `Bird` toshow they were constructed by `Bird`(not animal), you can manually set constructor property of `Bird` to the `Bird` object:

```
Bird.prototype.constructor = Bird;
duck.constructor
```

## Add Methods After Inheritance

---

E.g.
A `Bird` constructor inherits its `prototype` from `Animal`

```
// supertype

function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};

// Bird constructor

function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;
```

This code below will add a function to `Bird`'s `prototype`:

```
Bird.prototype.fly = function() {
  console.log("I'm flying!");
};
```

---

## Override Inherited Methods

---

Overriding done same way as adding new methods.

_Review:_

An object can inherit its behavior (methods) from another object by referencing its prototype object:

```
ChildObject.prototype = Object.create(ParentObject.prototype);
```

Then the `ChildObject` received its own methods by chaining them onto its prototype:

```
ChildObject.prototype.methodName = function() {...};
```

E.g. to override:

```
function Animal() { }
Animal.prototype.eat = function() {
  return "nom nom nom";
};

function Bird() { }

Bird.prototype = Object.create(Animal.prototype);

Bird.prototype.eat = function() {
  return "peck peck peck";
};
```

---

## Use a Mixin to Add Common Behavior Between Unrelated Objects

---

-   A mixin allows other objects to use a collection of functions.
-   Mixins work for unrelated objects (e.g. flying objects `Bird` and `Plane`)

```
let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};
```

```
let bird = {
  name: "Donald",
  numLegs: 2
};

let plane = {
  model: "777",
  numPassengers: 524
};

flyMixin(bird);
flyMixin(plane);
```

`bird` and `plane` are passed into `flyMixin`, which then assigns the `fly` function to each object. Now `bird` and `plane` can both fly:

```
bird.fly();
plane.fly();
```

---

## Use Closure to Protect Properties Within an Object from Being Modified Externally

---

**closure = a function always has access to the context in which it was created**

In exercise above, `Bird` had public property `name` because it can be accessed and changed outside of `bird`'s definition. E.g.:

```
bird.name = "Silly";
```

This can cause problems because any part of code can change `bird`'s value.

### How to make public property private?

-   create a variable within the constructor function
-   This changes the variable's scope to be within constructor function and not globally. Therefore, variable can only be accessed and changed by methods also within the constructor function.

-   Below, `hatchedEgg` declared in same context as `HatchedEggCount`.
-   `getHatchedEggCount` is a privileged method because it has access to private variable `hatchedEgg`.

```
function Bird() {
  let hatchedEgg = 10;

  this.getHatchedEggCount = function() {
    return hatchedEgg;
  };
}
let ducky = new Bird();
ducky.getHatchedEggCount();
```

Another example demonstrating this and arrow functions:

ES5 way:

```
function Bird() {
  let weight = 15;

  this.getWeight = function() {
    return weight;
  };
}
```

ES6 way:

```
this.getWeight = () => {
return weight;
};
}

```

---

## Understand the Immediately Invoked Function Expression (IIFE)

---

-   Common in JS to execute a function as soon as it's declared. This anonymous function expression executes right away:
-   The parentheses at the end of the [function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) cause it to be immediately executed or invoked.

```
(function () {
  console.log("Chirp, chirp!");
})();

```

---

## Use an IIFE to Create a Module

---

An immediately invoked function expression (IIFE) is often used to group related functionality into a single object or module. For example, an earlier challenge defined two mixins:

```
function glideMixin(obj) {
  obj.glide = function() {
    console.log("Gliding on the water");
  };
}
function flyMixin(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  };
}
```

We can group these mixins into a module as follows:

```
let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})();
```

The advantage of the module pattern is that all of the motion behaviors can be packaged into a single object that can then be used by other parts of your code. E.g.:

```
motionModule.glideMixin(duck);
duck.glide();
```

# My React Notes

## Create React App

https://reactjs.org/docs/create-a-new-react-app.html

```
npx create-react-app my-app
cd my-app
npm start
```

## React Hook Summary Table

| Hook         | Syntax                                                                               | Purpose                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useState`   | `const [current state, function that updates that state] = useState(initial state);` | track state in a function component                                                                                                                               |
| `useEffect`  | `useEffect(<function> <dependency>)`                                                 | perform side effects in components (fetch data, timer, directly update DOM, etc.)                                                                                 |
| `useContext` |                                                                                      | <ul><li>manage state globally</li><li>use with `useState` Hook to more easily share state between deeply nested components</li>                                   |
| `useRef`     | E.g. `const count = useRef(0);`                                                      | <ul><li>persist values between renders.</li><li>store a mutable value that doesn't cause a re-render when updated</li><li>access a DOM element directly</li></ul> |

---

# React FreeCodeCamp

---

---

## Create a Simple JSX Element

---

---

## Create a Complex JSX Element

---

nested JSX must return a single element

---

## Add Comments in JSX

---

`{/* */}` to wrap around the comment text.

---

## Render HTML Elements to the DOM

---

explanation:

`ReactDOM.render(componentToRender, targetNode)`

```

const JSX = (

  <div>
    <h1>Hello World</h1>
    <p>Lets render this to the DOM</p>
  </div>
);

ReactDOM.render(JSX, document.getElementById("challenge-node"))

```

---

## Define an HTML Class in JSX

---

-   HTML `class` is reserved word in JS. Use `className` with JSX.
-   use camelCase e.g. `onClick` or `onChange`.

---

## Learn About Self-Closing JSX Tags

---

Any JSX element can have a self-closing tag.

## Create a Stateless Functional Component

---

_Everything in React is a component_
React components created with JS function = a _stateless functional component._
stateless component = one that can receive data and render it, but does not manage or track changes to that data.

```

const DemoComponent = function() {
return (

<div className='customClass' />
);
};

```

---

## Create a React Component

---

Two ways to create React component:

1. JS function
2. ES6 class syntax

-   by extending `React.Component` class, `Kitten` class has access to React features (local state, lifecycle hooks, etc.).
-   best practice to call a component's `constructor` with `super` and pass `props` to both. The `super` keyword is used to access and call functions on an object's parent, e.g.:

```
super([arguments]); // calls the parent constructor.
super.functionOnParent([arguments]);
```

```
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

---

## Create a Component with Composition

---

`App` _parent_ component renders other components as _children_. E.g.

```

return (
<App>
<Navbar />
<Dashboard />

  <Footer />
 </App>
)
```

---

## Use React to Render Nested Components

---

Even within the same file, you can use `< />` to nest components within each other.

---

## Compose React Components

---

You can render JSX elements, stateless functional components, and ES6 class components within other components.

---

## Render a Class Component to the DOM

---

| JSX elements                                                                                  | React components                                                                                           |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| pass in the name of the element to render<br>`ReactDom.render(componentToRender, targetNode)` | use same syntax as if rendering a nested component<br>`ReactDom.render(<ComponentToRender />, targetNode)` |

```
class FirstComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // The JSX code you put here is what your component will render
    );
  }
};
```

I had trouble catching capitalization errors for this challenge:

```
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
        <Fruits />
        <Vegetables />
        {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById("challenge-node"))
```

---

## Write a React Component from Scratch

---

A typical React component = ES6 class which extends `React.Component`.

Challenge Code:

```
class MyComponent extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>My First React Component!</h1>
      </div>
    );
  };
}
ReactDOM.render(<MyComponent />, document.getElementById("challenge-node"))
```

---

## Pass Props to a Stateless Functional Component

_DO AGAIN_ ???

---

You can pass props (properties) to child components. E.g. `App` component renders sfc `Welcome`. Then you can pass `Welcome` a `user` prop:

```
<App>
  <Welcome user='Mark' />
</App>
```

`user` is passed to `Welcome` component as a **custom HTML attribute**.

Since `Welcome` is a sfc (stateless functional component), it has access to this value:

```
const Welcome = (props) => <h1>Hello, {props.user}!</h1>
```

-   standard to call this value `props`
-   `props` considered as an argument to a function which returns JSX.
-   You can access the value of the argument in the function body.
-   with class components, it works differently

challenge code:

```
const CurrentDate = (props) => {
  return (
    <div>
      { /* Change code below this line */ }
      <p>The current date is: </p>{props.date}
      { /* Change code above this line */ }
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        { /* Change code below this line */ }
        <CurrentDate date={Date()} />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

---

## Pass an Array as Props

---

-   To pass an array to a JSX element, it must be treated as JS and wrapped in curly braces.

Example below gives `ChildComponent` access to the array property `colors`:

```
<ParentComponent>
  <ChildComponent colors={["green", "blue", "red]} />
</ParentComponent>
```

You can use array methods when accessing the property, e.g.:

```
const ChildComponent = (props) => <p>{props.colors.join(', )}</p>
// <p>green, blue, red</p>
```

Challenge Code:

```
const List = (props) => {
  return <p>{props.tasks.join(", ")}</p>
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        { /* Change code below this line */ }
        <List tasks={["A","B","C"]}/>
        <h2>Tomorrow</h2>
        <List tasks={["D","E","F"]}/>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

---

## 16 Use Default Props

---

You can assign default props to a component. React assigns default prop if necessary, if no value explicitly provided.

```
MyComponent.defaultProps = { location: 'San Francisco' }
```

Challenge code:

```
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};
// Change code below this line
ShoppingCart.defaultProps = { items: 0 };
```

---

## 17 Override Default Props

---

Override by explicitly setting prop values for a component.

---

## 18 Use PropTypes to Define the Props You Expect

---

Note: As of React v15.5.0, `PropTypes` is imported independently from React, like this: `import PropTypes from 'prop-types';`

E.g.:
_My app makes an API call to retrive data that I expect as an array, which is then passed ot a component as a prop. By setting `propTypes` on the component and requiring it to be type `array`, it will give warning if it's another type._

Best practice to set `propTypes` when type is known in advance.

Example:

```
MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }
```

-   `PropTypes.func` checks that `handleClick` is a function
-   `isRequired` tells React that `handleClick` is a required property for that component.

It seems that `isRequired` is... required?

Challenge Code:

```
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

// Change code below this line
Items.propTypes = { quantity: PropTypes.number.isRequired}
// Change code above this line

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};
```

---

## Access Props Using this.props

---

_What if the child component being passed is an ES6 class component rather than a sfc?_

-   `this` keyword used when you refer to a class component within itself.
-   e.g. if an ES6 class component has a prop called `data`, write `{this.props.data}` in JSX

solved challenge:

```
class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            { /* Change code below this line */ }
            <Welcome name="Charlie" />
            { /* Change code above this line */ }
        </div>
    );
  }
};

class Welcome extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          { /* Change code below this line */ }
          <p>Hello, <strong>{this.props.name}</strong>!</p>
          { /* Change code above this line */ }
        </div>
    );
  }
};
```

---

## Review Using Props with Stateless Functional Components

---

| component type                 | definition                                                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| stateless functional component | any function which accepts props and returns JSX                                                                              |
| stateless component            | a class that extends `React.Component`, but does not use internal state                                                       |
| stateful component             | a class component that does maintain its own internal state<br>Sometimes referred to simply as components or React components |

Common practice is to minimize statefulness by creating stateless functional components wherever possible. This makes development and maintanence easier.

Challenge Code:

-   WATCH CAPITALIZATION OF `PropTypes` and `propTypes`!
-   `const Camper = props => <p>{props.name}</p>;` is more succinct than what I wrote below

```
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// Change code below this line
const Camper = (props) => {
    return (
      <p>{props.name}</p>
    );
};
Camper.defaultProps = { name: 'CamperBot' }
Camper.propTypes = { name: PropTypes.string.isRequired}
```

---

## Create a Stateful Component

---

**State** = any data your app needs to know about that can change over time.

-   Must create a class component by extending `React.Component` in order to create `state`.
-   create state in React by declaring a `state` property on the component class in its `constructor`. This initializes the component with `state` when its created.

-   the `state` property must be set to a JS `object`:

```
this.state = {

}
```

-   You have access to the `state` object throughout the life of your component.
    -   update it
    -   render it in your UI
    -   pass it child components

Challenge Code:

```
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    // Only change code below this line
    this.state = {
      name: "Bill"
    }
    // Only change code above this line
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

---

## Render State in the User Interface

---

-   Once component's initial state is defined, you can display any part of it in the UI that is rendered
-   if a component is stateful, it will always have access to the data in `state` in its `render()` method.
-   access the data with `this.state`

-   React uses virtual DOM to track changes behind the scenes.

-   If you make a component stateful, no others are aware of its `state`. It's local to that component, unless state data passed to child component as `props`.

-   In JSX, any code with `{ }` will be treated as JavaScript. To access the value from `state`, just enclose the reference in curly braces.

---

Challenge Code:

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{this.state.name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
// console.log(state.name)
```

---

## Render State in the User Interface Another Way

---

Access `state` by writing JS:

-   declare functions
-   access data from `state` or `props`
-   perform computations
-   etc.

Challenge Code:

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    // Change code below this line
    const name = this.state.name
    // Change code above this line
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

---

## Set State with this.setState

---

Change component's `state` with `setState:

```
this.setState({
  username: 'Lewis'
});
```

key = state properties, value = updated state data

-   never modify `state` directly, always use `this.setState()`
-   state updates through `setState` method can be [asynchronous](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous).

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // Change code below this line
    this.setState({
      name: "React Rocks!"
    });
    // Change code above this line
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

---

## Bind 'this' to a Class Method

---

-   A class method typically needs to use the `this` keyword so it can access properties on the class (e.g. `state` and `props`) inside the scope of the method.

One way to allow class methods to access `this`:
explicitly bind `this` in the constructor so `this` becomes bound to the class methods. From prior challenge:

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
```

### [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) Explanation:

The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

Challenge Code:

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello"
    };
    // Change code below this line
    this.handleClick = this.handleClick.bind(this);
    // Change code above this line
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }
        <button onClick={this.handleClick}>Click Me</button>
        { /* Change code above this line */ }
        <h1>{this.state.text}</h1>
      </div>
    );
  }
};
```

---

## Use State to Toggle an Element... with `useState`!

_DO AGAIN_ ???

**Updating React state**

-   State updates in React may be asynchronous: React may batch multiple `setState()` calls into a single update.
-   You can't rely on `this.state` or `this.props` when calculating the next value.

_do not do this! BAD BAD BAD_

```
this.setState({
  counter: this.state.counter + this.props.increment
});
```

What if you need to know previous state when updating state?

-   pass `setState` a function to allow you to access state and props.

_GOOD GOOD GOOD_

```
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

without `props` if only `state` is needed. Object literal wrapped in `()` so JS doesn't think it's a block of code.

```
this.setState(state => ({
  counter: state.counter + 1
}));
```

Challenge Code:

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    // Change code below this line
    this.toggleVisibility = this.toggleVisibility.bind(this)
    // Change code above this line
  }
  // Change code below this line
toggleVisibility() {
  this.setState(state => ({
    visibility: !state.visibility
  }));
    console.log(this.state)
  }
  // Change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}
```

**Troubleshooting:**

You can't rely on previous value of `this.state` or `this.props` when calculating the next value because React state updates may be asynchronous.

incorrect attempt:

```
  toggleVisibility() {
    this.setState({
      !visibility
    })
```

---

## Write a Simple Counter

_DO AGAIN_ ???

Challenge Code:

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    // Change code below this line
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
    // Change code above this line
  }
  // Change code below this line
  increment() {
    this.setState(state => ({
      count: state.count + 1
    }));
      console.log(this.state)
  }
  decrement() {
        this.setState(state => ({
      count: state.count - 1
    }));
      console.log(this.state)
  };
  reset() {
    this.setState(state => ({
      count: 0
  }));
  // ??? why does this line below console.log `[object Object]`?
    console.log(`${this.state}`)
  };
  // Change code above this line
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```

---

## Create a Controlled Input

---

E.g., form elements like `input` and `textarea` maintain their own state in the DOM as the user types.

-   This state can be moved into a React component's `state`.
-   Typically, React components with input fields will be controlled input forms.

challenge code:

```
class ControlledInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
		};
		// Change code below this line
		this.handleChange = this.handleChange.bind(this);

		// Change code above this line
	}
	// Change code below this line
	handleChange(event) {
		this.setState({
			input: event.target.value,
		});
	}
	// Change code above this line
	render() {
		return (
			<div>
				{/* Change code below this line */}
				<input value={this.state.input} onChange={this.handleChange} />

				{/* Change code above this line */}
				<h4>Controlled Input:</h4>
				<p>{this.state.input}</p>
			</div>
		);
	}
}

export default ControlledInput;
```

---

## Create a Controlled Form

??? _DO AGAIN_

challenge code:

```
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
      console.log(`handleChange: ${event.target.value}`);
  }
  handleSubmit(event) {
    // Change code below this line
    event.preventDefault()
    this.setState({
      submit: this.state.input,
      // input: ''
    })
      console.log(`handleSubmit: ${this.state.submit}`);
    // Change code above this line
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* Change code below this line */}
        <input value={this.state.input} onChange={this.handleChange} />
          {/* Change code above this line */}
          <button type='submit'>Submit!</button>
        </form>
        {/* Change code below this line */}
        <h1>{this.state.submit}</h1>
        {/* Change code above this line */}
      </div>
    );
  }
}
```

---

## Pass State as Props to Child Components

---

common pattern:

-   a stateful component which contains the `state` important to the app that renders child components.
-   components have access to some pieces of that `state`, which are passed in as props.
-   E.g.: Navbar has access to user's username to display it there. This piece of `state` is passed to `Navbar` as a prop.

1. unidirectional data flow

-   state flows in one direction down application component tree, from stateful parent component to child components.
-   child components only receive the state data they need

2. complex stateful apps have just a few, or maybe just one stateful component.
    - the rest of the components receive state from parent as props and render a UI from that state
    - _State logic and UI logic are separate._ State management is handled in one part of code and UI rendering in another

challenge code:

```
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  console.log(`MyApp Constructor: ${this.state.name}`);
  }
  render() {
  console.log(`MyApp render(): ${this.state.name}`);
    return (
       <div>
         {/* Change code below this line */}
         <Navbar name={this.state.name}/>
         {/* Change code above this line */}
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
      console.log(`Navbar constructor: ${props.name}`)
  }
  render() {
      console.log(`Navbar render() using \`this\` kw: ${this.props.name}`)
    return (
    <div>
      {/* Change code below this line */}
      <h1>Hello, my name is: {this.props.name}</h1>
      {/* Change code above this line */}
    </div>
    );
  }
};
```

---

## Pass a Callback as Props

???

instuctions:

1. Add the `GetInput` component to the render method in `MyApp`,
2. then pass it a prop called `input` assigned to `inputValue` from `MyApp`'s state.
3. Also create a prop called `handleChange` and pass the input handler `handleChange` to it.
4. Next, add `RenderInput` to the render method in `MyApp`,
5. then create a prop called `input` and pass the `inputValue` from state to it.

challenge code:

```

```

---

## Use the Lifecycle Method componentWillMount

---

challenge code:

```

```

---

## Use the Lifecycle Method componentDidMount

---

challenge code:

```

```

---

## Add Event Listeners

---

challenge code:

```

```

---

## Optimize Re-Renders with shouldComponentUpdate

---

challenge code:

```

```

---

## Introducing Inline Styles

---

challenge code:

```

```

---

## Add Inline Styles in React

---

challenge code:

```

```

---

## Use Advanced JavaScript in React Render Method

---

challenge code:

```

```

---

## Render with an If-Else Condition

---

challenge code:

```

```

---

## Use && for a More Concise Conditional

---

challenge code:

```

```

---

## Use a Ternary Expression for Conditional Rendering

---

challenge code:

```

```

---

## Render Conditionally from Props

---

challenge code:

```

```

---

## Change Inline CSS Conditionally Based on Component State

---

challenge code:

```

```

---

## Use Array.map() to Dynamically Render Elements

---

challenge code:

```

```

---

## Give Sibling Elements a Unique Key Attribute

---

challenge code:

```

```

---

## Use Array.filter() to Dynamically Filter an Array

---

challenge code:

```

```

---

## Render React on the Server with renderToString

---

challenge code:

```

```

---

# React W3 Schools

---

---

## Destructuring Arrays

---

old way

```
const vehicles = ['mustang', 'f-150', 'expedition'];

const car = vehicles[0];
const truck = vehicles[1];
const suv = vehicles[2];
```

new way

```
const vehicles = ['mustang', 'f-150', 'expedition'];

const [car, truck, suv] = vehicles;

// leaving out the truck:

const [car,, suv] = vehicles;
```

When a function returns an array:

```
function calculate(a, b) {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  return [add, subtract, multiply, divide];
}

const [add, subtract, multiply, divide] = calculate(4, 7);
```

## Destructuring Objects

old way:

```
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021,
  color: 'red'
}

myVehicle(vehicleOne);

// old way
function myVehicle(vehicle) {
  const message = 'My ' + vehicle.type + ' is a ' + vehicle.color + ' ' + vehicle.brand + ' ' + vehicle.model + '.';
}
```

new way:

```
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021,
  color: 'red'
}

myVehicle(vehicleOne);

function myVehicle({type, color, brand, model}) {
  const message = 'My ' + type + ' is a ' + color + ' ' + brand + ' ' + model + '.';
}
```

nested objects:

```
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021,
  color: 'red',
  registration: {
    city: 'Houston',
    state: 'Texas',
    country: 'USA'
  }
}

myVehicle(vehicleOne)

function myVehicle({ model, registration: { state } }) {
  const message = 'My ' + model + ' is registered in ' + state + '.';
  return message
}
```

---

## Spread Operator

---

```
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
```

With destructuring. Assign the first and second items from numbers to variables and put the rest in an array:

```
const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;
```

Combine objects

```
const myVehicle = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const updateMyVehicle = {
  type: 'car',
  year: 2021,
  color: 'yellow'
}

const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
```

---

## Module Import/Export

---

-   modules break up your code into separate files, making it easier to maintain code base.
-   ES Modules use `import` and `export` statements
-   2 types of exports: Named and Default
    -Any file can export a function or variable.

### Export

-   you can export a function or variable from any file

#### Named Export

Two options for named exports

1. in-line individually
2. all at once at bottom

In-line individually:

`person.js`

```
export const name = "Jesse"
export const age = 40
```

All at once at the bottom:

`person.js`

```
const name = "Jesse"
const age = 40

export { name, age }
```

#### Default Exports

-   only one default export in a file

`message.js`

```
const message = () => {
  const name = "Jesse";
  const age = 40;
  return name + ' is ' + age + 'years old.';
};

export default message;
```

### Import

-   You can import in 2 different ways depending if they are named exports or default exports
-   Named exports must be destructured using curly braces. Default exports do not.

#### Import from named exports

`person.js`

```
import { name, age } from "./person.js";
```

#### Import from default exports

`message.js`

```
import message from "./message.js";
```

## Ternary Operator

simplified conditional operator like `if` / `else`

```
condition ? <expression if true> : <expression if false>
```

if/else:

```
if (authenticated) {
  renderApp();
  } else {
    renderLogin();
  }
};
```

ternary operator:

```
authenticated ? renderApp() : renderLogin();
```

## React Render HTML

-   React renders HTML by using function `ReactDOM.render()`.
-   Purpose is to display specified HTML code inside the specified HTML element.
-   2 arguments: HTML code, and an HTML element

E.g., display a paragraph inside an element with the id of `root` (standard convention):

```
ReactDOM.render(<p>Hello</p>, document.getElementById('root'));
```

The result is displayed in the `<div id="root">` element:

```
<body>
  <div id="root"></div>
</body>
```

## React JSX

JSX = Javascript XML
JSX converts HTML tags into react elements
JSX isn't required, but makes React _much_ easier

### Coding JSX

-   JSX allows us to write HTML elements in js and place them in DOM without any `createElement()`and/or `appendChild()` methods.

| JSX                                       | _Without_ JSX                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| `const myElement = <h1>I Love JSX!</h1>;` | `const myElement = React.createElement('h1', {}, 'I do not use JSX!');` |

then both would have:

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
```

### Expressions in JSX

JSX expressions go inside curly braces `{ }`.

-   React variable
-   property
-   any other valid JS expression.

```
const myElement = <h1>React is {5 + 5} times better with JSX</h1>;
```

To write HTML on multiple lines, HTML goes inside parentheses:

```
import React from 'react';
import ReactDOM from 'react-dom/client';

const myElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
```

### One Top-Level Element

HTML code must be wrapped in _one_ top-level element

Parent element such as `<div>`

```
const myElement = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </div>
);
```

fragment:

```
const myElement = (
  <>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </>
);
```

### Elements Must Be Closed

`<myElement />`

### Attribute class = className

can't use reserved JS keyword `class` when writing JSX. Use `className`.

```
const myElement = <h1 className="myclass">Hello World</h1>;
```

### Conditions - if statements

`if` statements can't be _inside_ JSX in React

-   put them outside the JSX
-   use ternary expression

outside:

```
const x = 5;
let text = "Goodbye";
if (x < 10) {
  text = "Hello";
}

const myElement = <h1>{text}</h1>;
```

ternary expression:

```
const x = 5;

const myElement = <h1>{(x) < 10 ? "Hello" : "Goodbye"}</h1>;
```

## React Components

components =

-   _MUST_ start with an uppercase letter
-   functions that return HTML elements
-   independent and reusable bits of code
-   serve same purpose as JS functions, but work in isolation and return HTML
-   2 kinds of components

    -   Class components (old method)
    -   Function components (use with Hooks)

### Class Component

-   must include `extends React.Component` statement.
    -   creates an inheritance to `React.Component`
    -   gives component access to `React.Component`'s functions
-   Requires a `render()` method to return HTML

```
class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
```

### Function Component (preferable!)

written with less code, easier to understand.

```
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}
```

### Rendering a Component

Display `Car` component in "root" element

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

### Props

Components can be passed `props` (properties).

```
import React from 'react';
import ReactDOM from 'react-dom/client';

function Car(props) {
  return <h2>I am a {props.color} Car!</h2>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car color="red"/>);
```

### Components in Components

```
import React from 'react';
import ReactDOM from 'react-dom/client';

function Car() {
  return <h2>I am a Car!</h2>;
}

function Garage() {
  return (
    <>
	    <h1>Who lives in my Garage?</h1>
	    <Car />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

### Components in Files

React is about re-using code, so split components into separate files.

So, create `Car.js` and include `export` statement

```
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}

export default Car;
```

And import it into the App:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import Car from './Car.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

## React Class Components

### React Components

Class components only way to track state and lifecycle on a React component before React 16.8. Because function components were considered "state-less."

With Hooks, Function components are now nearly equivalent so you probably never need a Class component in React.

I could just skip this and focus on Function Components

#### Create a Class Component

requirements:

-   must start with an uppercase letter
-   include `extends React.Component` statement
-   `render()` method to return HTML

#### Component Constructor

`constructor()` function in component:

-   will be called when component gets initiated
-   where you initiate component's properties
-   component properties should be kept in an object called `state`.
-   honor inheritance of parent component by including `super()` statement.
    -   executes parent component's constructor function
    -   gives access to all functions of the `React.Componenent` parent component

```
class Car extends React.Component {
  constructor() {
    super();
    this.state = {color: "red};
  }
  render() {
    return <h2>I am a {this.state.color} car!</h2>;
  }
}
```

#### Props

Props:

-   handle component properties
-   like function arguments, sent into component as attributes

```
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.color} car!</h2>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root));
root.render(<Car color="red"/>);
```

#### Props in the Constructor

If component has constructor function, props should be passed to the constructor and also to the `React.Cmoponent` via the `super()` method

```
class Car extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <h2>I am a {this.props.color} car!</h2>;
  }
}
const root = ReactDOM.createRoot(document.getElementById('root));
root.render(<Car color="red"/>);

```

#### Components in Components

(see same section above)

#### Components in Files

(see same section above )

### React Class Component State

-`state` object stores property values that belong to the component.

-   when `state` object changes, the component re-renders

#### Creating the state Object

`state` object initialized in the constructor, and can have as many properties as you like:

```
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
}
```

#### Using the `state` Object

Use `this.state.propertyName` syntax:

```
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}
```

#### Changing the `state` Object

Always use `this.setState()` to update so the component knows its been updated. It will call the `render()` method and all other lifecycle methods.

```
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeColor = () => {
    this.setState({color: "blue"});
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
}
```

### Lifecycle of Components

1. **Mounting**
2. **Updating**
3. **Unmounting**

#### Mounting

**Mounting** = putting elements into the DOM.

Four built-in methonds that get called in this order when mounting a component:

1. `constructor()`
2. `getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()`

##### constructor

-   `constructor()` method called before anything else when component is initiated
-   place to set up initial `state` and values
-   called with the `props` as arguments
-   call the `super(props) before anything else
    -   to initiate parent's constructor method
    -   allows the component to inherit methods from its parent (`React.Component`)

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

##### getDerivedStateFromProps

-   `getDerivedStateFromProps()` method called right before rendering the element(s) in the DOM
-   natural place to set the `state` object based on initial `props`.
-   takes `state` as an argument, returns an object with changes to the `state`.

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header favcol="yellow"/>);
```

##### render

-   `render()` method is required
-   outputs HTML to the DOM

```
class Header extends React.Component {
  render() {
    return (
      <h1>This is the content of the Header component</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

##### componentDidMount

-   `componentDidMount()` method called after component is rendered
-   where you run statements that require the component already to be placed in the DOM

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

#### Updating

lifecycle reminder:

1. **Mounting**
2. **Updating**
3. **Unmounting**

Five built-in methods that get called in this order when a component is updated:

1. `getDerivedStateFromProps()`
1. `shouldComponentUpdate()`
1. `render()`
1. `getSnapshotBeforeUpdate()`
1. `componentDidUpdate()`

`render()` method is required and will always be called. Others are optional.

##### getDerivedStateFromProps, part 2

This example has a button that changes the favorite color to blue, but since the `getDerivedStateFromProps()` method is called, the favorite color is still rendered as yellow (because the method updates the state with the color from the favcol attribute).

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header favcol="yellow" />);
```

##### shouldComponentUpdate

`shouldComponentUpdate()` method can return a Boolean value that specifies whether React should continue with rendering or not.

default value is `true`. Because this example is `false`, nothing with happen when button is clicked.

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  shouldComponentUpdate() {
    return false;
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

##### render, part 2

`render()` method called when a component gets _updated_. Therefore, re-rendering the HTML to the DOM with the new changes.

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

##### getSnapshotBeforeUpdate

`getSnapshotBeforeUpdate()` method has access to `props` and `state` _before_ the update. So you can check whan values were _before_ update.

-   When `getSnapshotBeforeUpdate` method is present, must include `componentDidUpdate()` method

The following example:

1. When component _has been mounted_, a timer changes the state. After a second, `favoritecolor` becomes "yellow."
2. This action triggers the _update_ phase. Because this component has a `getSnapshotBeforeUpdate()` method, it is executed and writesa message to the empty DIV1 element.
3. Then the `componentDidUpdate()`method is executed and writes a message in the empty DIV2 element.

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Before the update, the favorite was " + prevState.favoritecolor;
  }
  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoritecolor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

##### componentDidUpdate

`componentDidUpdate` method called after component updated in the DOM.

Example:

1. When component is _mounting_ it is rendered with `favoritecolor` "red.
2. When component _has been mounted_, a timer changes the state and the color becomes "yellow".
3. The action triggers the _update_ phase. Since this component has a `componentDidUpdate` method, it's executed and writes a message in the empty DIV element.

```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  componentDidUpdate() {
    document.getElementById("mydiv").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <div id="mydiv"></div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);

```

#### Unmounting

only one built-in method...

##### componentWillUnmount

called when the component is about to be removed from the DOM.

```

Result Size: 371 x 599


import React from 'react';
import ReactDOM from 'react-dom/client';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }
  delHeader = () => {
    this.setState({show: false});
  }
  render() {
    let myheader;
    if (this.state.show) {
      myheader = <Child />;
    };
    return (
      <div>
      {myheader}
      <button type="button" onClick={this.delHeader}>Delete Header</button>
      </div>
    );
  }
}

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
```

## React Props

Props

-   arguments passed into React components
-   passed to components via HTML attributes
-   like function arguments in JS _and_ attributes in HTML
-   use same syntax as HTML attributes to send props into a component

```
const myElement = <Car brand="Ford" />
```

The component receives the argument as a `props` object:

```
function myCar() {
  <p>My car is a { props.brand }</p>
}
```

### Pass Data

Props used to pass data from one component to another as parameters

```
function Car(props) {
  return <h2>I am a { props.brand }!</h2>;
}

function Garage(props) {
  return (
    <>
      <h1>Who lives in the garage?</h1>
      <Car brand="Ford" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root));
root.render(<Garage />);
```

Sending a variable instead of a string? Use `{ }`

Create variable `carName` and send it to the `Car` component:

```
function Car(props) {
  return <h2> I am a { props.brand }!</h2>;
}

function Garage(props) {
  const carName = "Ford";
  return (
    <>
      <h1>Who lives in the garage?</h1>
      <Car brand={ carName } />
    </>
  );
}

const root = ReactDom.createRoot(document.getElementById('root));
root.render(<Garage />);
```

Or an object:

```
import React from 'react';
import ReactDOM from 'react-dom/client';

function Car(props) {
  return <h2>I am a { props.brand.model }!</h2>;
}

function Garage() {
  const carInfo = { name: "Ford", model: "Mustang" };
  return (
    <>
	    <h1>Who lives in my garage?</h1>
	    <Car brand={ carInfo } />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

## React Events

React has same events as HTML (click, change, mouseover, etc.)

### Adding Events

-   React events written in camelCase syntax. Use `onClick` and _not_ `onclick`.
-   Handlers are written inside curly braces. Use `onClick={shoot}` and _not_ `onClick=shoot()`

| Language | Example                                             |
| -------- | --------------------------------------------------- |
| React    | `<button onClick={shoot}>Take the Shot!</button>`   |
| HTML     | `<button onclick="shoot()">Take the Shot!</button>` |

```
function Football() {
  const shoot = () => {
    alert("Great Shot!");
  }

  return (
    <button onClick={shoot}>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```

### Passing Arguments

Use an arrow function

```
function Football() {
  const shoot = (a) => {
    alert(a);
  }

  return (
    <button onClick={() => shoot("Goal!")}>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```

### React Event Object

Event handlers have access to the React event that triggered the function.

```
function Football() {
  const shoot = (a, b) => {
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
  }

  return (
    <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```

## React Conditionals (Conditional Rendering)

### `if` Statement

```
function Goal(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <MadeGoal/>;
  }
  return <MissedGoal/>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Goal isGoal={false} />);
```

### Logical `&&` Operator

```
function Garage(props) {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 &&
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
      }
    </>
  );
}

const cars = ['Ford', 'BMW', 'Audi'];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage cars={cars} />);
```

### Ternary Operator

ternary operator form: `condition ? true : false`

```
function Goal(props) {
  const isGoal = props.isGoal;
  return (
    <>
      { isGoal ? <MadeGoal/> : <MissedGoal/> }
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Goal isGoal={false} />);
```

## React Lists

lists in React rendered with some kind of loop, generally with `map()` method.

map refresher:

```
const myArray = ['apple', 'banana', 'orange'];

const myList = myArray.map((item) => <p>{item}</p>)
```

Rendering a list _without_ a key will work, but will return an error:

```
function Garage() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car brand={car} />)}
      </ul>
    </>
  );
}

function Car(props) {
  return <li>I am a { props.brand }</li>;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

### Keys

-   allow React to keep track of elements.
-   If an item is updated/removed, only that item will be re-rendered, not the whole list.
-   Keys need to be unique to each sibling.
-   **Generally, the key should be a unique ID assigned to each item. As a last resort, you can use the array index as a key.**

refactored to include keys:

```
function Garage() {
  const cars = [
    {id: 1, brand: 'Ford'},
    {id: 2, brand: 'BMW'},
    {id: 3, brand: 'Audi'}
  ];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car key={car.id} brand={car.brand} />)}
      </ul>
    </>
  );
}

function Car(props) {
  return <li>I am a { props.brand }</li>;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

## React Forms

We don't want React to have the standard way to add a form because the whole page will refresh:

```
function MyForm() {
  return (
    <form>
      <label>Enter your name:
        <input type="text" />
      </label>
    </form>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
```

### Handling Forms

HTML - form handled by the DOM

React - form handled by the components = data stored in the component state

-   Control changes by adding event handlers in the `onChange` attribute.
-   use the `useState` Hook to track each input's value and have "single source of truth" for entire application.

```
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <label>Enter your name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);

```

### Submitting Forms

control submit action by adding an event handler in the `onSubmit` attribute for the `<form>`.

```
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
```

### Multiple Input Fields

More than one input field? Control the values by adding a `name` attribute to each element.

-   initialize state with an empty object
-   To access the fields in the event handler, use `event.target.name` and `event.target.value` syntax.
-   To update the state, use square brackets [bracket notation] around the property name.

```
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
      <input
        type="text"
        name="username"
        value={inputs.username || ""}
        onChange={handleChange}
      />
      </label>
      <label>Enter your age:
        <input
          type="number"
          name="age"
          value={inputs.age || ""}
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
```

### Textarea

React textarea element different from HTML.

In HTML, the value of a textarea is text between start tag `<textarea>` and end tag `</textarea>`.

```
<textarea>
  Content of textarea
</textarea>
```

In React, the value of a textarea is placed in a value attribute. Use the `useState` Hook to manage the value of the textarea:

```
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const handleChange = (event) => {
    setTextarea(event.target.value)
  }

  return (
    <form>
      <textarea value={textarea} onChange={handleChange} />
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
```

### Select

drop down lists and select boxes different in React.

In HTML, the selected value in the drop down list defined with the `selected` attribute:

```
<select>
  <option value="Ford">Ford</option>
  <option value="Volvo" selected>Volvo</option>
  <option value="Fiat">Fiat</option>
</select>
```

In React, the selected value defined with `value` attribute on the `select` tag. A simple select box, where the selected value "Volvo" is initialized in the constructor:

```
function MyForm() {
  const [myCar, setMyCar] = useState("Volvo");

  const handleChange = (event) => {
    setMyCar(event.target.value)
  }

  return (
    <form>
      <select value={myCar} onChange={handleChange}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
    </form>
  )
}
```

## React Router

Create React App doesn't include page routing. React Router most popular solution.

### Add React Router

```
npm i -D react-router-dom
```

if upgrading from React v5:

```
npm i -D react-router-dom@latest
```

### Folder Structure

keywords:
file system structure

`src\pages\:`

-   `Layout.js`
-   `Home.js`
-   `Blogs.js`
-   `Contact.js`
-   `NoPage.js`

### Basic Usage

-   wrap content with `<BrowserRouter>`
-   define `<Routes>`. An application can have multiple `<Routes>`.
-   `<Routes>` can be nested. The first `<Routes>`has a path of `/` and renders the `Layout` component.
-   The nested `<Route>`s inherit and add to the parent route. E.g., the `blogs` path is combined with parent and becomes `/blogs`.
-   `Home` component route has an `index` attribute. It doesn't have a path. This specifies this route as the default route for the parent route, which is`/`.
-   Setting the `path` to `*` will act as catch-all for any undefined URLs. Great for 404 error page.

`index.js`

```
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Pages / Components

-   `Layout` component has `<Outlet>` and `<Link>` elements.
-   The `<Outlet>` renders the current route selected.
-   `<Link>` is used to set the URL and keep track of browsing history
-   Anytime we link to an internal path, we use the `<Link>` instead of `<a href="">`.
-   The "layout route" is a shared component that inserts common content on all pages, such as a navigatio nmenu.

`Layout.js`

```
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
```

`Home.js`

```
const Home = () => {
return <h1>Home</h1>;
};

export default Home;
```

`Blogs.js:`

```
const Blogs = () => {
return <h1>Blog Articles</h1>;
};

export default Blogs;
```

`Contact.js: `

```
const Contact = () => {
return <h1>Contact Me</h1>;
};

export default Contact;
```

`NoPage.js:`

```
const NoPage = () => {
return <h1>404</h1>;
};

export default NoPage;
```

## React Memo

??? _review again later after studying Hooks_

`memo` will cause React to skip rendering a component if its props haven't changed, improving performance.

### Problem

`Todos` component re-renders even when the todos haven't changed:
`index.js`:

```
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <Todos todos={todos} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

`Todos.js`:

```
const Todos = ({ todos }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default Todos;
```

### Solution

-   use `memo` to keep the `Todos` component from needlessly re-rendering.
-   Wrap the `Todos` component export in `memo`:

`index.js`:

```
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <Todos todos={todos} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

`Todos.js` :

```
import { memo } from "react";

const Todos = ({ todos }) => {
console.log("child render");
return (
<>
<h2>My Todos</h2>
{todos.map((todo, index) => {
return <p key={index}>{todo}</p>;
})}
</>
);
};

export default memo(Todos);
```

## React CSS Styling

Three options:

-   Inline styling
-   CSS stylesheets
-   CSS Modules

### Inline styling

must be a JS object. In JSX, JS expressions are written inside curly braces. And JS objects also use curly braces, you need two sets `{{ }}`.

```
const Header = () => {
  return (
    <>
      <h1 style={{color: "red"}}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
}
```

#### camelCased Property Names

Use `backgroundColor` instead of `background-color`.

```
const Header = () => {
  return (
    <>
      <h1 style={{backgroundColor: "lightblue"}}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
}
```

#### JavaScript Object

create an object with styling info, refer to it in style attribute:

```
const Header = () => {
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };
  return (
    <>
      <h1 style={myStyle}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
}
```

### CSS stylesheets

`import './App.css'; `

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

const Header = () => {
  return (
    <>
      <h1>Hello Style!</h1>
      <p>Add a little style!.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

### CSS Modules

Use file extension `module.css`.

E.g, `my-style.module.css`

```
.bigblue {
  color: DodgerBlue;
  padding: 40px;
  font-family: Sans-Serif;
  text-align: center;
}
```

Next, import the stylesheet in your component:

`Car.js:`

```
import styles from './my-style.module.css';

const Car = () => {
  return <h1 className={styles.bigblue}>Hello Car!</h1>;
}

export default Car;
```

Last, import the component in your application:
`index.js`:

```
import ReactDOM from 'react-dom/client';
import Car from './Car.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

## React Sass Styling

### What is Sass

-   Sass is a CSS pre-processor.
-   Sass files are executed on the server and sends CSS to the browser.
-   You can learn more about Sass in our [Sass Tutorial](https://www.w3schools.com/sass/default.php).

### Can I use Sass?

If you use `create-react-app`, easy to install/use Sass.

```
npm i sass
```

### Create a Sass file

same way as CSS, but with extension `.scss`.

`my-sass.scss`:

```
$myColor: red;

h1 {
  color: $myColor;
}
```

Then import it:

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './my-sass.scss';

const Header = () => {
  return (
    <>
      <h1>Hello Style!</h1>
      <p>Add a little style!.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

# React Hooks W3 Schools Tutorial

Hooks allow **function** components to have access to state and other React features. Therefore, class components are generally no longer needed.

#### React Hook Summary Table

| Hook         | Syntax                                                                               | Purpose                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useState`   | `const [current state, function that updates that state] = useState(initial state);` | track state in a function component                                                                                                                               |
| `useEffect`  | `useEffect(<function> <dependency>)`                                                 | perform side effects in components (fetch data, timer, directly update DOM, etc.)                                                                                 |
| `useContext` |                                                                                      | <ul><li>manage state globally</li><li>use with `useState` Hook to more easily share state between deeply nested components</li>                                   |
| `useRef`     | E.g. `const count = useRef(0);`                                                      | <ul><li>persist values between renders.</li><li>store a mutable value that doesn't cause a re-render when updated</li><li>access a DOM element directly</li></ul> |

## What is a Hook?

Hooks "hook" into React features such as state and lifecycle methods.

-   must `import` Hooks from `react`.
-   this example uses `useState` Hook to keep track of application state
-   State generally refers to application data or properties that need to be tracked.

```
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```

### Hook Rules

1. Hooks can only be called inside React function components.
1. Hooks can only be called at the top level of a component.
1. Hooks cannot be conditional

Note: Hooks will not work in React class components.

### Custom Hooks

If stateful logic needs to be reused in several components, you can build your own custom Hooks.

## useState Hook

track state in a function component.

`const [current state, function that updates that state] = useState(initial state);`

### Import `useState`

Here, `useState` is destructured from `react` as it is a named export:

```
import { useState } from "react";
```

### Initialize `useState`

-   Initialize state by calling `useState` in function component
-   `useState` accepts an initial state and returns two values
    1. the current state
    2. a function that updates that state
-   notice that returned values from `useState` are destructured.
-   inital state set to empty string: `useState(")`

```
import { useState } from "react";

function FavoriteColor() {
  const [color, setColor] = useState("");
}
```

### Read State

```
import { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return <h1>My favorite color is {color}!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```

### Update State

use state updater function.

Never directly update state.

```
import { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```

### What Can State Hold?

`useState` Hook can track

-   strings
-   numbers
-   booleans
-   arrays
-   objects
-   or any combination of these

multiple state Hooks to track individual values:

```
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Car() {
  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Mustang");
  const [year, setYear] = useState("1964");
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My {brand}</h1>
      <p>
        It is a {color} {model} from {year}.
      </p>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

one state including an object:

```
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

_Note that with a single object, need to refrence `object.property` when rendering the component_

### Updating Objects and Arrays in State

-   When state is updated, the entire state gets overwritten
-   E.g., calling `setCar({color: "blue})` would remove brand, model, and year from our state!

use spread operator to update only the car color. Because we need the current value of state, we pass a function into our `setCar` function. This function receives the previous value.

We then return an object, spreading the `previousState` and overwriting only the color.

```
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  const updateColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "blue" }
    });
  }

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button
        type="button"
        onClick={updateColor}
      >Blue</button>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

## useEffect Hook

Syntax:

```
useEffect(<function>, <dependency>)
```

perform side effects in your components

-   fetching data
-   directly updating the DOM
-   timers

Example:

Use `setTimeout()` to count 1 second after initial render and keep counting because `useEffect` runs on every render.

```
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

How to control when side effects run?

1. No dependency passed:

```
useEffect(() => {
  //Runs on every render
});
```

2. An empty array:

```
useEffect(() => {
  //Runs only on the first render
}, []);
```

3. Props or state values:

```
useEffect(() => {
  //Runs on the first render
  //And any time any dependency value changes
}, [prop, state]);
```

Only run the effect on the initial render:

```
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []); // <- add empty brackets here

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

An example of a `useEffect` Hook that is dependent on a variable. If the count variable updates, the effect will run again:

```
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
```

With multiple dependencies, they should be included in the useEffect dependency array.

### Effect Cleanup

Clean up the timer at the end of the useEffect Hook:

```
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
    setCount((count) => count + 1);
  }, 1000);

  return () => clearTimeout(timer)
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

## useContext Hook

-   a way to manage state globally
-   can be used together with `useState` Hook to share state between deeply nested components more easily than with `useState` alone.

### The Problem

??? _review later_

-   State should be held by the highest parent component in the stack that requires access to the state.

Example has many nested components.

-   The component at the top and bottom of the stack need access to the state.
-   Without Context, need to pass state as "props" through each nested component. This is called "prop drilling."

Passing "props" through nested components. Even though components 2-4 do not need the state, they have to pass the state along so that it could reach component 5:

```
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 user={user} />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 user={user} />
    </>
  );
}

function Component5({ user }) {
  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Component1 />);
```

### The Solution

#### Create Context

1. Import `createContext` and initialize it

```
import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext()
```

#### Context Provider

2. Wrap child components in the Context Provider and supply the state value to give all components in this tree access to the user Context:

```


function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </UserContext.Provider>
  );
}
```

#### Use the `useContext` Hook

Need `useContext` Hook to use the Context in a child component.

1. include `useContext` in the import statement

```
import { useState, createContext, useContext } from "react";
```

2. Now you can access the user Context in all components

```


function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```

Full example using React Context:

```
import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Component1 />);
```

## useRef

-   persist values between renders.
-   store a mutable value that doesn't cause a re-render when updated
-   can be used to access a DOM element directly.

### Does Not Cause Re-renders

If we tried to count how many times an application renders using the `useState` Hook, it would create infinite loop because `useState` itself causes a re-render.

Use useRef to track application renders:

-   `useRef()` only returns one item. It returns an Object called `current`.
-   When we initialize `useRef` we set the initial value: `useRef(0)`.
-   It's like doing this: `const count = {current: 0}`. We can access the count by using `count.current`.

```
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Accessing DOM Elements

???

In general, React should handle DOM manipulation. Some instances where `useRef` can be used without causing issues

E.g. Use `useRef` to focus the input:

```
import { useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Tracking State Changes

???

`useRef` Hook can also keep track of previous state values. We can persist `useRef` values between renders.

Use `useRef` to keep track of previous state values:
In the `useEffect`, we are updating the `useRef` current value each time the `inputValue` is updated by entering text into the input field.

```
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

## useReducer Hook

???

-   allows for custom state logic.
-   similar to `useState` Hook
-   useful when keeping track of multiple pieces of state that rely on complex logic.

syntax:

```
useReducer(<reducer>, <initialState>)
```

-   `reducer` function contains custom state logic
-   `initialState` generally will contain an object.
-   returns the current `state` and a `dispatch` method.

Example below just the logic to keep track of the todo complete status. All logic to add, delete, and complete a todo could be contained within a single useReducer Hook by adding more actions.

```
import { useReducer } from "react";
import ReactDOM from "react-dom/client";

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Todos />);
```

## useCallback Hook

## useMemo Hook

## Custom Hooks

React Exercises
React Quiz
React Exercises
React Certificate

React Props

Props are arguments passed into React components.

# CSS Notes

## flexbox

main axis = y-axis
cross axis = x-axis

### flex-direction

-   row: lay out the main axis from left to right
-   row-reverse: lay out the main axis from right to left
-   column: lay out the main axis from top to bottom
-   column-reverse: lay out the main axis from bottom to top

### align-items

align-items and align-self

-   flex-start: align item(s) across the start of a container's cross axis
-   flex-end: align item(s) across the end of the cross axis
-   center: align item(s) across the center of the cross axis

### order

#: position an item relative to the other items in the container

The order property defines the order in which an item appears in the flex container and accepts both positive and negative integer values. All flex items begin with a default order of 0, so an item with an order greater than 0 will be repositioned relative to items still set to their default orders.

### justify-content

-   flex-start: group items at the start of a container's main axis
-   flex-end: group items at the end of the main axis
-   center: group items in the center of the main axis
-   space-between: evenly distribute items along the main axis such that the first item aligns at the start and th- final item aligns at the end
-   space-around: evenly distribute items along the main axis such that all items have equal space around them

### align-self

-   flex-start: align item at the start of a container's cross axis
-   flex-end: align item at the end of the cross axis
-   center: align item at the center of the cross axis
-   baseline:
-   stretch:
    Reminder: align-self, like align-items, also accepts the values baseline and stretch, but these values cannot be used in Flexbox Defense.

## CSS Resources

-   https://the-echoplex.net/flexyboxes/

# Brainstorming

## React tutorial website

I'm finding that the examples from class and on the React Docs site get complicated too quickly. It would be helpful for new learners to have examples of varying complexity.
