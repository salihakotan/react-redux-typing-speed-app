import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isStartSelector, timeSelector } from '../redux/wordsSlice'
import { reduceTime } from '../utils/actions'
import {BiTimer} from "react-icons/bi"

function Timer() {

    const time = useSelector((state)=> timeSelector(state))
    const isStart = useSelector(state => isStartSelector(state))
    const startingCondition = isStart && time>0


    useEffect(()=> {
        if(!startingCondition) return

        const interval = setInterval(()=> {
            reduceTime()
        },1000)

        return () => {
            clearInterval(interval)
        }
    },[startingCondition])


  return (
    <div className='navbar__timer'>
        <BiTimer/>
        {time}
    </div>
  )
}

export default Timer