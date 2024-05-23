import React from 'react';
import { useHistory } from 'react-router-dom';

function Devenir() {
  const history = useHistory();

  const handleClick = () => {
    // Naviguer vers la nouvelle page lorsque le bouton est cliqué
    history.push('/contact');
  };

  return (
    <div style={{ backgroundColor: '#031136', padding: '20px', display: 'flex', alignItems: 'center',  marginTop:'40px',height:'520px' }}>
      <img src="/images/nous.jpg" alt="Votre Image" style={{ marginRight: '20px'  , height:'400px'}} />
      <div style={{ marginLeft:'250px'}} >
        <h2>NOS EduPionner </h2>
        <p>Simple ne veut pas juste dire minimaliste et fonctionnel. </p> 
        <p> On peut faire simple tout en véhiculant beaucoup d’émotions. </p>      
        <button style={{backgroundColor:'#53B9CD'}} onClick={handleClick}>Découvrir Nous</button>
      </div>
    </div>
  );
}

export default Devenir;
 
