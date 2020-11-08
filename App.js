import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //When the app loads, we need to listen to the database and fetch new Todos as they get added/ removed
  useEffect(() => {
    //This code will execute when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    //This will fire off when we click the button

    event.preventDefault(); //This will stop the page from refreshing 

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput(''); //Clears out the input after button click
  }

  return (
    <div className="App">
<h1> ToDo List 🚀  </h1>
<form>

<FormControl>
  <InputLabel>🎫 Write a ToDo</InputLabel>
  <Input value={input} onChange={event => setInput(event.target.value)}/>
</FormControl>

  <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
  Add ToDo
</Button>
  {/*</form>* button onClick={addTodo}>Add ToDo</button */}
</form>

    <ul>
      {todos.map(todo => (
        <Todo todo={todo} />
        //<li>{todo}</li>
      ))}
    </ul>


    </div>
  );
}

export default App;
