import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  // Ajoutez d'autres questions ici
];

function Quiz() {
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(quizData.length).fill(null)
  );

  const handleAnswerOptionClick = (questionIndex, selectedOption) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedOption;
    setSelectedAnswers(newSelectedAnswers);

    if (quizData[questionIndex].answer === selectedOption) {
      setScore(score + 1);
    }
  };

  return (
    <div style={styles.quiz}>
      <h1>Quiz App</h1>
      {quizData.map((q, index) => (
        <div key={index} style={styles.questionSection}>
          <div style={styles.questionText}>{q.question}</div>
          <div style={styles.answerSection}>
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswerOptionClick(index, option)}
                style={{
                  ...styles.optionButton,
                  backgroundColor:
                    selectedAnswers[index] === option
                      ? "#d4edda"
                      : "#4caf50"
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={styles.scoreSection}>
        You scored {score} out of {quizData.length}
      </div>
    </div>
  );
}

const styles = {
  quiz: {
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    margin: 'auto',
  },
  questionSection: {
    marginBottom: '20px',
  },
  questionText: {
    fontSize: '20px',
    marginBottom: '12px',
  },
  answerSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionButton: {
    color: 'white',
    border: 'none',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  scoreSection: {
    fontSize: '24px',
    marginTop: '20px',
  },
};


export default Quiz;