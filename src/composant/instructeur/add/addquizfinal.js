import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/addquizfinal.css';
import { useParams, useHistory } from 'react-router-dom';

const QuizForm = () => {
    const [quiz, setQuiz] = useState({ titre: '', description: '' });
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswers, setCurrentAnswers] = useState({ correct: '', incorect1: '', incorect2: '', incorect3: '' });
    const [quizId, setQuizId] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const { formationId } = useParams();
    const [lastFormationId, setLastFormationId] = useState(null);
    const history = useHistory();

    const [currentStep, setCurrentStep] = useState('quiz');
    const [currentSteppn, setCurrentSteppn] = useState(0);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchLastFormationId = async () => {
            try {
                const response = await axios.get('http://localhost:3000/formationP/getLastFormationId');
                if (response.data.success) {
                    setLastFormationId(response.data.lastFormationId);
                    setCurrentSteppn('1')
                } else {
                    console.error('Erreur lors de la récupération du dernier ID de formation :', response.data.error);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du dernier ID de formation :', error);
            }
        };

        fetchLastFormationId();
    }, []);
    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };

    const handleQuestionChange = (e) => {
        setCurrentQuestion(e.target.value);
    };

    const handleAnswerChange = (e) => {
        const { name, value } = e.target;
        setCurrentAnswers({ ...currentAnswers, [name]: value });
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formationId);

            const response = await axios.post(`http://localhost:3000/quizFinal/Add/${formationId}`, quiz, { headers: { Authorization: ` ${token}` } });
            setQuizId(response.data.id_q);
            setCurrentStep('question');
            alert('Quiz créé avec succès');
        } catch (error) {
            console.error('Erreur lors de la création du quiz :', error);
            alert('Erreur lors de la création du quiz');
        }
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/questionFinal/add', { questions: currentQuestion, id_quiz: quizId });
            setQuestions([...questions, { id: response.data.questionId, titre: currentQuestion }]);
            setCurrentQuestion('');
            setCurrentStep('answer');
            setQuestionNumber(questionNumber + 1)
            alert('Question ajoutée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la question :', error);
            alert('Erreur lors de l\'ajout de la question');
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/reponsefinal/add', { ...currentAnswers, id_question: questions[questions.length - 1].id });
            setCurrentAnswers({ correct: '', incorect1: '', incorect2: '', incorect3: '' });
            if (questions.length >= 3) {
                setCurrentStep('finalize');
            } else {
                setCurrentStep('question');
            }
            alert('Réponse ajoutée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réponse :', error);
            alert('Erreur lors de l\'ajout de la réponse');
        }
    };
    const handleFinalize = () => {
        const instructeurData = JSON.parse(localStorage.getItem('instructeurData'));
        const instructeurId = instructeurData ? instructeurData.id : null;
        history.push(`/ListeFormationInstructeur?userId=${instructeurId}`);

    };
    return (
        <div className="quiz-form">
            <p>Veuillez remplir les informations pour configurer un quiz pour la formation.</p>
            <h1>Créer un Quiz final</h1>
            {currentStep === 'quiz' && (
                <form onSubmit={handleQuizSubmit} className="step">
                    <input type="text" name="titre" value={quiz.titre} onChange={handleQuizChange} placeholder="Titre du quiz" required />
                    <textarea name="description" value={quiz.description} onChange={handleQuizChange} placeholder="Description du quiz" required />
                    <button type="submit">Créer le Quiz</button>
                </form>
            )}

            {currentStep === 'question' && (
                <div className="step">
                    <h2>Ajouter la Question numéro {questionNumber}</h2>
                    <form onSubmit={handleQuestionSubmit}>
                        <input type="text" value={currentQuestion} onChange={handleQuestionChange} placeholder="Question" required />
                        <button type="submit">Ajouter la Question</button>
                    </form>
                 
                </div>
                
            )}

            {currentStep === 'answer' && (
                <div className="step">
                    <h3>Ajouter les Réponses à la Dernière Question "{questions.length > 0 ? questions[questions.length - 1].titre : ''}"</h3>
                    <form onSubmit={handleAnswerSubmit}>
                        <input type="text" name="correct" value={currentAnswers.correct} onChange={handleAnswerChange} placeholder="Bonne réponse" required />
                        <input type="text" name="incorect1" value={currentAnswers.incorect1} onChange={handleAnswerChange} placeholder="Mauvaise réponse 1" required />
                        <input type="text" name="incorect2" value={currentAnswers.incorect2} onChange={handleAnswerChange} placeholder="Mauvaise réponse 2" required />
                        <input type="text" name="incorect3" value={currentAnswers.incorect3} onChange={handleAnswerChange} placeholder="Mauvaise réponse 3" required />
                        <button type="submit">Ajouter les Réponses</button>
                    </form>
                </div>
            )}
            
      
          

            {currentStep === 'finalize' && (
                <div className="step">
                    <button onClick={handleFinalize}>Finaliser la création du Quiz</button>
                </div>
            )}
                          <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width:'100%'}} > 70%</div>
  </div>
        </div>
    );
};

export default QuizForm;
