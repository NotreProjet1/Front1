import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';

const AddQuiz = () => {
  const { id_cp } = useParams();
  const { TextArea } = Input;
  const history = useHistory();

  const [quizData, setQuizData] = useState({
    titre: '',
    description: '',
  });

  const [questionData, setQuestionData] = useState({
    question: '',
    reponse_correct: '',
    reponse_incorect: '',
  });

  const [id_quiz, setid_quiz] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [addedQuiz, setAddedQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [numQuestionsAdded, setNumQuestionsAdded] = useState(0);

  useEffect(() => {
    if (id_quiz) {
      const fetchQuizQuestions = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/question/getQuestionsByQuizId/${id_quiz}`);
          setQuizQuestions(response.data.questions);
        } catch (error) {
          console.error('Erreur lors de la récupération des questions du quiz :', error);
        }
      };

      fetchQuizQuestions();
    }
  }, [id_quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleAddQuiz = async () => {
    try {
      if (!quizData.titre || !quizData.description) {
        message.error('Merci de remplir tous les champs');
        return;
      }

      const token = localStorage.getItem('token');

   

      const config = {
        headers: {
          Authorization: ` ${token}`,
        },
      };

      const data = {
        titre: quizData.titre,
        description: quizData.description,
      };

      const response = await axios.post(`http://localhost:3000/quiz/Add/${id_cp}`, data, config);
      const id_quiz = response.data.id_quiz;
      setid_quiz(id_quiz);
      setAddedQuiz(quizData);
      setQuizData({ titre: '', description: '' });
      message.success('Quiz ajouté avec succès');
      setShowQuestionForm(true);
    } catch (error) {
      console.error(`Erreur lors de l'ajout du quiz :`, error);

      if (error.response && error.response.status === 401) {
        message.error('La session a expiré. Veuillez vous reconnecter.');
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('instructeurData');
          localStorage.removeItem('isLoggedIn');
          history.push('/login');
          window.location.reload();
        }, 3000);
      } else {
        message.error(`Échec de l'ajout du quiz`);
      }
    }
  };

  const handleAddQuestion = async () => {
    try {
      if (!questionData.question || !questionData.reponse_correct || !questionData.reponse_incorect) {
        message.error('Merci de remplir tous les champs');
        return;
      }

      if (numQuestionsAdded >= 3) {
        message.warning('Vous avez atteint le nombre maximum de questions pour ce quiz');
        return;
      }

      const response = await axios.get('http://localhost:3000/quiz/getLastQuizId');
      const lastQuizId = response.data.lastQuizId;

      const data = {
        id_quiz: lastQuizId,
        question: questionData.question,
        reponse_correct: questionData.reponse_correct,
        reponse_incorect: questionData.reponse_incorect.split(',').map(item => item.trim()),
      };

      await axios.post('http://localhost:3000/question/add', data);
      message.success('Question ajoutée avec succès');
      setQuestionData({ question: '', reponse_correct: '', reponse_incorect: '' });
      setNumQuestionsAdded(numQuestionsAdded + 1);

      if (numQuestionsAdded + 1 >= 3) {
        message.success('Vous avez terminé la création du quiz');
        history.push(`/coursPayantI/getcoursById/${id_cp}`);
        setShowQuestionForm(false);
      }
    } catch (error) {
      console.error(`Erreur lors de l'ajout de la question :`, error);

      if (error.response && error.response.status === 401) {
        message.error(`La session a expiré. Veuillez vous reconnecter.`);
        history.push('/login');
      } else {
        message.error(`Erreur lors de l'ajout de la question :`);
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>{`
        .background-radial-gradient {
          background-color: hsl(218, 41%, 15%);
          background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
            radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
        }

        #radius-shape-1 {
          height: 220px;
          width: 220px;
          top: -60px;
          left: -130px;
          background: radial-gradient(#44006b, #ad1fff);
          overflow: hidden;
        }

        #radius-shape-2 {
          border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
          bottom: -60px;
          right: -110px;
          width: 300px;
          height: 300px;
          background: radial-gradient(#44006b, #ad1fff);
          overflow: hidden;
        }

        .bg-glass {
          background-color: hsla(0, 0%, 100%, 0.9) !important;
          backdrop-filter: saturate(200%) blur(25px);
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '50%' }}>
          {!showQuestionForm && (
            <Card title="Add Quiz" style={{ marginBottom: '20px' }}>
              <Form layout="vertical">
                <Form.Item label="Titre" rules={[{ required: true, message: 'Please enter the title' }]}>
                  <Input name="titre" value={quizData.titre} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
                  <TextArea name="description" value={quizData.description} onChange={handleChange} />
                </Form.Item>
              </Form>
              <Button type="primary" onClick={handleAddQuiz}>Ajouter Quiz</Button>
            </Card>
          )}

          {showQuestionForm && (
            <Card title={`Add Question for ${addedQuiz.titre}`} style={{ marginBottom: '20px' }}>
              <Form layout="vertical">
                <Form.Item label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
                  <Input name="question" value={questionData.question} onChange={handleQuestionChange} />
                </Form.Item>
                <Form.Item label="Correct Answer" rules={[{ required: true, message: 'Please enter the correct answer' }]}>
                  <Input name="reponse_correct" value={questionData.reponse_correct} onChange={handleQuestionChange} />
                </Form.Item>
                <Form.Item label="Incorrect Answers" rules={[{ required: true, message: 'Please enter the incorrect answers' }]}>
                  <Input name="reponse_incorect" value={questionData.reponse_incorect} onChange={handleQuestionChange} />
                </Form.Item>
              </Form>
              <Button type="primary" onClick={handleAddQuestion} icon={<PlusOutlined />}>
                Ajouter Question {numQuestionsAdded > 0 ? `(${numQuestionsAdded})` : ''}
              </Button>
            </Card>
          )}

          {id_quiz && (
            <Card title={`Questions for ${addedQuiz.titre}`} style={{ marginBottom: '20px' }}>
              {quizQuestions.map((question, index) => (
                <div key={index}>
                  <p>{question.question}</p>
                  <p>Correct reponse : {question.reponse_correct}</p>
                  <p>Incorrect reponse: {question.reponse_incorect.join(', ')}</p>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddQuiz;