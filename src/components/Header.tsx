import React from 'react'

interface HeaderProps {
  headerText: string
}

export const Header: React.FunctionComponent<HeaderProps> = (props) => (
  <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
    {props.headerText}
  </h1>
)
