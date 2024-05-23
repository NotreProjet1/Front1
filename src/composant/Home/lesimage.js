import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

function Photos() {
  const imageStyle = {
    width: '100%',
    maxHeight: '450px',
    objectFit: 'cover',
  };

  const captionStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arrière-plan semi-transparent
    padding: '20px',
    borderRadius: '5px',
    color: '#fff', // Texte en blanc pour contraste
  };

  return (
    <MDBCarousel showControls showIndicators>
      <MDBCarouselItem itemId={1}>
        <img src='https://www.e2b-consulting.com/wp-content/uploads/2022/04/affiche-formation-fondamentaux.png' style={imageStyle} alt='...' />
        <div style={captionStyle}>
          <h1 style={{ marginBottom: '10px' }}>Accompagnement professionnel</h1>
          <p>Des experts du secteur pour vous guider à chaque étape de votre parcours d'apprentissage.</p>
        </div>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src='https://www.e2b-consulting.com/wp-content/uploads/2020/10/Administration-d%E2%80%99un-site-web-avec-le-CMS-wordpress.jpg' style={imageStyle} alt='...' />
        <div style={captionStyle}>
          <h1 style={{ marginBottom: '10px' }}>Formation sur mesure</h1>
          <p>Des cours adaptés à vos besoins spécifiques, pour une expérience d'apprentissage personnalisée.</p>
        </div>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src='https://www.cnam-hauts-de-france.fr/storage/FC-Technicien-informatique-DEUST-IOSI-Lille_Slider-scaled.jpg' style={imageStyle} alt='...' />
        <div style={captionStyle}>
          <h1 style={{ marginBottom: '10px' }}>Apprenez avec nous</h1>
          <p>Découvrez une variété de formations passionnantes pour développer vos compétences.</p>
        </div>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}

export default Photos;