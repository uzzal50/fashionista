import React, { useEffect, useRef, useState } from 'react'

const SuccessMessage = ({ type, text }) => {
  const mes = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      mes.current.style.display = 'none'
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {' '}
      <div className={`message ${type}-message text-center`} ref={mes}>
        {text}
      </div>
    </>
  )
}

export default SuccessMessage
