import { useState } from 'react'
import {
  OPEN_MESSAGE,
  CLOSE_MESSAGE,
} from '../redux/Slice/Message/messageSlice'
import { useSelector, useDispatch } from 'react-redux'

const useHandleImage = e => {
  const [thumbnail, setThumbnail] = useState(null)
  const dispatch = useDispatch()

  const handleImage = e => {
    setThumbnail(null)
    let selected = e.target.files[0]

    //to check image file
    if (!selected.type.includes('image')) {
      dispatch(
        OPEN_MESSAGE({
          type: 'error',
          text: 'Not a Image.Please Select an Image',
        })
      )
      return
    }

    //to check user selected the file
    // if (!selected) {
    //   dispatch(
    //     OPEN_MESSAGE({
    //       type: 'error',
    //       text: 'Select an Image',
    //     })
    //   )
    //   return
    // }

    //size
    if (selected.size > 100000) {
      dispatch(
        OPEN_MESSAGE({
          type: 'error',
          text: 'Image size should be less than 100kb.',
        })
      )

      return
    }

    // resetting error if correct
    setThumbnail(selected)
    return thumbnail
  }

  return { handleImage, thumbnail }
}

export default useHandleImage
