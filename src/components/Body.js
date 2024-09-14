import React from 'react'
import Sidebar from './Sidebar'
// import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div className='grid grid-flow-col overflow-x-hidden w-full'>
      <Sidebar/>
      <Outlet/>
      
    </div>
  )
}

export default Body
