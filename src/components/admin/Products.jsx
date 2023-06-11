import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { edit, trash } from '../../assets/icons'
import { useFirestore } from '../../hooks/useFirestore'
import Pagination from '../pagination/Pagination'
import { useSelector, useDispatch } from 'react-redux'
import {
  SAVE_ALL_DOUMENTS,
  SORT_DOCUMENTS,
} from '../../redux/Slice/sort/sortSlice'
import { useCollection } from '../../hooks/useCollection'

const Products = () => {
  const dispatch = useDispatch()
  const [term, setTerm] = useState('')
  const { data } = useCollection('clothes')
  const { clonedDocuments } = useSelector(state => state.sort)
  const { deleteDocument } = useFirestore('clothes')

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(4)

  //get current Products

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = clonedDocuments.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  useEffect(() => {
    dispatch(SAVE_ALL_DOUMENTS(data))
    dispatch(SORT_DOCUMENTS(term))
  }, [data, term])

  return (
    <Wrapper>
      <div className='w-100 d-flex mb-s'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search By Name...'
          className='search-input text-center'
          autoFocus
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </div>
      <table className='w-100'>
        <thead className='table-header'>
          <tr className='text-left'>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>ThumnailPhoto</th>
            <th>Color and InStock</th>
            <th>Images</th>
            <th>Type</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.map(item => {
            const {
              id,
              name,
              price,
              category,
              productDetails,
              images,
              type,
              thumbnailPhoto,
              discount,
            } = item

            return (
              <tr key={id}>
                <td>
                  <p>{id}</p>
                </td>
                <td>
                  <p>{name}</p>
                </td>
                <td>
                  <p> {price} </p>
                </td>
                <td>
                  <p> {category} </p>
                </td>
                <td>
                  <p>
                    {' '}
                    <img src={thumbnailPhoto} className='w-4-icon' />{' '}
                  </p>
                </td>
                <td>
                  {productDetails.map((item, index) => {
                    return (
                      <div key={index} className='d-flex gap-1 a-center'>
                        <p>{item.color}</p>-<p>{item.inStock}</p>
                      </div>
                    )
                  })}
                </td>
                <td className='text-left'>
                  {images.map((img, index) => (
                    <img src={img} key={index} className='w-4-icon' />
                  ))}
                </td>
                <td>
                  <p>{type}</p>
                </td>
                <td>{discount ? `-${discount}%` : 'n/a'}</td>
                <td>
                  <Link to={`/admin/add-product/${id}`}>
                    <img src={edit} className='mr-s w-2-icon icon' />
                  </Link>

                  <img
                    src={trash}
                    className='icon trash w-2-icon'
                    onClick={() =>
                      deleteDocument(
                        id,
                        productDetails.map(item => item.color)
                      )
                    }
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={clonedDocuments.length}
      />
    </Wrapper>
  )
}

export default Products

const Wrapper = styled.section`
  table {
    .table-header {
      color: var(--secondary);
      background-color: var(--primary);
    }
    th,
    td {
      padding: 1rem;
    }
  }
`
