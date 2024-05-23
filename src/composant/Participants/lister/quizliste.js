import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Tag, Pagination } from 'antd';
import { SmileOutlined, TrophyOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons';

const { Meta } = Card;

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 4;

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const response = await axios.get('http://localhost:3000/quiz/lister');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    }
    fetchQuizzes();
  }, []);

  // Calculate index of the last quiz on current page
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  // Calculate index of the first quiz on current page
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  // Get current quizzes to display
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {currentQuizzes.map((quiz) => (
          <Link key={quiz.id_q} to={`/getQuizById/${quiz.id_q}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              key={quiz.id_q}
              hoverable
              style={{ width: 300, marginBottom: 20, backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}
              cover={<img alt="example" src="https://img.freepik.com/vecteurs-libre/illustration-concept-cerveau-curiosite_114360-10736.jpg?t=st=1715217163~exp=1715220763~hmac=8254091f24d5e177c883ed2b48beb67ae0c5a27c320ed464bb3941516a820a33&w=740" />} // Replace with the URL you want to use
            >
              <Meta title={quiz.titre} description={quiz.description} />
              <div style={{ marginTop: 10 }}>
                {quiz.difficulte === 'facile' && <Tag icon={<SmileOutlined />} color="green">Facile</Tag>}
                {quiz.difficulte === 'moyen' && <Tag icon={<StarOutlined />} color="orange">Moyen</Tag>}
                {quiz.difficulte === 'difficile' && <Tag icon={<TrophyOutlined />} color="red">Difficile</Tag>}
                {quiz.populaire && <Tag icon={<RocketOutlined />} color="blue">Populaire</Tag>}
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={quizzes.length}
        pageSize={quizzesPerPage}
        onChange={paginate}
        style={{ textAlign: 'center', marginTop: 20 }}
      />
    </div>
  );
}

export default QuizList;
