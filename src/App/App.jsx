import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react';

import ElementList from '../ElementList/ElementList'
import ElementForm from '../ElementForm/ElementForm'

// useSelector reads a variable (a reducer) from our store
// useDispatch allows us to send an action to our store, and trigger the update of a variable (a reducer)
import { useSelector, useDispatch } from 'react-redux';

function App() {


  // useSelector takes in a function that tells it what part of the store you want.
  // here, we're asking for the whole store
  const reduxStore = useSelector(store => store);

  const count = useSelector(store => store.count);


  // "dispatch" is how we talk to redux, from react, if we want to request that a variable update.
  const dispatch = useDispatch();

  return (
    <>
      {/* Let's render the whole redux store, to our DOM, so we can see it */}
      <pre>{JSON.stringify(reduxStore)}</pre>


      <div>
        {/* Dispatch an action when the button is clicked */}
        <button onClick={() => dispatch({ type: 'COUNT_INCREASE' })} >Increase!</button>
        <button onClick={() => dispatch({ type: 'COUNT_DECREASE' })}>Decrease!</button>

        <p>The current count is: {count}</p>
      </div>

      {/* To pass data to our reducer (which we sometimes want to do), we add a 'payload' property
          to the action object we are dispatching.  That payload can be anything (an array, a boolean, a number, an object)
          that payload is the info we want to send to our reducer, so it has the info it needs to act. */}
      <button onClick={() => dispatch({ type: 'ELEMENTLIST_ADD', payload: 'hydrogen' })}>Add Hydrogen</button>

      {/* One of the big wins of redux, is that we can refactor our components without having to move a bunch of state around. */}
      <ElementList />

      <ElementForm />
      
    </>
  )
}

export default App
