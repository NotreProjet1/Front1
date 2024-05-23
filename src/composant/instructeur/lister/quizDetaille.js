import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Paper, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const UserQuizReview = () => {
    const { id_q } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuizAndQuestions() {
            try {
                // Récupérer les données du quiz
                const quizResponse = await axios.get(`http://localhost:3000/quiz/getQuizById/${id_q}`);
                setQuiz(quizResponse.data.Quiz);

                // Récupérer les questions du quiz
                const questionsResponse = await axios.get(`http://localhost:3000/question/gestionQuiz/${id_q}`);
                setQuestions(questionsResponse.data.questions);
            } catch (error) {
                console.error('Error fetching quiz or questions:', error);
            }
        }
        fetchQuizAndQuestions();
    }, [id_q]);

    if (!quiz || questions.length === 0) {
        return <Container>Loading...</Container>;
    }

    const renderAnswers = (question) => {
        const answers = [];
        if (question.reponse_correct) {
            answers.push(
                <Chip
                    key="correct"
                    icon={<CheckCircleIcon />}
                    label={`Correct: ${question.reponse_correct}`}
                    color="success"
                    variant="outlined"
                    sx={{ mb: 1, width: '100%' }}
                />
            );
        }
        if (question.reponse_incorect) {
            answers.push(
                <Chip
                    key="incorect"
                    icon={<CancelIcon />}
                    label={`Incorrect: ${question.reponse_incorect}`}
                    color="error"
                    variant="outlined"
                    sx={{ mb: 1, width: '100%' }}
                />
            );
        }
        return answers;
    };

    return (
        <div
        style={{
            backgroundImage: `linear-gradient(135deg, #0b3954, #08527a, #0b5e72, #127a90, #0e92a5, #0b7f99, #0c71b7, #0053a4)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            marginTop: "-34px",
            marginBottom: "-30px",
            minHeight: '100vh', // Assurez-vous que le dégradé couvre toute la hauteur de la page
        }}

    >
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Card
                variant="outlined"
                style={{
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "20px 0",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <CardContent style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Titre : {quiz.titre}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Description : {quiz.description}
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom style={{ color: "white" }}>
                    Questions
                </Typography>
                {questions.map((questionObj) => (
                    <Paper
                        key={questionObj.id_question}
                        elevation={3}
                        sx={{ mb: 3, p: 2 }}
                    >
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                            {questionObj.question}
                        </Typography>
                        <Box>
                            {renderAnswers(questionObj)}
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Container>
        </div>
    );
};

export default UserQuizReview;
