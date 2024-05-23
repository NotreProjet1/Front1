import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../css/iframm.css'; 


const SinglePublication = () => {
  const { id } = useParams();
  const [publication, setpublication] = useState(null);

  useEffect(() => {
    const fetchpublication = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/publication/getPublicationById/${id}`);
        setpublication(response.data.publication);
      } catch (error) {
        console.error('Erreur lors de la récupération de la publication :', error);
      }
    };

    fetchpublication();
  }, [id]);

  if (!publication) {
    return <div>Loading...</div>;
  }

  // Définition de la source du fichier à afficher dans l'iframe
  const fileSource = publication.contenu ? `http://localhost:3001/uploads/${publication.contenu}` : '';

  return (
    <div className="formation-details">
      <h1>publication  de <h2>{publication.titre}</h2></h1>
   
      <p>Description : {publication.description}</p>

      {publication.contenu && (
        <div className="formation-content">
          <h3>Contenu de la publication :</h3>
          <iframe title="Contenu de la publication" src={fileSource} width="100%" height="500px"></iframe>
          <a href={fileSource} download={publication.contenu.split('').pop()} target="_blank" rel="noopener noreferrer">
            Télécharger le fichier
          </a>
        </div>
      )}
  =
    </div>
  );
};

export default SinglePublication;