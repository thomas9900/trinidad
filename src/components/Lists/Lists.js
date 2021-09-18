import React, { useState, useMemo } from 'react'
import './Lists.css'
import Pagination from '../Pagination/Pagination'

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config)

    const sortedItems = useMemo(() => {
        let sortableItems = [...items]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'descending' ? -1 : 1
                }
                return 0
            })
        }
        return sortableItems
        
    }, [items, sortConfig])

    const requestSort = (key) => {
        let direction = 'ascending'
        
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending'
        }

        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'descending'
        ) {
            direction = 'default'
        }
        
        setSortConfig({ key, direction })
        
    }

    return { items: sortedItems, requestSort, sortConfig }
}

const Lists = ({ list }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [listItemsPerPage] = useState(10)
    const [activePerson, setActivePerson] = useState()

    const { items, requestSort, sortConfig } = useSortableData(list)
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    const indexOfLastListItem = currentPage * listItemsPerPage
    const indexOfFirstListItem = indexOfLastListItem - listItemsPerPage
    let currentList = items.slice(indexOfFirstListItem, indexOfLastListItem)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const togglePersonInfo = (person) => {
        (activePerson === person) ? setActivePerson(!person) : setActivePerson(person)
    }

    return (
        <div>
            <h1 className='list__header'>NIMEKIRI</h1>
            <table className='list'>
                <thead>
                    <tr>
                        <th 
                            onClick={() => requestSort('firstname')}
                            className={getClassNamesFor('firstname')}
                        >
                            EESNIMI
                        </th>
                        <th 
                            onClick={() => requestSort('surname')}
                            className={getClassNamesFor('surname')}
                        >
                            PEREKONNANIMI
                        </th>
                        <th
                            onClick={() => requestSort('sex')}
                            className={getClassNamesFor('sex')}
                        >
                            SUGU 
                        </th>
                        <th
                            onClick={() => requestSort('date')}
                            className={getClassNamesFor('date')}
                        >
                            SÜNNIKUUPÄEV 
                        </th>
                        <th 
                            onClick={() => requestSort('phone')}
                            className={getClassNamesFor('phone')}
                        >
                            TELEFON 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentList.map(person => (
                        <React.Fragment key={person.id}>
                            <tr className={person === activePerson ? 'list__tr selected' : 'list__tr'} onClick={() => togglePersonInfo(person)}>
                                <td>{person.firstname}</td>
                                <td>{person.surname}</td>
                                <td>{(person.sex === 'f') ? 'Naine' : 'Mees'}</td>
                                <td>{person.date}</td>
                                <td>{person.phone}</td>
                            </tr>
                            
                            {person === activePerson ?
                            <tr>
                                <td>
                                    <img src={person.image.medium} className='list__img' alt='img' />
                                </td>     
                                <td className='list__selectedInfo' colSpan='4'>
                                    <div dangerouslySetInnerHTML={{ __html: (person.intro.substring(0, 400) + '...') }} />
                                </td>
                            </tr>
                            : null}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <Pagination 
                listItemsPerPage={listItemsPerPage}
                totalListItems={list.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}

export default Lists