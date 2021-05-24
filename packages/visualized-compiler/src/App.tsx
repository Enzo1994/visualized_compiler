import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Visualizer} from '../../visualizer/src/main'
import * as compileCore from '../../vue-compiler-core/dist/compiler-core.esm-bundler'

let v:Visualizer  = null;

function App() {
  const [count, setCount] = useState(0)
  const [inputContent, setInputContent] = useState('')


  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = function(e){
    setInputContent( (e.target as HTMLTextAreaElement).value)
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = async function(e){
    v = new Visualizer({content:inputContent, id:'canvasContainer'})
    // @ts-ignore
    window.v = v
    await compileCore.baseParse(inputContent, {visualizer: v} as compileCore.ParserOptions)
  }

  useEffect(()=>{

  },[])

  return (
    <div className="App">
      <textarea id="" cols={30} rows={10} value={inputContent} onChange={handleChange}></textarea>
      <button onClick={handleClick}>点击生成</button>
      <div id="canvasContainer"></div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header> */}
    </div>
  )
}

export default App
