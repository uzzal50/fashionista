import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { edit, trash } from '../../assets/icons'
import { ModalBox } from './'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import Pagination from '../pagination/Pagination'

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [term, setTerm] = useState('')
  const { response, dispatch } = useCollection('T-shirts')
  const data = response.sorted_products
  const { deleteDocument } = useFirestore('T-shirts')

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
      <div className='w-50 d-flex mb-s'>
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
            <th>In Stock</th>
            <th>Colors</th>
            <th>Images</th>
            <th>Type</th>
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
                inStock,
                colors,
                images,
                type,
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
                    <p> {inStock} </p>
                  </td>
                  <td>
                    {colors.map(col => {
                      return (
                        <span key={col.value} className='mr-s'>
                          {col.value}
                        </span>
                      )
                    })}
                  </td>
                  <td>
                    {images.map((img, index) => (
                      <img src={img} key={index} />
                    ))}
                  </td>
                  <td>
                    <p>{type}</p>
                  </td>
                  <td>
                    <Link to={`/admin/add-product/${id}`}>
                      <img src={edit} alt='' className='mr-s icon' />
                    </Link>

                    {isModalOpen && (
                      <ModalBox
                        deleteDocument={deleteDocument}
                        id={id}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                      />
                    )}
                    <img
                      src={trash}
                      alt=''
                      className='icon trash'
                      onClick={() => deleteDocument(id)}
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
      img {
        width: 4rem;
      }
      .icon {
        width: 2rem;
      }
    }
  }
`
