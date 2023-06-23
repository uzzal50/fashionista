import { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useSignup } from '../../hooks/useSignup'
import { useDispatch } from 'react-redux'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const { signUp, isPending, success, error } = useSignup()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      profileImage: null,
    },
  })

  const { register, formState, control, handleSubmit, watch, reset } = form
  const { errors } = formState

  const onSubmit = data => {
    const { email, password, name, profileImage } = data
    signUp(email, password, name, profileImage)
  }

  useEffect(() => {
    if (success) {
      reset()
      navigate('/')
      dispatch(
        OPEN_MESSAGE({
          type: 'success',
          text: 'Registration Successfull.',
        })
      )
    }
  }, [success])

  return (
    <Wrapper className='register-container text-left'>
      <h3 className='tertiary-heading heading f-l'>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label>
            <span>Email</span>
            <input
              type='text'
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format',
                },
              })}
            />
            <p className='error-text'>{errors.email?.message}</p>
          </label>
        </div>

        <div className='form-control'>
          <label>
            <span>Name</span>
            <input
              type='text'
              {...register('name', {
                required: 'Name is Required',
              })}
            />
            <p className='error-text'>{errors.name?.message}</p>
          </label>
        </div>

        <div className='form-control'>
          <label>
            <span>Password</span>
            <input
              type='password'
              {...register('password', {
                required: 'Password is Required',
              })}
            />
            <p className='error-text'>{errors.password?.message}</p>
          </label>
        </div>

        <div className='form-control'>
          <label>
            <span>Confirm Password</span>
            <input
              type='password'
              {...register('confirmPassword', {
                required: 'Confirm Password is not Mathed.',
                validate: {
                  notMatched: value => {
                    const password = watch('password')
                    return value === password || 'Password do not match.'
                  },
                },
              })}
            />
            <p className='error-text'>{errors.confirmPassword?.message}</p>
          </label>
        </div>
        <div className='form-control mb-m'>
          <label>
            <span>Upload Profile</span>
            <input
              type='file'
              className='b-none p-0'
              {...register('profileImage', {
                required: 'ProfileImage field is Missing',
                validate: {
                  lessThan2MB: value =>
                    value[0]?.size < 200000 ||
                    'File Size should be less than 200kb.',

                  acceptedFormats: files =>
                    ['image/jpeg', 'image/png', 'image/gif'].includes(
                      files[0]?.type
                    ) || 'Only PNG, JPEG e GIF',
                },
              })}
            />
            <p className='error-text'>{errors.profileImage?.message}</p>
          </label>
        </div>
        <div className=' text-end'>
          <button className='btn-sm f-d c-pointer w-100' disabled={isPending}>
            {isPending ? <div className='lds-dual-ring'></div> : 'Register'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default RegisterForm
const Wrapper = styled.div`
  padding: 4.6rem 0;
  .heading {
    font-size: 2.8rem;
  }
  label {
    span {
      margin-bottom: 0.8rem !important;
    }
    input[type='file'] {
      pointer-events: none;
      &::file-selector-button {
        padding: 0.6rem 1rem;
        border-radius: 6px;
        background-color: #8ba1ba;
        border: none;
        font-family: inherit;
        color: #fff;
      }
    }
  }
`
