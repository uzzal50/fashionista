import { useEffect, useState } from 'react'
import styled from 'styled-components'
import prev from '../../assets/icons/prev-arrow.svg'
import next from '../../assets/icons/next-arrow.svg'
import { useParams } from 'react-router-dom'
import { useSingleDocument } from '../../hooks/useSingleDocument'
import {
  AddToCart,
  Description,
  ProductImages,
  Divider,
} from '../../components'
import SkeletonProductDetails from '../../components/skeleton/SkeletonProductDetails'
import { useSelector, useDispatch } from 'react-redux'

const Product = () => {
  const { data: res, saleData: saleRes } = useSelector(state => state.popular)
  const { id, type } = useParams()
  const result = type === 'popular' ? res : saleRes
  const matchedId = result.findIndex(item => item.id === id)
  const [currentId, setCurrentId] = useState(matchedId)

  const dispatch = useDispatch()
  const { fetchSingleDocument, data, success, isLoading } =
    useSingleDocument('T-shirts')

  const { images, category, name, price, desc } = data

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
                <ProductImages images={images} />

                <div className='text-container'>
                  <div className='next-arrow-category-container'>
                    <div className='sub-heading'>{category}</div>
                    <div className='next-prev-btn-container'>
                      <button className='mr-s arrow-btn'>
                        <img
                          src={prev}
                          alt=''
                          onClick={() => prevProductHandler()}
                        />
                      </button>

                      <button className='arrow-btn'>
                        <img
                          src={next}
                          alt=''
                          onClick={() => nextProductHandler()}
                        />
                      </button>
                    </div>
                  </div>
                  <h3 className='secondary-heading mb-m'>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </h3>
                  <h3 className='tertiary-heading mb-s'>${price}.00</h3>

                  <AddToCart product={{ ...data, id }} />

                  <Description desc={desc} id={id} />
                </div>
              </>
            )
          )}
        </div>
      </Wrapper>
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
