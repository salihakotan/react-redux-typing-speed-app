import React from 'react'
import { useSelector } from 'react-redux'
import { wordsSelector } from '../redux/wordsSlice'
import Word from './Word'

function Textarea() {

    const wordList = useSelector((state)=> wordsSelector(state))


  return (
    <div className='textarea'>
    <div className="textarea__inner">
        {wordList.map((word,index) => (
            <Word word={word} index={index} key={index}/>
        ))}
    </div>
    </div>
  )
}

export default Textarea