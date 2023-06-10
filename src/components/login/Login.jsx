import { useState } from 'react'
import styled from 'styled-components'
import { Divider } from '../../components'
import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [anotherError, setAnotherError] = useState(null)
  const { login, isPending, error } = useLogin()

  const loginHandler = e => {
    e.preventDefault()
    if (email === '') setAnotherError('Missing Email.')
    else if (password === '') setAnotherError('Missing Password.')
    else {
      setAnotherError(false)
      login(email, password)
    }
  }

  return (
    <>
      <Divider />
      <Wrapper className='login-section container  mtb-l'>
        <form className='form-container w-30 m-auto'>
          <h2 className='secondary-heading login'>Login</h2>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Password : </span>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            className='btn w-100'
            onClick={e => loginHandler(e)}
            disabled={isPending}
          >
            {isPending ? <div className='lds-dual-ring'></div> : 'Login In'}
          </button>
          <p className='mtb-m text-center register-container'>
            Don't have an account ?{' '}
            <Link to='/register'>
              <span className='c-main'>Register</span>
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  )
}

export default Login

const Wrapper = styled.section`
  .form-container {
    .login {
      margin-bottom: 3.2rem;
    }
    .register-container {
      margin: 2.5rem 0;
    }
  }
`
