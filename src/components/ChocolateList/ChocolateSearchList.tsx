import React, { useEffect, useState } from 'react'
import { Search } from './Search.tsx'
import { Table } from './Table.tsx'
import { NoResultsFound } from './NoResultsFound.tsx'
import { Chocolate } from '../../types/chocolate.ts'
import { StatusMessage } from '../StatusMessage.tsx'

interface ChocolateSearchListProps {
  chocolateList: Chocolate[]
  setChocolateList: (chocolateList: Chocolate[]) => void
}
export const ChocolateSearchList: React.FunctionComponent<
  ChocolateSearchListProps
> = (props) => {
  const { chocolateList, setChocolateList } = props
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Chocolate[]>([])
  const [chocolateListToDisplay, setChocolateListToDisplay] = useState<
    Chocolate[]
  >([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState<boolean>(false)
  const [shouldShowMessage, setShouldShowMessage] = useState<boolean>(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase()
    if (searchText === '') {
      setShowSearchResults(false)
      setSearchResults(chocolateList)
    } else {
      setShowSearchResults(true)
      const searchResults = chocolateList.filter((chocolate) => {
        return Object.values(chocolate).join().toLowerCase().includes(searchText)
      })
      setSearchResults(searchResults)
    }
  }

  useEffect(() => {
    if (showSearchResults) {
      setChocolateListToDisplay(searchResults)
    } else {
      setChocolateListToDisplay(chocolateList)
    }
  }, [showSearchResults, chocolateList, searchResults])
  return (
    <>
      <StatusMessage
        error={error}
        shouldShowMessage={shouldShowMessage}
        message={message}
      />
      <Search handleChange={handleChange} />
      {chocolateListToDisplay && chocolateListToDisplay.length > 0 ? (
        <Table
          message={message}
          setMessage={setMessage}
          error={error}
          setError={setError}
          shouldShowMessage={shouldShowMessage}
          setShouldShowMessage={setShouldShowMessage}
          chocolateList={chocolateListToDisplay}
          setChocolateList={setChocolateList}
        />
      ) : (
        <NoResultsFound showSearchResults={showSearchResults} />
      )}
    </>
  )
}
