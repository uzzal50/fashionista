import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFirestore } from '../../hooks/useFirestore'
import Select from 'react-select'
import { optionColors } from '../../utils'
import { useDebounce } from '../../hooks/useDebounce'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
import { useDispatch } from 'react-redux'

let count = 0

const AddProducts = () => {
  const [clothes, setClothes] = useState({
    name: '',
    price: '',
    inStock: '',
    category: '',
    desc: '',
    type: '',
  })
  count++
  const [colors, setColors] = useState(null)
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState(null)
  const { response, addDocument } = useFirestore('T-shirts')
  const dispatch = useDispatch()

  const handleImage = e => {
    setImage(null)

    let selected = e.target.files
    let finalSelected = [...selected]

    finalSelected.forEach(img => {
      //to check image file
      if (!img.type.includes('image')) {
        setImageError('Selected File must be a image')
        return
      }

      //to check user selected the file
      if (!img) {
        setImageError('Please select a file')
        return
      }

      setImageError(null)

      setImage(finalSelected)
    })
  }

  console.log(response)

  const handleInputChange = e => {
    const { name, value } = e.target
    setClothes({ ...clothes, [name]: value }, 5000)
  }

  const handleSubmit = e => {
    e.preventDefault()
    e.target.disabled = true
    addDocument({ ...clothes, image, colors })
  }

  useEffect(() => {
    if (response.success) {
      setClothes({
        name: '',
        price: '',
        inStock: '',
        category: '',
        desc: '',
        type: '',
      })
      setImage(null)
      setColors(null)
      console.log('success added')
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
      dispatch(
        OPEN_MESSAGE({ type: 'success', text: 'Product Added Successfully.' })
      )
    }
  }, [response.success, response.isPending])

  return (
    <Wrapper className='m-auto'>
      cunt-{count}
      <div className='form-container'>
        {' '}
        <h2 className='secondary-heading'>Add New Clothes</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name : </span>
            <input
              required
              type='text'
              name='name'
              id='name'
              value={clothes.name}
              onChange={e => handleInputChange(e)}
            />
          </label>

          <label>
            <span>Price : </span>
            <input
              required
              type='number'
              name='price'
              id='price'
              onChange={e => handleInputChange(e)}
              value={clothes.price}
            />
          </label>
          <label>
            <span>In Stock : </span>
            <input
              required
              type='number'
              name='inStock'
              id='inStock'
              onChange={e => handleInputChange(e)}
              value={clothes.inStock}
            />
          </label>
          <label>
            <span>Category :</span>
            <select
              name='category'
              id='category'
              value={clothes.category}
              onChange={e => handleInputChange(e)}
            >
              <option value=''>Select</option>
              <option value='men'>Men</option>
              <option value='women'>Women</option>
            </select>
          </label>

          <label>
            <span>Colors :</span>
            <Select
              options={optionColors}
              onChange={e => setColors(e)}
              isMulti
            />
          </label>
          <label>
            <span>Image : </span>
            <input type='File' multiple onChange={handleImage} required />
            {imageError && <div className='error'>{imageError}</div>}
          </label>

          <label>
            <span>Description: </span>
            <textarea
              required
              type='text'
              name='desc'
              id='desc'
              onChange={e => handleInputChange(e)}
              value={clothes.desc}
            />
          </label>

          <label htmlFor=''>
            <span>Type :</span>
            <select
              name='type'
              id='type'
              value={clothes.type}
              onChange={e => handleInputChange(e)}
              required
            >
              <option value=''>Select</option>
              <option value='popular'>Popular</option>
              <option value='sale'>sale</option>
            </select>
          </label>

          {response.error && <div className='error'>{response.error}</div>}
          <button className='btn w-100' disabled={response.isPending}>
            {response.isPending ? (
              <div className='lds-dual-ring'></div>
            ) : (
              'Add Clothes'
            )}
          </button>
        </form>
        <div className='lds-dual-ring'></div>
      </div>
    </Wrapper>
  )
}

export default AddProducts

const Wrapper = styled.section`
  .form-container {
    width: 50rem;
    margin--right: auto;
  }
`
