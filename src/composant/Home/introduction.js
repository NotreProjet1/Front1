import React from 'react';


const IntroPage = () => {
  const pageStyle = {
    backgroundImage: `url("https://images.pexels.com/photos/5076520/pexels-photo-5076520.jpeg?auto=compress&cs=tinysrgb&w=600")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white', // Couleur du texte
  };

  return (
    <div style={pageStyle}>
      <h1>Titre de votre site</h1>
      <p>Texte d'introduction à votre site d'apprentissage et de formations.</p>
      <button>Commencer</button>
    </div>
  );
};

export default IntroPage;
