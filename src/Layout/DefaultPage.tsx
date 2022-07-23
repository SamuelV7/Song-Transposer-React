import React from 'react'
import Footnote from '../components/Footnote'
import NavBar from '../components/NavBar'


export default function DefaultPage(props : {children: | React.ReactNode | null | undefined}) {
  return (
    <>
        <NavBar />
          {props.children}
    </>
  )
}
