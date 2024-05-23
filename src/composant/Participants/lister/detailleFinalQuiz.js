import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DetailQuizFinal = () => {
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [quizDetail, setQuizDetail] = useState(null);
    const [userResponses, setUserResponses] = useState({});
    const [scoreMessage, setScoreMessage] = useState('');
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificateDetails, setCertificateDetails] = useState({
        firstName: '',
        lastName: '',
        date: new Date().toLocaleDateString(),
        companyName: 'EduPionner',
        percentageScore: ''
    });
    const [showScore, setShowScore] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const certificateRef = useRef();
    const { id_Q } = useParams();

    useEffect(() => {
        async function fetchQuiz() {
            try {
                const response = await axios.get(`http://localhost:3000/quizFinal/${id_Q}`);
                setQuizDetail(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        }
        fetchQuiz();
    }, [id_Q]);

    useEffect(() => {
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        if (participantData) {
            setCertificateDetails(details => ({
                ...details,
                firstName: participantData.nom,
                lastName: participantData.prenom
            }));
        }
    }, []);

    const handleAnswerOptionClick = (responseId) => {
        // Mettre à jour l'état userResponses avec la réponse sélectionnée pour la question actuelle
        setUserResponses((prevResponses) => ({
            ...prevResponses,
            [currentQuestion.question.id_question]: [responseId],
        }));
    
        // Mettre à jour l'état selectedResponse avec l'ID de la réponse sélectionnée
        setSelectedResponse(responseId);
    };
    
    

    const calculateScore = () => {
        let score = 0;

        for (const questionId in userResponses) {
            const selectedResponse = userResponses[questionId][0];
            const question = quizDetail.questionsWithAnswers.find(q => q.question.id_question === parseInt(questionId));
            const correctResponse = question.reponses.find(r => r.Correct > 0);

            if (correctResponse && correctResponse.id_rep === selectedResponse) {
                score += 2;
            }
        }

        return score;
    };

    const finishQuiz = async () => {
        const finalScore = calculateScore();
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        const participantId = participantData ? participantData.id_p : null;
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            setScoreMessage('Vous devez être connecté pour soumettre votre score.');
            return;
        }

        if (!participantId) {
            console.error('No participant ID found');
            setScoreMessage('Participant ID is missing.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/quizFinal/save-score', {
                id_q: id_Q,
                participantId: participantId,
                score: finalScore
            }, {
                headers: {
                    Authorization: ` ${token}`
                }
            });

            const totalQuestions = quizDetail.questionsWithAnswers.length;
            const percentageScore = ((finalScore / (totalQuestions * 2)) * 100).toFixed(2);

            setCertificateDetails(details => ({
                ...details,
                percentageScore
            }));

            setScoreMessage(finalScore >= (totalQuestions * 2 * 0.6) ? 'Très bien! Vous avez un excellent score!' : 'Il faut se concentrer un peu plus.');
            setShowCertificate(finalScore >= (totalQuestions * 2 * 0.6));
            setShowScore(true);
        } catch (error) {
            console.error('Error saving score:', error);
            if (error.response && error.response.status === 401) {
                setScoreMessage('Votre session a expiré. Veuillez vous reconnecter.');
            } else if (error.response && error.response.status === 400) {
                setScoreMessage('Données de requête invalides. Veuillez vérifier vos réponses.');
            } else {
                setScoreMessage('Une erreur est survenue lors de la sauvegarde de votre score.');
            }
        }
    };

    const handleDownloadCertificate = () => {
        html2canvas(certificateRef.current, { scrollY: -window.scrollY }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('certificate.pdf');
        });
    };

    if (!quizDetail) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quizDetail.questionsWithAnswers[currentQuestionIndex];

    return (
        <div>
            <div style={styles.background}>
                <div style={styles.quizContainer}>
                    <div style={styles.quiz}>
                        {quizDetail && (
                            <div style={styles.quizHeader}>
                                <h1>La quiz : {quizDetail.quiz.Titre}{quizDetail.quiz.description}</h1>
                               
                            </div>
                        )}

                        {currentQuestion && (
                            <div key={currentQuestion.question.id_question} style={styles.questionSection}>
                                <h2 style={styles.questionText}>{currentQuestion.question.questions}</h2>
                                <div style={styles.answerSection}>
                                    {currentQuestion.reponses.map((response, rIndex) => (
                                       <div> 
<button
    key={rIndex}
    onClick={() => handleAnswerOptionClick(response.id_rep)}
    style={{
        ...styles.optionButton,
        backgroundColor: selectedResponse === response.id_rep ? '#d4edda' : '#007bff'
    }}
>
    {response.Correct}
</button>
<button
    key={rIndex}
    onClick={() => handleAnswerOptionClick(response.id_rep)}
    style={{
        ...styles.optionButton,
        backgroundColor: selectedResponse === response.id_rep ? '#d4edda' : '#007bff'
    }}
>
    {response.Correct}
</button>
<button
    key={rIndex}
    onClick={() => handleAnswerOptionClick(response.id_rep)}
    style={{
        ...styles.optionButton,
        backgroundColor: selectedResponse === response.id_rep ? '#d4edda' : '#007bff'
    }}
>
    {response.Correct}
</button>                              </div> 
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentQuestionIndex < quizDetail.questionsWithAnswers.length - 1 && (
                            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} style={styles.nextButton}>
                                Suivant
                            </button>
                        )}



                        {showScore && (
                            <div style={styles.scoreSection}>
                                <p>{scoreMessage}</p>
                                {showCertificate && (
                                    <div ref={certificateRef} style={styles.certificate}>
                                        <h2>Certificat de réussite</h2>
                                        <p>Délivré à : {certificateDetails.firstName} {certificateDetails.lastName}</p>
                                        <p>Date : {certificateDetails.date}</p>
                                        <p>Entreprise : {certificateDetails.companyName}</p>
                                        <p>Score : {certificateDetails.percentageScore}%</p>
                                        <button onClick={handleDownloadCertificate}>Télécharger</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


const styles = {
    background: {
        backgroundImage: 'url(https://t4.ftcdn.net/jpg/03/45/88/07/360_F_345880772_zIT2mkdCzTthplO7xqaGGrMspN0jw0ll.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '890px',
        position: 'relative',
    },
    quizContainer: {
        position: 'relative',
        top: '150px',
        marginLeft: '160px'
    },
    quiz: {
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '600px',
        margin: 'auto',
    },
    quizHeader: {
        marginBottom: '20px',
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
        alignItems: 'center',
    },
    answerPair: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    optionButton: {
        color: 'white',
        border: 'none',
        padding: '10px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        minWidth: '200px',
    },
    defaultOptionButton: {
        backgroundColor: '#007bff',
    },
    selectedOptionButton: {
        backgroundColor: '#d4edda',
    },
    finishButton: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
    },
    scoreSection: {
        fontSize: '24px',
        marginTop: '20px',
    },
    certificate: {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '20px auto',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
    },
};

export default DetailQuizFinal;
