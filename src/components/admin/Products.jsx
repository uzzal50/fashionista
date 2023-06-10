import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { edit, trash } from '../../assets/icons'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import Pagination from '../pagination/Pagination'

const Products = () => {
  const [term, setTerm] = useState('')
  const { response, dispatch } = useCollection('clothes')
  const data = response.sorted_products
  const { deleteDocument } = useFirestore('clothes')
  console.log(data)

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(4)

  //get current Products

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(() => {
    dispatch({ type: 'SEARCH_TERM', payload: term })
  }, [term])

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
          {data &&
            currentProducts.map(item => {
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
        totalProducts={data.length}
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
