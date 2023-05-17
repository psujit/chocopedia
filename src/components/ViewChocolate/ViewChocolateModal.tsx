import React, { FormEvent, useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { Chocolate, editChocolate } from '../../types/chocolate.ts'
import { Header } from '../Header.tsx'
import { PieChart } from './PieChart.tsx'
import { StatusMessage } from '../StatusMessage.tsx'

interface ViewChocolateModalProps {
  chocolate: Chocolate
  chocolateList: Chocolate[]
  closeModal: () => void
  error: boolean
  message: string
  modalOpen: boolean
  setChocolateList: (chocolateList: Chocolate[]) => void
  setError: (error: boolean) => void
  setMessage: (message: string) => void
  setShouldShowMessage: (shouldShowMessage: boolean) => void
  shouldShowMessage: boolean
}

export const ViewChocolateModal: React.FunctionComponent<
  ViewChocolateModalProps
> = (props) => {
  const {
    chocolate,
    chocolateList,
    closeModal,
    error,
    message,
    modalOpen,
    setChocolateList,
    setError,
    setMessage,
    setShouldShowMessage,
    shouldShowMessage,
  } = props
  const [name, setName] = useState<string>(chocolate.name)
  const [brand, setBrand] = useState<string>(chocolate.brand)

  useEffect(() => {
    setName(chocolate.name)
    setBrand(chocolate.brand)
  }, [chocolate])

  if (!modalOpen) {
    return null
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name !== chocolate.name || brand !== chocolate.brand) {
      const data = {
        ...chocolate,
        name,
        brand,
      }

      try {
        editChocolate(`/api/chocolates/${chocolate.id}`, data)
        setMessage('Chocolate details edited')
        setShouldShowMessage(true)
        setError(false)
      } catch (e) {
        setMessage('Editing chocolate details Failed')
        setShouldShowMessage(true)
        setError(true)
      } finally {
        if (!error) {
          const index = chocolateList.findIndex(
            (chocolateFromList) => chocolateFromList.id === chocolate.id,
          )
          const chocolateListCopy = [...chocolateList]
          chocolateListCopy[index] = data
          setChocolateList(chocolateListCopy)
          setTimeout(() => setShouldShowMessage(false), 3000)
          closeModal()
        }
      }
    } else {
      setShouldShowMessage(true)
      setMessage('Please edit name or brand to save')
      setError(true)
    }
  }

  const handleReset = () => {
    setShouldShowMessage(false)
    closeModal()
  }

  return ReactDom.createPortal(
    <div className="bg-gray-500 bg-opacity-70 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white px-10 py-4 rounded-3xl w-7/12 h-screen overflow-scroll">
        <div className="-mt-2 mb-8 text-3xl font-bold mx-auto">
          <Header headerText={`${chocolate.name} Details`} />
          <StatusMessage
            error={error}
            shouldShowMessage={shouldShowMessage}
            message={message}
          />
          <form
            className="mt-6 flex items-center justify-center flex-col"
            onSubmit={handleSubmit}
          >
            <div className="mb-2 w-1/3">
              <label
                htmlFor="Name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                className="block w-10/12 pl-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setName(e.target.value)}
                value={name || ''}
                maxLength={32}
                placeholder="Name"
              />
            </div>
            <div className="mb-2 w-1/3">
              <label
                htmlFor="Brand"
                className="block text-sm font-semibold text-gray-800"
              >
                Brand
              </label>
              <input
                type="text"
                className="block w-10/12 pl-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setBrand(e.target.value)}
                value={brand || ''}
                maxLength={32}
                placeholder="Brand"
              />
            </div>
            <div
              className={`${
                chocolate.prices.length ? 'mr-40' : 'mr-10'
              } text-sm mt-2 mb-2`}
            >
              {chocolate.prices.length
                ? 'Available at:'
                : 'Currently unavailable at any shop'}
            </div>
            <ul className="list-disc text-sm">
              {chocolate.prices.map((price) => {
                return (
                  <li key={price.link} className="mb-2 list-item">
                    <div className="text-lg">{price.shop}</div>
                    <label className="text-base">
                      {price.amount}
                      {price.unit} for {price.price} {chocolate.currency}
                    </label>
                    <a
                      href={price.link}
                      className="text-blue-600 px-1 text-base"
                      target="_blank"
                    >
                      Visit Shop
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6">
              <button
                type="submit"
                className="w-half text-base px-2 py-1 mx-2 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save
              </button>
              <button
                type="reset"
                className="w-half text-base px-2 py-1 mx-2 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleReset}
              >
                Cancel
              </button>
            </div>
          </form>
          <PieChart nutrition={chocolate.nutrition} />
        </div>
      </div>
    </div>,
    document.getElementById('modal')!,
  )
}
