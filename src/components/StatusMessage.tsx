import React from 'react'

interface StatusMessageProps {
  error: boolean
  message: string
  shouldShowMessage: boolean
}
export const StatusMessage: React.FunctionComponent<StatusMessageProps> = (
  props,
) => {
  const { error, message, shouldShowMessage } = props
  return (
    <div
      className={`${
        shouldShowMessage ? (error ? 'bg-red-600' : 'bg-green-600') : 'hidden'
      } flex justify-center mt-8 py-2 text-white`}
    >
      {message}
    </div>
  )
}
