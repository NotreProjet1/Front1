import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

function PublicationParticipant() {
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupérer l'ID du participant à partir du localStorage
    const participantData = JSON.parse(localStorage.getItem('participantData'));
    const participantId = participantData ? participantData.id_p : null;

    // Récupérer le token à partir du localStorage
    const token = localStorage.getItem('token');

    // Données du formulaire de publication
    const formData = {
      titre: e.target.title.value,
      description: e.target.description.value,
      contenu: e.target.content.value,
      id_participant: participantId // Inclure l'ID du participant dans les données du formulaire
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/publication/ajouterParticipant',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Inclure le token dans les en-têtes
          },
        }
      );

      if (response.status === 201) {
        // Publication réussie
        alert('Publication créée avec succès.');
        history.push('/'); // Rediriger l'utilisateur vers une autre page après la publication
      }
    } catch (error) {
      // Erreur lors de la publication
      console.error('Erreur lors de la publication :', error);
      alert('Erreur lors de la publication. Veuillez réessayer.');
    }
  };

  return (
    <div style={{ backgroundColor: '#8A2BE2', minHeight: '100vh' }}> {/* Ajout de la couleur d'arrière-plan violet */}
      <MDBContainer className="my-5 d-flex justify-content-center">
        <MDBCard style={{ maxWidth: '900px' }}>
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
            </MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-column align-items-center mt-2'>
                  <MDBIcon fas icon="cubes fa-3x mb-3" style={{ color: '#ff6219' }}/>
                  <span className="h1 fw-bold mb-0 text-center">Publication</span>
                </div>
                <h5 className="fw-normal my-4 pb-3 text-center" style={{letterSpacing: '1px'}}>Ajouter une publication</h5>
                <form onSubmit={handleSubmit}>
                  <MDBInput wrapperClass='mb-4'  label='Titre' id='title' type='text' size="lg"/>
                  <MDBInput wrapperClass='mb-4' label='Description' id='description' type='text' size="lg"/>
                  <MDBInput wrapperClass='mb-4' label='Content' id='content' type='text' size="lg"/>
                  <div className="d-flex justify-content-center">
                    <MDBBtn type="submit" className="mb-4 px-5" color='dark' size='lg'>Publier</MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default PublicationParticipant;
