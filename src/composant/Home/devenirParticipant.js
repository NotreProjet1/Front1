import React from 'react';
import { useHistory } from 'react-router-dom';

function DevenirParticipant() {
  const history = useHistory();

  const handleClick = () => {
    // Naviguer vers la nouvelle page lorsque le bouton est cliqué
    history.push('/ParticipantRegister');
  };

  return (
    <div style={{ backgroundColor: '#031136', padding: '20px', display: 'flex', alignItems: 'center', height:'520px' }}>
      <img src="/images/instructeurs.jpg" alt="Votre Image" style={{ marginRight: '20px'  , height:'400px'}} />
      <div style={{ marginLeft:'250px'}} >
        <h2>NOS Particiapnt</h2>
        <p>Simple ne veut pas juste dire minimaliste et fonctionnel. </p> 
        <p> On peut faire simple tout en véhiculant beaucoup d’émotions. </p>      
        <button style={{backgroundColor:'#53B9CD'}} onClick={handleClick}>DEVENIR Participant</button>
      </div>
    </div>
  );
}

export default DevenirParticipant;
 
