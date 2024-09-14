import React from 'react'
import Button from './Button'


const list = ["All", "Live", "Gaming","Sports","Movie","Songs","GYM","WEB Dev","Android","Latest"];
const Buttonlist = () => {
  return (
    <div className='flex'>
      
      {
        list.map((list)=>(
          <Button key={list} name={list} />
        ))
      }
      
    </div>
  )
}

export default Buttonlist
