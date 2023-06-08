import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { prev_arrow, next_arrow } from '../../assets/icons'
import { useSingleDocument } from '../../hooks/useSingleDocument'
import {
  AddToCart,
  Description,
  ProductImages,
  Divider,
  SkeletonProductDetails,
} from '../../components'
import Popular from '../../components/T-shirt/Popular'

const Product = () => {
  const { data: res, saleData: saleRes } = useSelector(state => state.popular)
  const { id, type } = useParams()
  const result = type === 'popular' ? res : saleRes
  const matchedId = result.findIndex(item => item.id === id)
  const [currentId, setCurrentId] = useState(matchedId)
  const [isSelectedColor, setIsSelectedColor] = useState(null)

  const { fetchSingleDocument, data, success, isLoading } =
    useSingleDocument('clothes')
  const {
    category,
    description,
    price,
    images,
    productDetails,
    thumbnailPhoto,
  } = data

  useEffect(() => {
    try {
      fetchSingleDocument(result[currentId].id)
    } catch (error) {
      fetchSingleDocument(id)
    }
  }, [currentId])

  const nextProductHandler = () => {
    let newIndex = currentId + 1
    if (newIndex >= result.length) {
      setCurrentId(0)
    } else {
      setCurrentId(newIndex)
    }
  }

  const prevProductHandler = () => {
    let newIndex = currentId - 1
    if (newIndex < 0) {
      setCurrentId(result.length - 1)
    } else {
      setCurrentId(newIndex)
    }
  }

  return (
    <>
      <Divider />
      <Wrapper className='container-xsw mtb-l'>
        <div className='product-container grid-2-col'>
          {isLoading ? (
            <>
              <SkeletonProductDetails side='image' />
              <SkeletonProductDetails side='text' />
            </>
          ) : (
            success && (
              <>
                <ProductImages
                  images={images}
                  productDetails={productDetails}
                  thumbnail={thumbnailPhoto}
                  isSelectedColor={isSelectedColor}
                />

                <div className='text-container'>
                  <div className='next-arrow-category-container'>
                    <div className='sub-heading'>{category}</div>
                    <div className='next-prev-btn-container'>
                      <button className='mr-s arrow-btn c-pointer'>
                        <img
                          src={prev_arrow}
                          alt='prev-btn'
                          onClick={() => prevProductHandler()}
                        />
                      </button>

                      <button className='arrow-btn c-pointer'>
                        <img
                          src={next_arrow}
                          alt='next-btn'
                          onClick={() => nextProductHandler()}
                        />
                      </button>
                    </div>
                  </div>
                  <h3 className='secondary-heading mb-m'>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </h3>
                  <h3 className='tertiary-heading mb-s'>${price}.00</h3>

                  <AddToCart
                    product={{ ...data, id }}
                    setIsSelectedColor={setIsSelectedColor}
                    isSelectedColor={isSelectedColor}
                  />

                  <Description desc={description} id={id} />
                </div>
              </>
            )
          )}
        </div>
      </Wrapper>
      {/* <Popular type='Related Products' /> */}
    </>
  )
}

export default Product

export const Wrapper = styled.section`
  .product-container {
    gap: 4rem;
    .next-arrow-category-container {
      margin-right: 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .arrow-btn {
        background-color: transparent;
        border: 1px solid rgba(0, 0, 0, 0.14);
        padding: 0.2rem;

        img {
          width: 1.5rem;
        }
      }
    }
  }
`
