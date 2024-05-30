import { useSelector } from 'react-redux';
import './App.css';
import { correctWordsSelector, timeSelector } from './redux/wordsSlice';
import { useEffect } from 'react';
import { saveResult } from './utils/actions';
import Navbar from './components/Navbar';
import Textarea from './components/Textarea';
import Input from './components/Input';
import Result from './components/Result';

function App() {

    const time = useSelector((state)=> timeSelector(state))
    const correctWords = useSelector((state)=> correctWordsSelector(state))

    useEffect(()=> {
      if(time > 0) return
      saveResult(correctWords.length)
    }, [time,correctWords.length])


  return (
    <div className="App">
       <Navbar/>
      <Textarea/>
      <Input/>
      <Result/>
    </div>
  );
}

export default App;
