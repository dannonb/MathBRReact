import React, { useState, useEffect } from 'react';
import NumberPad from './views/NumberPad/NumberPad'
import Auth from './views/Auth/Auth'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')

function App() {
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  const sendMessage = (e) => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name: '' })
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })
  return (
    <>
      {/* <NumberPad /> */}
      {/* <div>
        <form onSubmit={sendMessage}>
          <input type='text' name='name' onChange={handleChange} />
          <input type='text' name='message' onChange={handleChange} />
          <button type='submit'>Send</button>
        </form>
      </div>
      <div>
        {chat.map((obj) => (
          <>
            {obj.name}: {obj.message}
          </>
        ))}
      </div> */}
      <Auth />
    </>
  );
}

export default App;
