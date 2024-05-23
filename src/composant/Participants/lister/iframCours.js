import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../css/SingleCours.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const SingleCours = () => {
  const { id } = useParams();
  const [cours, setCours] = useState(null);

  useEffect(() => {
    const fetchCoursG = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coursgratuis/getCoursGById/${id}`);
        setCours(response.data.cours);
      } catch (error) {
        console.error('Erreur lors de la récupération du cours :', error);
      }
    };

    fetchCoursG();
  }, [id]);

  if (!cours) {
    return <div>Loading...</div>;
  }

  const fileSource = cours.contenu ? `http://localhost:3000/uploads/${cours.contenu}` : '';

  return (
    <div className="backgrounddd-container">
      <div className="backgrounddd-image">
        <div className="single-cours-container">
        <h1 className="centeredd-title">Cours de : {cours.titre}</h1>
          <div className="cours-info">
            <p>Description : {cours.description}</p>
          </div>
          <div className="cours-content">
            {cours.contenu && (
              <div className="formation-content">
                <h3>Contenu du cours :</h3>
                <div className="file-preview">
                  <iframe title="Contenu du cours" className='iframeee' src={fileSource}></iframe>
                </div>
                <a href={fileSource} download={cours.contenu.split('.').pop()} target="_blank" rel="noopener noreferrer">
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

export default SingleCours;

