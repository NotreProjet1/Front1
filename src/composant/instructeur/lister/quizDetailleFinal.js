import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Paper, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const InstructorQuizReview = () => {
    const [quizDetail, setQuizDetail] = useState(null);
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

    if (!quizDetail) {
        return <Container>Loading...</Container>;
    }

    const renderAnswers = (response) => {
        const answers = [];
        if (response.Correct) {
            answers.push(
                <Chip
                    key="correct"
                    icon={<CheckCircleIcon />}
                    label={`Correct: ${response.Correct}`}
                    color="success"
                    variant="outlined"
                    sx={{ mb: 1, width: '100%' }}
                />
            );
        }
        if (response.incorect1) {
            answers.push(
                <Chip
                    key="incorect1"
                    icon={<CancelIcon />}
                    label={`Incorrect: ${response.incorect1}`}
                    color="error"
                    variant="outlined"
                    sx={{ mb: 1, width: '100%' }}
                />
            );
        }
        if (response.incorect2) {
            answers.push(
                <Chip
                    key="incorect2"
                    icon={<CancelIcon />}
                    label={`Incorrect: ${response.incorect2}`}
                    color="error"
                    variant="outlined"
                    sx={{ mb: 1, width: '100%' }}
                />
            );
        }
        if (response.incorect3) {
            answers.push(
                <Chip
                    key="incorect3"
                    icon={<CancelIcon />}
                    label={`Incorrect: ${response.incorect3}`}
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
                           Titre : {quizDetail.quiz.Titre}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                           Description : {quizDetail.quiz.description}
                        </Typography>
                    </CardContent>
                </Card>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom style={{ color: "white" }}>
                        Questions
                    </Typography>
                    {quizDetail.questionsWithAnswers.map((questionObj, qIndex) => (
                        <Paper
                            key={questionObj.question.id_question}
                            elevation={3}
                            sx={{ mb: 3, p: 2 }}
                        >
                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                {questionObj.question.questions}
                            </Typography>
                            <Box>
                                {questionObj.reponses.map((response, rIndex) => (
                                    <Box key={response.id_rep} sx={{ mb: 2 }}>
                                        {renderAnswers(response)}
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </div>
    );
};

export default InstructorQuizReview;