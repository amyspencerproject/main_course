// functions have a prototype property and functions are objects
function doSomething() {} 
// console.log(doSomething.prototype); //[[Prototype]]: Object --> __proto__: null

//arrow functions do not have a prototype property
const doSomethingFromArrowFunction = () => {}; 
// console.log(doSomethingFromArrowFunction.prototype); //null

// Use the "new" operator to create an instance of doSomething()
// Calling a function with "new" returns an object that is an instance of the function. Properties can then be added onto this object.
doSomething.prototype.foo = "bar"; //added a property to the original doSomething function
doSomethingInstance = new doSomething(); // new returns an instance of doSomething() which is an object
doSomethingInstance.prop = "Random Value"; // add a prop to the new instance object

// console.log(doSomethingInstance); // doSomething {prop: 'Randon Value'} [[Prototype]]: Object foo: 'bar' --> [[Prototype]]: Object __proto__: null

// How Inheritance Works

const Person = function () {
  this.name = "Vanae"
  this.job = "Chief Troublemaker"
};

// new instances of Person
const personA = new Person();


const personB = Object.create(personA); //a bit confused if using this should be avoided, maybe to be avoided when overriding a constructor?
personB.name = "Kevin";
personB.job = "Digital Prophet"

// console.log(personA.name, personB.name);

// console.log('personA proto:', personA.__proto__);
// console.log('personB proto:', personB.__proto__);

Person.prototype.personGreeting = function (){console.log(`My name is ${this.name} and my job is ${this.job}`)};
// console.log(personA.personGreeting());

// trying to replicate adding a greeting prototype but in a different way
// didn't work out but not sure why
// const Greeting = function () { console.log(`My name is ${this.name} and my job is ${this.job}`)};
// Object.setPrototypeOf(Person.prototype, Greeting.prototype);
// console.log(Greeting());


// console.log(personC);
// console.log(personC.prototype);




console.log("Debug Done!");
// create another instance of Person called personB
// const personB = new Person(this.name = "Maggie", this.job = "Dream Alchemist");


// console.log(personB);

// create another instance of Person called personC 
// assign and new name and job for person C by overriding the name and job in Person

// personC = Object.create(personB);

// personC.name = "Kevin";
// personC.job = "Digital Overlord"

// console.log(personC);
// console.log("proto", personC.__proto__)


// TODO:
// attach a new method `greeting` to the Person prototype
// it should return a greeting that says `My name is <name> and my job is <job>`
// Person.prototype.greeting = function () {`My name is ${this.name} and my job is ${this.job}`};
// greetingAttached = Person.personA.greeting();

// console.log(greetingAttached);

// console.log(personA.name, personC.name);
// console.log("proto", personC.__proto__)
// console.log(personA.greeting());
// console.log(personB.greeting());



// TODO:
// add a new method to the Array prototype called `myCustomFind`
// this method should take in a single argument and return `true` if that argument is found in the array and `false` if not
// ex: [1,2,3].myCustomFind(3) = true
// [1,2,3].myCustomFind(10) = false

Array.prototype.myCustomFind = function (num) { };

// module.exports = {
// 	personB,
// 	personA,
// 	Person,
// };




