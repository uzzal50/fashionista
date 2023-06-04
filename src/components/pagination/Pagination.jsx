import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = []
  const totalPages = totalProducts / productsPerPage
  //Limit the page Numbers Shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  //paginate
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }

  //Goto Next Page

  const paginateNext = () => {
    setCurrentPage(currentPage + 1)
    //show next set of page numbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }
  //Goto Prev Page

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1)
    if (currentPage - (1 % pageNumberLimit) == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Wrapper>
      <ul className='pagination d-flex a-center'>
        <li
          onClick={paginatePrev}
          className={currentPage === pageNumbers[0] ? 'd-hidden' : null}
        >
          Prev
        </li>
        {pageNumbers.map(num => {
          if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
            return (
              <li
                key={num}
                onClick={() => paginate(num)}
                className={currentPage === num ? 'active' : null}
              >
                {num}
              </li>
            )
          }
        })}
        <li
          onClick={paginateNext}
          className={
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? 'd-hidden'
              : null
          }
        >
          Next
        </li>
        <p>
          <strong className='mr-s'>{`page ${currentPage}`}</strong>
          <span className='mr-s'>of</span>
          <strong>{`${Math.ceil(totalPages)}`}</strong>
        </p>
      </ul>
    </Wrapper>
  )
}

export default Pagination

const Wrapper = styled.section`
  .pagination {
    margin-top: 2rem;
    li {
      padding: 0.6rem 1rem;
      cursor: pointer;
    }
    .active {
      background-color: var(--primary);
      color: var(--secondary);
    }
  }
`
