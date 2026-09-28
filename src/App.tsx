import React, { useState } from 'react';
import './App.css'

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState<
    { id: string; question: string; answer: string; isFlipped: boolean }[]
  >([]);
  const [mode, setMode] = useState<"main" | "study">("main");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!question.trim() || !answer.trim()) return;

    const newCard = {
      id: crypto.randomUUID(),
      question,
      answer,
      isFlipped: false,
    };

    setFlashcards([...flashcards, newCard]);
    setQuestion("");
    setAnswer("");
  }

  const flipCard = (id:string) => {
    setFlashcards(flashcards.map(card => card.id === id ? {...card, isFlipped: !card.isFlipped} : card));
  }


  return (
    <>
      <h1>Simply Flashcards</h1>
      {mode === "main" && (
        <>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="">Question:</label>
              <input 
                value={question} 
                onChange={e => setQuestion(e.target.value)}/><br />

              <label htmlFor="">Answer:</label>
              <input 
                value={answer}
                onChange={e => setAnswer(e.target.value)} /><br />

              <button type="submit">Add Flashcard</button>
              <button onClick={() => setMode("study")}>Study Mode</button>
            </form>
          </div>
          <div className="cards">
              { flashcards.length === 0 ? (<span>No cards yet</span>): (flashcards.map(card => (
                <div 
                  key={card.id} 
                  className="card"
                  onClick={() => flipCard(card.id)}
                  >
                    <p>{card.isFlipped ? card.answer : card.question}</p>
                </div>
              )))}
          </div>
        </>
      )}

      {mode === "study" && (
        <>
          <h2>Study Mode</h2>
          <button onClick={() => setMode("main")}>Back</button>
        </>
      )}
    </>
      
  )
}

export default App
