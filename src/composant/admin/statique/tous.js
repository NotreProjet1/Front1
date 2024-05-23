import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend as RechartsLegend, BarChart, Bar } from 'recharts';

// Couleurs vives assorties pour les cellules
const COLORS = ['#00FFFF', '#FF6347', '#FFD700'];

// Fonction pour afficher le pourcentage dans le PieChart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="black" fontSize={10} textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Style des cartes
// Style des cartes
const cardStyle = {
  background: '#222',
  color: '#fff',
  border: '2px solid #8884d8',
  borderRadius: '5px',
  width: '550px', // 2 cartes par ligne avec un espace de 20px entre les cartes
  height: '300px', // Hauteur de la carte
  margin: '20px', // Espacement entre les cartes
};


// Composant pour le premier graphique de statistiques
const UserStatsCard = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Admin/totals');
        setCounts(response.data.counts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card bordered={false} style={cardStyle}>
        <Row gutter={[16, 16]}>
          {counts.map((entry, index) => (
            <Col key={index} span={8}>
              <h3 style={{ color: COLORS[index % COLORS.length], marginTop: '20px' }}>{entry.name}</h3>
              <h2 style={{ color: COLORS[index % COLORS.length] }}>{entry.value}</h2>
            </Col>
          ))}
        </Row>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
          <PieChart width={300} height={300}>
            <Pie
              data={counts}
              cx={90} // Redimensionner le centre du graphique circulaire
              cy={90} // Redimensionner le centre du graphique circulaire
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {counts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ right: '10px', top: '30%' }} /> {/* Aligner la légende à droite */}
          </PieChart>
        </div>
      </Card>
    </Col>
  );
};

// Composant pour le deuxième graphique de statistiques
const InstructorStatsCard = () => {
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
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card bordered={false} style={{ ...cardStyle, marginLeft: '300px' }} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <LineChart width={500} height={250} data={instructorData}>
            <CartesianGrid strokeDasharray="3 3"  /> {/* Change la couleur des lignes de division */}
            <XAxis dataKey="week" type="number" label={{ value: 'Semaine', position: 'insideBottomRight', stroke:"#ffffff", offset: -10, fill: '#ffffff' }} stroke="#ffffff" /> {/* Change la couleur des labels de l'axe X */}
            <YAxis label={{ value: 'Nombre de comptes', angle: -90, position: 'insideLeft', fill: '#ffffff' }} stroke="#ffffff" /> {/* Change la couleur des labels de l'axe Y */}
            <Tooltip wrapperStyle={{ background: '#555', color: '#fff' }} contentStyle={{ background: '#555', border: 'none', borderRadius: '5px', padding: '5px' }} labelStyle={{ color: '#fff' }} />
            <RechartsLegend wrapperStyle={{ color: '#fff' }} />
            <Line type="monotone" data={instructorData} dataKey="count" stroke="#00FFFF" name={<span style={{ color: '#00FFFF' }}>Instructeurs</span>} />
            <Line type="monotone" data={participantData} dataKey="count" stroke="#FF4500" name={<span style={{ color: '#FF4500' }}>Participants</span>} />
          </LineChart>
        </div>
      </Card>
    </Col>
  );
  
}

// Composant pour le troisième graphique de statistiques
const TotalStatsCard = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Admin/getTotalP');
        setCounts(response.data.counts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

return (
  <Col xs={24} sm={12} md={12} lg={6} xl={6}>
    <Card bordered={false} style={cardStyle}>
      <Row gutter={[16, 16]} style={{}}>
        {counts.map((entry, index) => (
          <Col key={index} span={8}>
            <h3 style={{ color: COLORS[index % COLORS.length] }}>{entry.name}</h3>
            <h2 style={{ color: COLORS[index % COLORS.length] }}>{entry.value}</h2>
          </Col>
        ))}
      </Row>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '70%' }}>
        <PieChart width={250} height={250}>
          <Pie
            data={counts}
            cx={125} // Centrer le cercle horizontalement
            cy={125} // Centrer le cercle verticalement
            labelLine={false}
            outerRadius={70}
            innerRadius={30}
            fill="#8884d8"
            dataKey="value"
          >
            {counts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            {
              counts.map((entry, index) => (
                <text key={`text-${index}`} x={125 + Math.cos(Math.PI / counts.length * index) * 60} y={125 + Math.sin(Math.PI / counts.length * index) * 60} textAnchor="middle" dominantBaseline="central" fill={COLORS[index % COLORS.length]} fontSize={14}>
                  {entry.value}
                </text>
              ))
            }
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" align="right" layout="vertical" wrapperStyle={{ right: '-70px', top: '50%' }} /> {/* Aligner la légende à droite et en haut */}
        </PieChart>
      </div>
    </Card>
  </Col>
);

};

// Composant pour le quatrième graphique de statistiques
const DomainStatsCard = () => {
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
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card bordered={false} style={{ ...cardStyle, marginLeft: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <BarChart width={500} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="domaine" stroke="#ffffff" /> {/* Change la couleur des labels de l'axe X */}
            <YAxis stroke="#ffffff" /> {/* Change la couleur des labels de l'axe Y */}
            <Tooltip />
            <Legend />
            {data.length > 0 &&
              Object.keys(data[0])
                .filter((key) => key !== 'domaine')
                .map((key, index) => (
                  <Bar
                    key={index}
                    dataKey={key}
                    stackId="a"
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
          </BarChart>
        </div>
      </Card>
    </Col>
  );}
  
const Tous = () => {
  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '30px', overflow: 'auto' }}>
      {/* Première paire de cartes */}
      <Row gutter={[16, 16]}>
        <UserStatsCard />
        <InstructorStatsCard />
      </Row>
      {/* Deuxième paire de cartes */}
      <Row gutter={[16, 16]}>
        <TotalStatsCard />
        <DomainStatsCard />
      </Row>
    </div>
  );
};

export default Tous;
