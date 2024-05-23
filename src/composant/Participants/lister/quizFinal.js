import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuizFinal = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // Récupérer la liste de tous les quizzes
        fetch('http://localhost:3000/quizFinal/lister')
            .then(response => response.json())
            .then(data => setQuizzes(data))
            .catch(error => console.error('Erreur lors de la récupération des quizzes :', error));
    }, []);

    return (
        <div>
            <h1>Liste des Quizzes</h1>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.id_Q}>
                        {/* Accédez à la propriété correcte pour le titre */}
                        <Link to={`/quiz/${quiz.id_Q}`}>{quiz.Titre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizFinal;
