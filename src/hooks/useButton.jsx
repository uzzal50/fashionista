import { useEffect } from 'react'
import { useState } from 'react'

export const useButton = (defaultState, max) => {
  const [num, setNum] = useState(defaultState)

  const nextButton = () => {
    setNum(oldState => {
      let newState = parseInt(oldState + 1)
      if (newState > max) {
        return (newState = 0)
      } else return newState
    })
  }

  const prevButton = () => {
    setNum(oldState => {
      let newState = oldState - 1
      if (newState < 0) {
        return (newState = max)
      } else return newState
    })
  }

  useEffect(() => {
    setNum(defaultState)
    return () => {}
  }, [defaultState])
  return { num, nextButton, prevButton }
}
