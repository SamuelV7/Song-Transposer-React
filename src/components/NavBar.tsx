import React from 'react'
import NavItem from './NavItem'
export default function NavBar() {
  // const [navBarOpen, setNavBarOpen] = React.useState(false)
  return (
    <nav className="bg-slate-900 shadow-lg ">
      <div className="container mx-auto">
        <div className="sm:flex justify-start">
          <NavItem link='/' name='Home'/>
          <NavItem link='/Songs' name='Songs' />
          <NavItem link='/Upload' name='Upload' />
          <NavItem link="/LyricsChord" name='Lyrics'/>
        </div> 
      </div>
    </nav>
  )
}