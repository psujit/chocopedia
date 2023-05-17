import React, { useState } from 'react'
import { Chocolate, PriceDetails } from '../../types/chocolate.ts'
import { ViewChocolateModal } from '../ViewChocolate/ViewChocolateModal.tsx'

interface TableProps {
  chocolateList: Chocolate[]
  error: boolean
  message: string
  setChocolateList: (chocolateList: Chocolate[]) => void
  setError: (error: boolean) => void
  setMessage: (message: string) => void
  setShouldShowMessage: (shouldShowMessage: boolean) => void
  shouldShowMessage: boolean
}

export const Table: React.FunctionComponent<TableProps> = (props) => {
  const {
    chocolateList,
    error,
    message,
    setChocolateList,
    setError,
    setMessage,
    setShouldShowMessage,
    shouldShowMessage,
  } = props

  const [selectedChocolate, setSelectedChocolate] = useState<Chocolate>(
    {} as Chocolate,
  )
  const [viewChocolateModalOpen, setViewChocolateModalOpen] =
    useState<boolean>(false)

  const closeViewChocolateModal = () => {
    setViewChocolateModalOpen(false)
  }

  const getPricePerHundredGram = (price: PriceDetails) =>
    price.unit === 'g'
      ? price.price / price.amount
      : price.price / (price.amount * 1000)

  const onClickHandler = async (e: React.MouseEvent<HTMLTableRowElement>) => {
    const selectedChocolate =
      chocolateList.find(
        (chocolate) => chocolate.id === (e.target as HTMLTableRowElement).id,
      ) || ({} as Chocolate)
    await setSelectedChocolate(selectedChocolate)
    setViewChocolateModalOpen(true)
  }

  return (
    <div className="p-1.5 w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Brand
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Lowest Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Average Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Link to cheapest shop
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chocolateList.map((chocolate) => {
              const pricesPerHundredGram = chocolate.prices.map((price) =>
                getPricePerHundredGram(price),
              )
              const lowestPrice =
                chocolate.prices.length && Math.min(...pricesPerHundredGram)
              const linkToCheapestShop = chocolate.prices.length
                ? chocolate.prices.find(
                    (price) => getPricePerHundredGram(price) === lowestPrice,
                  )?.link
                : ''
              const averagePrice: number =
                pricesPerHundredGram.length &&
                pricesPerHundredGram.reduce(
                  (previousPrice, currentPrice) => previousPrice + currentPrice,
                ) / pricesPerHundredGram.length
              return (
                <tr
                  role="button"
                  key={chocolate.id}
                  id={chocolate.id}
                  onClick={onClickHandler}
                >
                  <td
                    id={chocolate.id}
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {chocolate.name}
                  </td>
                  <td
                    id={chocolate.id}
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {chocolate.brand}
                  </td>
                  <td
                    id={chocolate.id}
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {lowestPrice ? `${lowestPrice.toFixed(3)} ${chocolate.currency}` : 'No Price found'}
                  </td>
                  {
                    <td
                      id={chocolate.id}
                      className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                    >
                      {averagePrice
                        ? `${averagePrice.toFixed(3)} ${chocolate.currency}`
                        : 'No Price found'}
                    </td>
                  }
                  <td
                    id={chocolate.id}
                    className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap"
                  >
                    <a href={linkToCheapestShop} target="_blank">
                      {linkToCheapestShop}
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <ViewChocolateModal
          chocolate={selectedChocolate}
          chocolateList={chocolateList}
          closeModal={closeViewChocolateModal}
          error={error}
          message={message}
          modalOpen={viewChocolateModalOpen}
          setChocolateList={setChocolateList}
          setError={setError}
          setMessage={setMessage}
          setShouldShowMessage={setShouldShowMessage}
          shouldShowMessage={shouldShowMessage}
        />
      </div>
    </div>
  )
}
