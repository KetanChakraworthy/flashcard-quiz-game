import React,{useState, useEffect, useRef} from 'react'

export default function FlashCard({ flashcard }) {
  //Flip Boolean
  const [flip, setFlip] = useState(false);
  //Dynamic Height For FlashCard According Question
  const [height, setHeight] = useState('intial');


  //Front Side of The FlashCard(Question)
  const frontEl = useRef();
  //Back Side of The FlashCard(Answer)
  const backEl = useRef();

  //Setting Height Of FlashCard
  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  //Changing Height According to Question, Answer, Options
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
  
  //Chaning Height According Window
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, []);

  return (
    // Card
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style= {{height: height}}
      onClick={() => setFlip(!flip)}
    >
      {/* Front Side */}
      <div className="front" ref={frontEl} >
        {/* Question */}
        {flashcard.question}
        {/* Options */}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option" key={option}> {option} </div>
          })}
        </div>
      </div>

      {/* Back Side */}
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  )
}
