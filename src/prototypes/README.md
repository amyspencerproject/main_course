# Prototypal Inheritance

---

### Video

https://www.loom.com/share/b95008fe94164f62be4ce1aad176a08f?sharedAppSource=personal_library

### Reading

https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9

Mozilla Article - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

In particular in the Mozilla Article is the section **[Different ways of creating and mutating prototype chains](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#different_ways_of_creating_and_mutating_prototype_chains)** which gives a breakdown with pros and cons.

### My Notes
Since Javascript is my first programming language I do not have the reference point of how it differs from C# or Java. It seems Javascript is more dynamic and doesn’t have the static/structured class like these other languages. Not sure if that is an advantage for me or not 🤣

From the Mozilla article - 

JavaScript is based on objects. It only has one construct in regard to inheritance and that is **objects**

Each object holds a link to another object called its **prototype**. This is the prototype chain and continues until the end of the line where `null` is the final prototype. The prototype chain is dynamic because it is possible to mutate or swap out any member of the prototype chain. That is not true in other languages.

The classic model that is common to other languages can be layered on top of JS’s prototypical model. This is exactly how we have classes in JS!

Objects can have lots of properties which are called own properties. An object will have a link to a prototype object. When accessing a property, both the own properties and the prototype objects and the prototype objects of the prototype objects will be sought after. 

This article went into different notations for calling a prototype which I didn’t have any reference for or understand. I did take note of this one comment on notation. `{` `__proto__: … }` is different that `obj.``__proto__` And the former is standard and not deprecated! 

### More notation rules and inheritance properties.

This is an object literal `{ a:1, b:2,` `__proto__:c }` where the value `c` will become the **prototype** of the object represented by the literal, while the keys `a` and `b` become **own properties** of the object.

Side Note: What is an **Object Literal?** In plain English, an object literal is a comma-separated list of name-value pairs inside of curly braces. Those values can be properties and functions. 

**Property shadowing** occurs when two keys are the same but one key is an **own property** and the other key is in a prototype. The key returned is the top-level property. 

```
const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
  },
};

console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called Property Shadowing

```

**Prototype chain** is all the proto types returned until there is a null.

```
const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
  },
};

// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is an Object.prototype 
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
// This is the end of the prototype chain, 
// as null, by definition, has no [[Prototype]].
// Thus, the full prototype chain looks like:
// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> Object.prototype ---> null
```

### Inheriting Methods - JS does not have methods 🙃

There are no methods in JS. Functions are added as objects and are just a property. And inherited function acts just like a property including displaying property shadowing.

When an inherited function is executed the value of `this` points to the inheriting object not to the prototype object where the function is an own property.

```
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method()); // 3
// When calling parent.method in this case, 'this' refers to parent

console.log(parent.method()); // 3
// When calling parent.method in this case, 'this' refers to parent

// child is an object that inherits from parent
const child = {
  __proto__: parent,
};
console.log(child.method()); // 3
// When child.method is called, 'this' refers to child.
// So when child inherits the method of parent,
// The property 'value' is sought on child. However, since child
// doesn't have an own property called 'value', the property is
// found on the [[Prototype]], which is parent.value.
```

Property shadowing comes in to play when the inheriting object does have its own value.

```
child.value = 4; 
// This shadows the 'value' property on parent.
// The child object now looks like:
// { value: 4, __proto__: { value: 2, method: [Function] } }
console.log(child.method()); // 5
// Since child now has the 'value' property, 'this.value' means
// child.value instead
```

## Constructors!

Here is an example of some redundant code

```jsx
const boxes = [
    { value: 1, getValue() { return this.value; } },
    { value: 2, getValue() { return this.value; } },
    { value: 3, getValue() { return this.value; } },
  ];
```

Each of these instances has the same getValue() { return this.value;} function. Using a prototype would make this much more efficient. 

```jsx
const boxPrototype = {getValue() {return this.value}};

const boxes = [
    { value: 1, __proto__: boxPrototype},
    { value: 2, __proto__: boxPrototype},
    { value: 3, __proto__: boxPrototype}
  ];
```

Side Note: I couldn’t get boxes to run as `console.log(boxes.getValue());` so just to make sure everything was good I stripped out the array of objects and just used a single object. I must not understand how to call a prototype function on an array of objects

```jsx
const box =
   { value: 1, __proto__:  boxPrototype};

console.log(box.getValue()); // 1
```

Even this is not efficient enough so enter constructor functions. The constructor will set the prototype for every object manufactured and gets called with **new**.

```
// A constructor function
function Box(value) {
  this.value = value;
}
// Properties all boxes created from the Box() constructor
// will have
Box.prototype.getValue = function () {
  return this.value;
};

const boxes = [**new** Box(1), **new** Box(2), **new** Box(3)];
```

Each new Box() is an instance created from the Box constructor function.

Box.prototype is not much different from boxPrototype but boxPrototype is just a plain object.

Every instance of the constructor function will have the constructors prototype

Object.getPrototypeOf(newBox()) === Box.prototype

Constructor.prototype will have their own constructor property (see below) which references the function itself. So Box.prototype.constructor === Box. This is how every instance has access to the original constructor.

![Screenshot 2023-05-16 at 3.54.55 PM.png](Screenshot%202023-05-16%20at%203.54.55%20PM.png)

### Box rewritten as a class!

```
class Box {
  constructor(value) {
    this.value = value;
  }

  // Methods are created on Box.prototype
  getValue() {
    return this.value;
  }
}
```

Classes are nothing more than syntax on top of constructor functions. Because Box.prototype references the same object as the `[[Prototype]]` of all the instances you can change the behavior of all instances by mutating Box.prototype. `Constructor.prototype`can be mutated or reassigned but it is not a good practice to do this because for two reasons:

- The `[[Prototype]]` of instances created before the reassignment is now referencing a different object from the `[[Prototype]]` of instances created after the reassignment — mutating one's `[[Prototype]]` no longer mutates the other.
- Unless you manually re-set the `constructor` property, the constructor function can no longer be traced from `instance.constructor`, which may break user expectation. Some built-in operations will read the `constructor` property as well, and if it is not set, they may not work as expected.

The statements below I am only vaguely understanding at this point in the game 🥴

`Constructor.prototype` is only useful when constructing instances. It has nothing to do with `Constructor.[[Prototype]]`, which is the constructor function's *own* prototype, which is `Function.prototype` — that is, `Object.getPrototypeOf(Constructor) === Function.prototype`

## Implicit constructors of literals

Some syntaxes in JS will create instances that implicitly set the `[[Prototype]]` 

```jsx
// Object literals (without the __proto__ key) automatically
// have Object.prototype as their [[Prototype]]
const object = { a: 1 };
Object.getPrototypeOf(object) === Object.prototype; // true
```

```jsx
// Array literals automatically have Array.prototype as their [[Prototype]]
const array = [1, 2, 3];
Object.getPrototypeOf(array) === Array.prototype; // true
```

```jsx
// RegExp literals automatically have RegExp.prototype as their [[Prototype]]
const regexp = /abc/;
Object.getPrototypeOf(regexp) === RegExp.prototype; // true
```

## Building longer inheritance chains

The Constructor.prototype property will become the `[[Prototype]]` of the constructors instances. So the prototype chain will be Object.getPrototypeOf(Constructor.prototype) === Object.prototype. And then the `[[Prototype]]` of Object.prototype is null or Object.getPrototypeOf(Object.prototype) === null

```jsx
function Constructor() {}

const obj = new Constructor();
// obj ---> Constructor.prototype ---> Object.prototype ---> null
```

To build a longer prototype chain  you can set the `[[Prototype]]` of the Constructor.prototype with an Object.setPrototypeOf() function

```jsx
function Base() {}
function Derived() {}
// Set the `[[Prototype]]` of `Derived.prototype`
// to `Base.prototype`
Object.setPrototypeOf(Derived.prototype, Base.prototype);

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

This code above is exactly what happens when you extend a class in React!

```jsx
class Base {}
class Derived extends Base {}

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```