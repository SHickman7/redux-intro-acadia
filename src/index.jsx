import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'
import './index.css'

// These are the new things we installed
// These createStore and combine Reduvers us set up a store (a dispatcher) which lets our components communicate with our
// Fancy new redux variables (reducers)
// Note, createStore is likely crossed out, just ignore that.
import { applyMiddleware, createStore, combineReducers } from 'redux';
// applyMiddleware lets us give other things access to actions that pass through the store.


// We have a Redux store, and React components.
// This bit lets them talk to eachother and work together.
import { Provider } from 'react-redux'

// This is some middleware we'll apply, so we can monitor (in our browsers console) what's going on.
// It will report on every action that's dispatched to the store.
// It will show us the state of reducers before the action, what the action was, and the updated state
import logger from 'redux-logger';

// A reducer!!! aka, super fancy redux variable
// these have a pattern
// const ____ = (___, ____) => {
//   ____
//   _____
// }

// the parts of the pattern, do these things
// const varName = (value, triggeringWord) => {
//   maybeDoSomeLogic();
//   return aNewValue
// }

// let [count, setCount] = useState(0);

// With a reducer, there are three things we can't do:
// 1) Chanage state directly
// 2) Call functions that might return different values (math.rand, date.now)
// 3) Make asyncronous calls, aka, run functions that wait for a response: axios, pg.

const count = (state = 0, action) => {
  // console.log(`Hey, I'm the count reducer!!!!`, action);

  // Since the store passes all actions to all reducers,
  // having a system for naming your actions is a good idea.
  if (action.type === 'COUNT_INCREASE') {
    // console.log('doing the increase!');
    // When we return something, that value becomes the value of our "count" variable.
    return state + 1;
  }

  if (action.type === 'COUNT_DECREASE') {
    // console.log('doing the decrease!');
    return state - 1;
  }

  return state;
}

const elementList = (state = [], action) => {

  if (action.type === 'ELEMENTLIST_ADD') {
    console.log(`The element to add is: ${action.payload}`)

    // We are in a reducer, so we can not change state.
    // We have to return a new value instead.

    // basically, redux breaks adding thigns to arrays and objects.
    // So, this isn't going to work the way we think it is:
    // return state.push(action.payload);
    // When we use .push on an array, it changes the array, so we can't use it anymore.
    // (since we aren't alloud to change the state!)

    // luckily, one weird trick can save us!

    // We can do this in many lines of code:
          // let newArray = []

          // for (let element of state) {
          //   newArray.push(element);
          // }

          // newArray.push(action.payload);
          // return newArray;
    
    // or the short way:
    return [...state, action.payload];
    // Introducing the spread opperator
    // The spread opporator returns a new copy of the contents of an array or object.
    // const myArray = [1,2,3];
    // console.log(...myArray); // 1 2 3

    // so this: [...state, action.payload]
    // is: make an array that has (as it's contents), a copy of the contents of state, plus one extra element: action.payload
    // That's what we want, so that's what we return.
  }

  // Notice in the console.log, the store passes all actions to all reducers!
  // console.log(`Hey, I'm the elementList reducer!!!!`, action);

  return state;
}

// The store!!!

// The store is the middleman/gateway/dispatcher that components talk to.
// We will wrap our App with knowledge of the store, so components can interact with the store.
// Components will send requests to the store, in order to access or update reducers
// The store looks at the requests, and passess them onto the reducers

// We gather all our reducers into the store, and the store will pass requests onto
// The reducers it has gathered up.

// When we send the store a dispatch (an action to update or change something), it will pass
// the dispatch on, to all the reducers.
const storeInstance = createStore(
  combineReducers(
    {
      count,
      elementList
    }
  ),
  // Tell Redux that we want to use our logger.
  // apply middlewear: hey, this thing... let it snoop.
  // In this case, the thing we let snoop is our logger.
  applyMiddleware(logger)
);

console.log("what type is store instance: ", typeof storeInstance);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* You will forget this at some point.
        We have to wrap our app in the Providor component
        This is basically allowing Redux and React to talk to each other, and work together. */}
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
)
