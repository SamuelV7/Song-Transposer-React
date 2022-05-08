import React from 'react'
import { NavLink } from 'react-router-dom'

export interface Props {
    link : string, 
    name : string
}

export default function NavItem(props : Props) {
    let main = "text-stone-100 text-xl hover:border-2 hover:rounded-xl border-orange-700 p-3"
    let alternate = "text-orange-500 border-2 rounded-lg text-xl hover:border-2 hover:rounded-xl border-orange-700 p-3"
  return (

    <NavLink
        to={props.link}
        className={({ isActive }) => isActive ? alternate : main}>
        {props.name}
    </NavLink>

  )
}
