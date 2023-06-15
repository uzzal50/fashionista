import { useEffect, useRef } from 'react'
export const useLoad = ref => {
  
  ref = useRef(null)


  useEffect(() => {
    onLoad()
  }, [ref.current])

  const onLoad = () => {
    if (ref.current === null) return
    else {
      ref.current.parentElement.classList.add('loaded')
    }
  }

  return { onLoad, ref }
}
