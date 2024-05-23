import React, { useEffect } from 'react';
import FormContact from './formContact';
import '../Home/contacter/conts.css'; 

const AboutNous = () => {
    useEffect(() => {
        // Fait défiler la page vers le haut lorsque le composant est monté
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className='extrapage'>
                <div className='pgleft pgcommon'>
                    <img src='https://img.freepik.com/vecteurs-libre/coach-parlant-devant-public-mentor-presentant-graphiques-rapports-reunion-employes-lors-formation-commerciale-seminaire-conference-illustration-vectorielle-pour-presentation-conference-education_74855-8294.jpg' alt='noimg' />
                    <div>
                        <h1>Notre Histoire</h1>
                        <p>Depuis nos débuts modestes en 2023, EduPioneer s'est transformé en une plateforme d'apprentissage de premier plan en Tunisie. Notre voyage a été marqué par un engagement inébranlable envers l'excellence éducative et l'innovation constante. Nous sommes fiers d'avoir accompagné des milliers d'apprenants dans leur quête de connaissances et de compétences, en leur offrant un accès facile à des cours de qualité et à des ressources pédagogiques enrichissantes. Notre histoire est celle d'une passion partagée pour l'éducation et d'un engagement profond envers le développement personnel et professionnel de chacun de nos utilisateurs.</p>
                    </div>
                </div>
                <div className='pgright pgcommon'>
                    <img src='https://static.vecteezy.com/ti/vecteur-libre/p3/19198926-concept-d-illustration-de-formation-commerciale-une-illustration-plate-isolee-sur-fond-blanc-vectoriel.jpg' alt='noimg' style={{ height: '400px' }} />
                    <div>
                        <h1>Qui Nous Sommes</h1>
                        <p>Chez EduPioneer, nous sommes une équipe dévouée de professionnels de l'éducation, d'experts techniques et de passionnés de l'apprentissage. Notre mission est d'apporter une contribution significative à la transformation de l'éducation en Tunisie en offrant des solutions novatrices et accessibles pour répondre aux besoins diversifiés des apprenants. Nous croyons fermement au pouvoir de l'apprentissage continu pour changer des vies et stimuler le progrès social et économique. Notre approche centrée sur l'utilisateur, notre expertise technique et notre engagement envers l'excellence guident chacune de nos actions et nous permettent de créer un impact positif dans la communauté éducative</p>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default AboutNous;
