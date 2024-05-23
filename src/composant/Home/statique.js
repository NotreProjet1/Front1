import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faLayerGroup, faBook, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'; // Import de faChalkboardTeacher
import styled from 'styled-components';
import '../Home/statique.css'
const Statique = () => {
  const [formationCount, setFormationCount] = useState(0);
  const [freeCourseCount, setFreeCourseCount] = useState(0);
  const [distinctDomainCount, setDistinctDomainCount] = useState(0); 
  const [instructeurCount, setInstructeurCount] = useState(0); // Ajout du state pour le nombre d'instructeurs

  useEffect(() => {
    const fetchFormationCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/count');
        setFormationCount(response.data.total);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de formations :', error);
      }
    };

    const fetchFreeCourseCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/coursgratuis/count');
        setFreeCourseCount(response.data.total);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de cours gratuits :', error);
      }
    };

    const fetchDistinctDomainCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/countDistinctDomains');
        setDistinctDomainCount(response.data.totalDistinctDomains);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de domaines distincts :', error);
      }
    };

    const fetchInstructeurCount = async () => { // Fonction pour récupérer le nombre d'instructeurs
      try {
        const response = await axios.get('http://localhost:3000/instructeur/count'); 
        setInstructeurCount(response.data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'instructeurs :', error);
      }
    };

    fetchFormationCount();
    fetchFreeCourseCount();
    fetchDistinctDomainCount();
    fetchInstructeurCount(); // Appel de la fonction pour récupérer le nombre d'instructeurs
  }, []);

  

  return (
    <Container>
      <Section  className="section-domain" >
        <IconWrapper>
          <FontAwesomeIcon icon={faCubes} style={{ color: '#031136' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3" style={{ color: '#53B9CD' }}> + {distinctDomainCount}</Title>
        <Subtitle className="fw-normal mb-0">Domaine</Subtitle>
      </Section>
      <Separator />
      <Section className="section-formation">
        <IconWrapper>
          <FontAwesomeIcon icon={faLayerGroup} style={{ color: '#031136' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className=" fw-bold mb-3" style={{ color: '#53B9CD' }}   >+ {formationCount}</Title> 
        <Subtitle className="fw-normal mb-0">Formation </Subtitle>
      </Section>
      <Separator />
      <Section className="section-courses"   >
        <IconWrapper >
          <FontAwesomeIcon icon={faBook} style={{ color: '#031136' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3" style={{ color: '#53B9CD' }} >+ {freeCourseCount}</Title>
        <Subtitle className="fw-normal mb-0"> <p> Courses Gratuits </p></Subtitle>
      </Section>
      <Separator />
      <Section className="section-instructors" >
        <IconWrapper>
          <FontAwesomeIcon icon={faChalkboardTeacher} style={{ color: '#031136' }} className="fa-3x mb-4" /> {/* Utilisation de l'icône des instructeurs */}
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3" style={{ color: '#53B9CD' }}>+  {instructeurCount}  </Title> {/* Affichage du nombre d'instructeurs */}
        <Subtitle className="fw-normal mb-0">Instructeurs</Subtitle> {/* Modification du label */}
      </Section>
      <Separator />
  
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;

const Section = styled.div`
display: flex;
flex-direction: column;
align-items: center;
flex-grow: 1;
padding: 15px;


`;

const Separator = styled.div`
  width: 1px;
  background-color: #ddd;
`;

const IconWrapper = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.h5`
  font-size: 2rem;
  color: blue; /* Couleur bleue pour les chiffres */
`;

const Subtitle = styled.h6`
  font-size: 1rem;
`;

export default Statique;
