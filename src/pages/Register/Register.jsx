import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Divider } from '../../components'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [anotherError, setAnotherError] = useState(null)
  const { signUp, isPending, success, error } = useSignup()

  const navigate = useNavigate()

  const handleImage = e => {
    setThumbnail(null)

    let selected = e.target.files[0]

    //to check image file
    if (!selected.type.includes('image')) {
      console.log('Selected File must be a image', 'error')
      return
    }

    //to check user selected the file
    if (!selected) {
      console.log('Please select a file', 'error')
      return
    }

    //size
    if (selected.size > 100000) {
      console.log('Image size should be less than 100kb', 'error')
      return
    }

    // resetting error if correct
    setThumbnail(selected)
  }

  const handleRegister = e => {
    e.preventDefault()

    if (!email || !password) {
      setAnotherError('There are Missing Fields.')
      return
    }
    if (password != cpassword) {
      setAnotherError('Passwords do not Match.')
      return
    }

    console.log(email, password, name, thumbnail)
    e.target.disabled = true
    signUp(email, password, name, thumbnail)
  }

  useEffect(() => {
    if (success) {
      setEmail('')
      setPassword('')
      setCpassword('')
      setName('')
      setThumbnail(null)
      navigate('/')
    }
  }, [success])

  return (
    <>
      <Divider />

      <Wrapper className='register-section container  mtb-l'>
        <form className='form-container w-30 m-auto'>
          <h2 className='secondary-heading '>Register</h2>
          {(anotherError || error) && (
            <div className='message error-message'>
              <p>{anotherError ? anotherError : error ? error : null}</p>
            </div>
          )}
          <label>
            <span>Email : </span>
            <input
              type='text'
              name='email'
              id='email'
              onChange={e => {
                setEmail(e.target.value)
              }}
              value={email}
              required
            />
          </label>
          <label>
            <span>Display Name: </span>
            <input
              type='text'
              name='name'
              id='name'
              onChange={e => {
                setName(e.target.value)
              }}
              value={name}
              required
            />
          </label>
          <label>
            <span>Password : </span>
            <input
              required
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirm Password : </span>
            <input
              required
              type='password'
              name='cpassword'
              id='cpassword'
              value={cpassword}
              onChange={e => setCpassword(e.target.value)}
            />
          </label>
          <label>
            <span>Upload Image: </span>
            <input
              required
              type='file'
              name='thumbnail'
              id='thumbnail'
              onChange={handleImage}
            />
          </label>

          <button
            className='btn w-100'
            onClick={e => handleRegister(e)}
            disabled={isPending}
          >
            {isPending ? <div className='lds-dual-ring'></div> : 'Register'}
          </button>
        </form>
      </Wrapper>
    </>
  )
}

export default Register

const Wrapper = styled.section`
  .form-container {
    box-shadow: var(--box-shadow);
  }
`
