import React from 'react'

interface NoResultsFoundProps {
  showSearchResults: boolean
}
export const NoResultsFound: React.FunctionComponent<NoResultsFoundProps> = (
  props,
) => (
  <div className="flex items-center justify-between px-3">
    {props.showSearchResults ? 'No Matching Results Found' : 'No Chocolates Yet'}
  </div>
)
