import { useEffect, useState } from 'react'
import { Chocolate, fetchChocolateData } from '../types/chocolate.ts'

export const useFetch = () => {
  const [chocolateList, setChocolateList] = useState<Chocolate[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const chocolate = await fetchChocolateData('api/chocolates')

      setChocolateList(chocolate.data)
    }

    fetchData()
  }, [])
  return {
    chocolateList: chocolateList,
    setChocolateList: setChocolateList,
  }
}
