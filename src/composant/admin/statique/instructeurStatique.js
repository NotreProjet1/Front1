import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from 'antd';

const COLORS = ['#00FFFF', '#FF6347']; // Couleurs vives assorties pour les lignes

const InstructorChart = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [participantData, setParticipantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorResponse = await axios.get('http://localhost:3000/Admin/instructor-count-by-week');
        const participantResponse = await axios.get('http://localhost:3000/Admin/participant-count-by-week');
        setInstructorData(instructorResponse.data.data);
        setParticipantData(participantResponse.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        title={<span style={{ color: '#fff', fontWeight: 'bold' }}>Augmentation des instructeurs et des participants par semaine</span>}
        bordered={false}
        style={{ width: 800, background: '#222', color: '#fff', border: '2px solid #8884d8', borderRadius: '5px' }} // Ajouter une couleur de bordure et arrondir les coins de la carte
      >
        <LineChart width={800} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="week" type="number" label={{ value: 'Semaine', position: 'insideBottomRight', offset: -10, fill: '#fff' }} />
          <YAxis label={{ value: 'Nombre de comptes', angle: -90, position: 'insideLeft', fill: '#fff' }} />
          <Tooltip
            wrapperStyle={{ background: '#555', color: '#fff' }}
            contentStyle={{ background: '#555', border: 'none', borderRadius: '5px', padding: '5px' }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Line type="monotone" data={instructorData} dataKey="count" stroke="#00FFFF" name={<span style={{ color: '#00FFFF' }}>Instructeurs</span>} />
          <Line type="monotone" data={participantData} dataKey="count" stroke="#FF4500" name={<span style={{ color: '#FF4500' }}>Participants</span>} />
        </LineChart>
      </Card>
    </div>
  );
};

export default InstructorChart;
