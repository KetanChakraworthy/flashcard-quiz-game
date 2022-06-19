import React from 'react'
import FlashCard from '../FlashCard/FlashCard'

export default function FlashCardList({ flashcards }) {
    
  return (
      <div className='card-grid'>
          {/* Rendering FlashCard Component from FlashCards Array */}
          {flashcards.map(flashcard => {
              return <FlashCard flashcard={flashcard} key={flashcard.id} />
              
          } )}
      </div>
  )
}
