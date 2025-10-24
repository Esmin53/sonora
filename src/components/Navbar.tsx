import React from 'react'
import { FaSun } from 'react-icons/fa6'

interface NavbarProps {
    setTheme: (theme: string) => void
    theme: string
}

const Navbar = ({setTheme, theme}: NavbarProps) => {
  
    return (
        <div className='dark:bg-background-dark bg-background-light w-full flex items-center justify-center'>
            <div className=' w-full h-12 flex p-2 items-center justify-between max-w-7xl'>
                <h1 className='text-4xl font-bold dark:text-accent-dark text-accent-light'>Logo</h1>
                <FaSun className='w-7 h-7 dark:text-accent-dark text-accent-light cursor-pointer' onClick={() => setTheme(theme == "dark" ? "" : "dark" )}/>
            </div>
        </div>
  )
}

export default Navbar