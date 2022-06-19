import React,{useEffect, useState,useRef} from 'react'
import FlashCardList from './components/FlashCardList/FlashCardList';
import './App.css';
import axios from 'axios'
import QuizGeneratorForm from './components/QuizGeneratorForm/QuizGeneratorForm';


function App() {

  //FlashCard State
  const [flashcards, setFlashCards] = useState([]);
  //Category State
  const [categories, setCategories] = useState([]);

  //Category Element to get Category Value (QuizGeneratorForm Component)
  const categoryEl = useRef()
  //Amount Element to get Category Value (QuizGeneratorForm Component)
  const amountEl = useRef()
  

  //Getting Category List from Api
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories);
      })
  },[])


  //Converting HTML Symbol to String
  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value
  };
  
  //Generating Quiz FlashCard
  function handleSubmit(e) {
    e.preventDefault();

    //Requesting Data from Api
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        //setting Question Array
        setFlashCards(res.data.results.map((questionItem, index) => {
          //Answer
          const answer = decodeString(questionItem.correct_answer);
          //Incorrect + Correct Answer Randomly Sorted
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5)
          }
        })
        )
      });
  }


  return (
    <>
      {/*Navbar Component (Quiz Generator) */}
      <QuizGeneratorForm
        categories={categories}
        handleSubmit={handleSubmit}
        amountEl={amountEl}
        categoryEl={categoryEl}
      />

      {/* FlashCard List */}
      <div className='container'>
      <FlashCardList flashcards = {flashcards} />
      </div>

    </>
  );
}

export default App;
