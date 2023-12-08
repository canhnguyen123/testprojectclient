import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomeProduct from './page/homeProduct';
import Login from "./page/acction/login"
import Register from "./page/acction/register"
function main() {
  return (
    <main className='container'>
    
       <Routes>
             <Route path="/" element={<HomeProduct />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
        </Routes>
    </main>
  )
}

export default main
