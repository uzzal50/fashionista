import styled from 'styled-components'
import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
let count = 0

const AddProducts = () => {
  const { addDocumentNew } = useFirestore('clothes')
  const form = useForm({
    defaultValues: {
      name: '',
      price: null,
      category: '',
      description: '',
      thumbnail: null,
      type: '',
      product: [{ color: '', image: null, inStock: 1 }],
    },
  })
  const { control, register, formState, handleSubmit, reset } = form
  const { errors, isSubmitting, isSubmitSuccessful } = formState
  const { fields, append, remove } = useFieldArray({
    name: 'product',
    control,
  })

  const onSubmit = data => {
    console.log('Data', data)
    const { product } = data
    product.forEach((item, index) => {
      item.image = item.image[0]
    })

    addDocumentNew(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) reset()
  }, [isSubmitSuccessful])
  console.log(isSubmitting, isSubmitSuccessful)
  return (
    <Wrapper className='w-80 m-auto'>
      <p>Render - {count}</p>
      <div className='form-container'>
        <h2 className='secondary-heading'>Add New Clothes</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control'>
            <label>
              <span>Name : </span>
              <input
                type='text'
                {...register('name', {
                  required: 'Name is Required',
                })}
              />
              <p className='error-text'>{errors.name?.message} </p>
            </label>
          </div>
          <div className='form-control'>
            <label>
              <span>Price : </span>
              <input
                type='number'
                {...register('price', {
                  valueAsNumber: true,
                  required: 'Price is Required',
                })}
              />
              <p className='error-text'>{errors.price?.message} </p>
            </label>
          </div>
          <div className='form-control'>
            <label>
              <span>Category : </span>
              <select
                type='text'
                {...register('category', {
                  required: 'category is Required',
                })}
              >
                <option value=''>Select</option>
                <option value='men'>Men</option>
                <option value='women'>Women</option>
              </select>

              <p className='error-text'>{errors.category?.message} </p>
            </label>
          </div>
          <div className='form-control'>
            <label>
              <span>Description : </span>
              <input
                type='text'
                {...register('description', {
                  required: 'Description is Required',
                })}
              />
              <p className='error-text'>{errors.description?.message} </p>
            </label>
          </div>
          <div className='form-control'>
            <label>
              <span>Thumbnail:</span>
              <input
                type='file'
                {...register('thumbnail', {
                  required: 'Thumbnail field is Missing',
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
              <p className='error-text'>{errors.thumbnail?.message}</p>
            </label>
          </div>
          <div className='form-control'>
            <label>
              <span>Type : </span>

              <select
                type='text'
                {...register('type', {
                  required: 'type is Required',
                })}
              >
                <option value=''>Select</option>
                <option value='popular'>Popular</option>
                <option value='sale'>sale</option>
              </select>
              <p className='error-text'>{errors.type?.message} </p>
            </label>
          </div>{' '}
          <div className='form-group'>
            <label htmlFor='product'>
              <span>Product Details</span>
            </label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div
                    className='form-control d-flex j-space-between a-center mb-m'
                    key={field.id}
                  >
                    <label htmlFor='' className='m-0'>
                      <span>Color:</span>
                      <select
                        {...register(`product.${index}.color`, {
                          required: 'color field is Missing',
                        })}
                      >
                        <option value=''>--Select Color--</option>
                        <option value='black'>Black</option>
                        <option value='white'>White</option>
                        <option value='orange'>Orange</option>
                      </select>

                      <p className='error'>
                        {errors.product?.[index]?.color?.message}
                      </p>
                    </label>

                    <label htmlFor='' className='m-0'>
                      <span>Image : </span>
                      <input
                        type='file'
                        {...register(`product.${index}.image`, {
                          required: 'Image field is Missing',
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
                      <p className='error'>
                        {errors.product?.[index]?.image?.message}
                      </p>
                    </label>

                    <label className='m-0'>
                      <span>In Stock: </span>
                      <input
                        type='number'
                        {...register(`product.${index}.inStock`, {
                          valueAsNumber: true,
                          required: 'inStock is Mandatory.',
                        })}
                      />
                      <p className='error'>
                        {errors.product?.[index]?.inStock.message}
                      </p>
                    </label>

                    {index > 0 && (
                      <button
                        className='btn-simple c-pointer error-text'
                        type='button'
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )
              })}

              <button
                type='button'
                onClick={() =>
                  append({
                    color: '',
                    image: null,

                    inStock: 1,
                  })
                }
                className='btn-simple mb-m c-pointer'
              >
                + Add More
              </button>
            </div>
          </div>
          <button type='submit' className='btn' disabled={isSubmitting}>
            {isSubmitting ? <div className='lds-dual-ring'></div> : 'Submit'}
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

export default AddProducts

const Wrapper = styled.section`
  .form-container {
  }
`
