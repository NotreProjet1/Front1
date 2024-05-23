import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGride from './home';
import VideoPage from './vedio';
import PageCollections from './collectionMarek';
import CardGrid from './gratuisFormation';
import Photos from './lesimage';
import Statique from './statique'; // Utilisez le même nom utilisé lors de l'exportation
import DevenirInstructeur from './devenirInstructeur.js';
import DevenirParticipant from './devenirParticipant.js';
import PageCollectionsBusiness from './collectionBusiness.js';
import PageCollectionsDevelopment from './collectionDevelopment.js';
import Devenir from './devenir.js';
import Affiche from './affiche.js';
import IntroPage from './introduction.js';

const HomeFinal = () => {
  const [randomToken, setRandomToken] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Générer un jeton aléatoire toutes les deux minutes
    const tokenInterval = setInterval(() => {
      const newToken = Math.random().toString(36).substring(2, 10);
      setRandomToken(newToken);
    }, 12000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(tokenInterval);
  }, []);

  useEffect(() => {
    const generateDiscountCode = () => {
      // Générer un code de réduction de 6 chiffres aléatoires
      const newDiscountCode = Math.floor(100000 + Math.random() * 900000);
      setDiscountCode(newDiscountCode);

      // Afficher le message et cacher après quelques secondes
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 20000); // Afficher le message pendant 20 secondes

      // Cacher le message après un délai aléatoire entre 5 et 15 secondes
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, 5000 + Math.random() * 10000);
    };

    // Appeler la fonction pour générer le code de réduction initialement
    generateDiscountCode();

    // Régénérer un code de réduction toutes les 2 minutes
    const discountInterval = setInterval(generateDiscountCode, 120000);

    return () => clearInterval(discountInterval);
  }, []);

  return (
    <Container>
      <Photos style={{ marginBottom: '100px' }} />
    
      <Devenir style={{ marginTop: '120px' }} />
      <Statique />
      <DevenirInstructeur />
      <PageCollections />
      <Affiche/>
      <DevenirParticipant />
      <PageCollectionsBusiness />
      <VideoPage />
      <PageCollectionsDevelopment />
      {showMessage && (
        <Message>
          Utilisez le code suivant pour obtenir une réduction de 10% : {discountCode}
        </Message>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Message = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
`;

export default HomeFinal;
