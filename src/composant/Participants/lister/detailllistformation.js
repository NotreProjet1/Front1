import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../css/detailleformation.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const SingleFormation = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/formationP/getFormationById/${id}`);
        setFormation(response.data.formation);
      } catch (error) {
        console.error('Erreur lors de la récupération de la formation :', error);
      }
    };

    fetchFormation();
  }, [id]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  const fileSource = formation.plant ? `http://localhost:3000/uploads/${formation.plant}` : '';
  
  return (
    <div className="backgrounnnd-container">
      <div className="backgrounnnd-image">
        <div className="formationn-details">
          <h1 className='hhh1'>Formation de <span>{formation.titre}</span></h1>
          <div className="formation-info">
            <div className="domaine-niveau">
              <p>Domaine : {formation.domaine}</p>
              <p>Niveau : {formation.niveaux}</p>

            </div>
            <p>Description : {formation.description}</p>

          </div>
          {formation.plant && (
            <div className="formation-content">
              <h3>Plan de la formation :</h3>
              <div className="file-preview">
                <iframe title="Plan de la formation" src={fileSource}></iframe>
              </div>
              <a href={fileSource} download={formation.plant.split('.').pop()} target="_blank" rel="noopener noreferrer">
                <button className="download-button">
                  Télécharger le fichier <FontAwesomeIcon icon={faDownload} />
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFormation;

