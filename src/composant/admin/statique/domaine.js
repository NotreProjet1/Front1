import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from 'antd';

const COLORS = ['#FF5733', '#C70039', '#FFC300']; // Couleurs vives assorties pour les barres

const StackedBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/statistiques/domaines');
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ background: '#111', padding: '30px', minHeight: '100vh' }}> {/* Style pour l'arrière-plan de toute la page */}
      <Card
        style={{
          width: '80%',
          maxWidth: '800px',
          margin: '0 auto',
          background: '#222', // Couleur de fond de la carte
          color: '#fff', // Couleur du texte de la carte
          padding: '20px', // Espacement interne de la carte
          marginBottom: '30px', // Marge inférieure de la carte
          border: '2px solid #8884d8', // Ajout de la bordure autour de la carte
          borderRadius: '5px', // Arrondir les coins de la carte
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#fff' }}>Statistiques par domaine</h1>
        <BarChart width={700} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="domaine" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'domaine').map((key, index) => (
            <Bar key={index} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
          ))}
        </BarChart>
      </Card>
    </div>
  );
};

export default StackedBarChart;
