import React from 'react'
import HomePage from './HomePage'

export default function SwitchToView() {
    const [viewChords, setViewChords] = React.useState<boolean | null>();
    if (viewChords === true) {
        
    }
  return (
    <>
        <HomePage/>
    </>
  )
}
