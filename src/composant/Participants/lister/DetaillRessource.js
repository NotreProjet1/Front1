import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import '../../../css/singleResourceStyle.css';

const SingleRessource = () => {
  const { id } = useParams();
  const [ressource, setRessource] = useState(null);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Ressource/getRessourceGById/${id}`);
        setRessource(response.data.Ressource);
      } catch (error) {
        console.error('Erreur lors de la récupération de la ressource :', error);
      }
    };

    fetchRessource();
  }, [id]);

  if (!ressource) {
    return <div>Loading...</div>;
  }

  const fileSource = ressource.contenu ? `http://localhost:3000/uploads/${ressource.contenu}` : '';

  return (
    <div className="backgroundd-container">
      <div className="backgroundd-image">
        <div className="single-cours-container">
          <h1 className='aligneee'>Ressource de: {ressource.titre}</h1>
          <div className="cours-info">
            <p>Description : {ressource.description}</p>
          </div>
          <div className="cours-content">
            {ressource.contenu && (
              <div className="formation-content">
                <h3>Contenu de la ressource :</h3>
                <div className="file-preview">
                  <iframe title="Contenu de la ressource" src={fileSource}></iframe>
                </div>
                <a href={fileSource} download={ressource.contenu.split('.').pop()} target="_blank" rel="noopener noreferrer">
                  <button className="download-button">
                    Télécharger le fichier <FontAwesomeIcon icon={faDownload} />
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRessource;

