import React, { useState, useEffect } from 'react'
import './Pagination.css'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const Pagination = ({ listItemsPerPage, totalListItems, paginate, currentPage }) => {
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1)
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalListItems / listItemsPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        if (pageNumbers) {
            if (currentPage > 2 && currentPage < (pageNumbers.length - 1)) {
                setmaxPageNumberLimit(currentPage + 2)
                setminPageNumberLimit(currentPage - 2)
            } else if (currentPage === (pageNumbers.length - 1)) {
                setmaxPageNumberLimit(currentPage + 1)
                setminPageNumberLimit(currentPage - 3)
            } else if (currentPage === 2) {
                setmaxPageNumberLimit(currentPage + 3)
                setminPageNumberLimit(currentPage - 1)
            }
        }
    }, [currentPage])

    const renderPageNumbers = pageNumbers.map((number) => {
        if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
            return (
                <li
                    className={currentPage === number ? 'active' : null}
                    key={number}
                    onClick={() => paginate(number)}
                >
                    {number}
                </li>
            )
        } else {
            return null
        }
    })

    return (
        <nav>
            <ul className='pagination'>
                <IconButton 
                    className='pagination__btn'
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1 ? true : false}
                >
                    <KeyboardArrowLeftIcon className='pagination__arrow'/>
                </IconButton>
                {renderPageNumbers}
                <IconButton 
                    className='pagination__btn'
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage >= pageNumbers.length ? true : false}
                >
                    <KeyboardArrowRightIcon className='pagination__arrow'/>
                </IconButton>
            </ul>
        </nav>
    )
}

export default Pagination