import React from 'react'
import "./styles.css"
function Button({text,onClick,disabled, style}) {
  return (
    <div 
      disabled={disabled} 
      onClick={onClick} 
      className='custom-btn'
      style={style}
    >
        
      {text}
    </div>
  )
}

export default Button