import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { AiFillNotification } from 'react-icons/ai';

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Affiche = () => {
  const [currentSet, setCurrentSet] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Alterner entre les ensembles de cartes toutes les 5 secondes
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSet(prevSet => prevSet === 1 ? 2 : 1);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <PromotionTitle>
        <PromotionIcon><AiFillNotification /></PromotionIcon>
        Promos de ce mois
      </PromotionTitle>
      <CardWrapper>
        <SecondCardSet currentSet={currentSet} isAnimating={isAnimating} />
        <SecondCardSet currentSet={currentSet} isAnimating={isAnimating} />
      </CardWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PromotionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  background-color: #53B9CD;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const PromotionIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  overflow: hidden;
`;

const CardSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardSet = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${slideOut} 0.5s ease forwards;
    `}
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 2px solid #fff;
  width: 280px;
  margin-right: 80px;

  &:hover {
    transform: translateY(-5px);
  }

  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${slideIn} 0.5s ease forwards;
    `}
`;

const Content = styled.div`
  margin-top: 20px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const TitleHighlight = styled.span`
  color: #ff69b4;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-top: 10px;
`;

const PromotionText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-top: 15px;
`;

const PromotionHighlight = styled.span`
  background-color: #53b9cd;
  color: #fff;
  font-weight: bold;
  padding: 0 5px;
  border-radius: 5px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #ff69b4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #53b9cd;
  }
`;

const NotificationIcon = styled(AiFillNotification)`
  color: #ff69b4;
  font-size: 24px;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
`;

const FirstCardSet = ({ currentSet, isAnimating }) => {
  return (
    <CardSetContainer>
      <CardSet isAnimating={isAnimating}>
        <CardContainer isAnimating={isAnimating} className="background-radial-gradient">
          <Content>
            <NotificationIcon />
            <Title>Formation <TitleHighlight>Digital Marketing</TitleHighlight></Title>
            <Description>
              Apprenez les stratégies de marketing numérique modernes.
            </Description>
            <PromotionText>Offre spéciale : <PromotionHighlight>15%</PromotionHighlight> de réduction !</PromotionText>
            <ActionButton>S'inscrire</ActionButton>
          </Content>
        </CardContainer>
        <CardContainer isAnimating={isAnimating} className="background-radial-gradient">
          <Content>
            <NotificationIcon />
            <Title>Formation <TitleHighlight>Digital Marketing</TitleHighlight></Title>
            <Description>
              Apprenez les stratégies de marketing numérique modernes.
            </Description>
            <PromotionText>Offre spéciale : <PromotionHighlight>15%</PromotionHighlight> de réduction !</PromotionText>
            <ActionButton>bb</ActionButton>
          </Content>
        </CardContainer>
        <CardContainer isAnimating={isAnimating} className="background-radial-gradient">
          <Content>
            <NotificationIcon />
            <Title>Formation <TitleHighlight>Digital Marketing</TitleHighlight></Title>
            <Description>
              Apprenez les stratégies de marketing numérique modernes.
            </Description>
            <PromotionText>Offre spéciale : <PromotionHighlight>15%</PromotionHighlight> de réduction !</PromotionText>
            <ActionButton>bb'</ActionButton>
          </Content>
        </CardContainer>
      </CardSet>
    </CardSetContainer>
  );
};

const SecondCardSet = ({ currentSet, isAnimating }) => {
  return (
    <CardSetContainer>
      <CardSet isAnimating={isAnimating}>
        <CardContainer isAnimating={isAnimating} className="background-radial-gradient">
          <Content>
            <NotificationIcon />
            <Title>Formation <TitleHighlight>Digital Marketing</TitleHighlight></Title>
            <Description>
              Apprenez les stratégies de marketing numérique modernes.
            </Description>
            <PromotionText>Offre spéciale : <PromotionHighlight>15%</PromotionHighlight> de réduction !</PromotionText>
            <ActionButton>S'inscrire</ActionButton>
          </Content>
        </CardContainer>
        <CardContainer isAnimating={isAnimating} className="background-radial-gradient">
          <Content>
            <NotificationIcon />
            <Title>Formation <TitleHighlight>Digital Marketing</TitleHighlight></Title>
            <Description>
              Apprenez les stratégies de marketing numérique modernes.
            </Description>
            <PromotionText>Offre spéciale : <PromotionHighlight>15%</PromotionHighlight> de réduction !</PromotionText>
            <ActionButton>S'inscrire</ActionButton>
          </Content>
        </CardContainer>
        <CardContainer isAnimating={isAnimating} className="background-radial-gradient">
          <Content>
            <NotificationIcon />
            <Title>Formation <TitleHighlight>Digital Marketing</TitleHighlight></Title>
            <Description>
              Apprenez les stratégies de marketing numérique modernes.
            </Description>
            <PromotionText>Offre spéciale : <PromotionHighlight>15%</PromotionHighlight> de réduction !</PromotionText>
            <ActionButton>S'inscrire</ActionButton>
          </Content>
        </CardContainer>
      </CardSet>
    </CardSetContainer>
  );
};

export default Affiche;
