import React from 'react'
import { useDispatch } from 'react-redux'
import { replay } from '../redux/wordsSlice'
import Timer from './Timer'
import { MdReplay } from "react-icons/md";


function Navbar() {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(replay())
    }


  return (
    <div className='navbar'>
        <Timer/>
        <div className="navbar__content">
            <h1 className="title">Typing Speed App</h1>
            <div className="replay">
                <button onClick={handleClick}><MdReplay/></button>
            </div>
        </div>
    </div>
  )
}

export default Navbar