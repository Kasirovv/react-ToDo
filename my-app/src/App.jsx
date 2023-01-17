import React from 'react'
import Carts from './components/Carts'
import Modalka from './components/Modalka'

function App() {
  return (
    <div className='w-[100%] h-[100vh] bg-slate-500 px-5'>
      <Modalka/>
      <Carts/>
    </div>
  )
}

export default App
