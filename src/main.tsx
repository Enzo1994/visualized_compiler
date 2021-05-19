import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as compileCore from '../packages/@vue/compiler-core/dist/compiler-core.esm-bundler'
// const compileCore = require('../packages/@vue')
console.log(compileCore)
// import compileCore from '../packages/@vue/compiler-core/dist/compiler-core.esm-bund'


const res = compileCore.baseParse(`<div>aaa</div>`)
console.log(res)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
