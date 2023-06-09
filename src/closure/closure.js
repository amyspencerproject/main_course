/* 
    Write a function that returns a function that can only be called once
    e.g. const myFunc = once(() => {console.log('yo')})
    myFunc() -> 'yo'
    myFunc() -> undefined
    myFunc() -> undefined
*/

const once = (callback) => {};

/* 
    Write a function that returns a function that take an initial number
    Subsequent calls will add that number to the new number
    e.g. const add2 = addFactory(2)
 
    add2(4) -> 6
    add2(7) -> 9
    add2(3) -> 5
*/

const addFactory = (initialNum) => {};

/* 
    Our person has some sensitive information exposed below
    make `accountBalance` and `bankInfo` private by leveraging closure scope
    for example: 
    personWithPrivateProperties().bankInfo.sensitiveId => undefined
    personWithPrivateProperties().accountBalance => undefined
*/

const personWithPrivateProperties = () => {
  return {
    age: 10,
    job: "Pizza Driver",
    accountBalance: -5,
    bankInfo: { name: "Bank of Venezuela", sensitiveId: "BV123" },
    updateBank: () => {
      //your code here
    },
    getBankInfo: () => {
      //your code here
    },
    getAccountBalance: () => {
      //your code here
    },
    updateAccountBalance: () => {
      //your code here
    },
  };
};

module.exports = {
  once,
  addFactory,
  personWithPrivateProperties,
};
