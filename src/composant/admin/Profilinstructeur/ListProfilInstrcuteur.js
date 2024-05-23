import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope ,faEdit, faArchive, faUndo } from '@fortawesome/free-solid-svg-icons';
import ModalModifier from './ModalModifier';
import ModalArchiver from './ModalArchiver';
import ModalDesarchiver from './modalDesarchiver';

const ListeInstructeursAdmin = () => {
  const [instructeurs, setInstructeurs] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedInstructeur, setSelectedInstructeur] = useState(null);
  const [showModalModifier, setShowModalModifier] = useState(false);
  const [showModalArchiver, setShowModalArchiver] = useState(false);
  const [showModalDesarchiver, setShowModalDesarchiver] = useState(false);

  const fetchInstructeurs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/instructeur/`);
      const data = response.data;
      if (data.success) {
        const updatedInstructeurs = data.liste.map(instructeur => {
          if (instructeur.status === 0) {
            instructeur.status = 1; // Mettre à jour pour afficher le bouton "Désarchiver"
          } else {
            instructeur.status = 0; // Mettre à jour pour afficher le bouton "Archiver"
          }
          return instructeur;
        });
        setInstructeurs(updatedInstructeurs);
      } else {
        console.error('Response data is not as expected:', data);
      }
    } catch (error) {
      console.error('Error fetching instructeurs:', error);
    }
  };
  

  useEffect(() => {
    fetchInstructeurs();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModifierClick = (instructeur) => {
    setSelectedInstructeur(instructeur);
    setShowModalModifier(true);
  };

  const handleArchiverClick = (instructeur) => {
    setSelectedInstructeur(instructeur);
    // Mettre à jour directement l'état de l'instructeur pour afficher le bouton "Désarchiver"
    instructeur.status = 0; // Mettez à jour selon votre logique d'archivage
    setInstructeurs([...instructeurs]); // Mettre à jour l'état avec le nouvel instructeur
    setShowModalArchiver(true);
  };

  const handleDesarchiverClick = (instructeur) => {
    setSelectedInstructeur(instructeur);
    instructeur.status = 1; // Mettez à jour l'état de l'instructeur pour afficher le bouton "Archiver"
    setInstructeurs([...instructeurs]); // Mettre à jour l'état avec le nouvel instructeur
    setShowModalDesarchiver(true);
  };
  

  const startIndex = (page - 1) * 2;
  const endIndex = startIndex + 2;

  // Fonction de mise à jour des données de l'instructeur
  const updateParticipantData = (updatedUserData) => {
    setInstructeurs(prevState => {
      const updatedInstructeurs = prevState.map(instructeur => {
        if (instructeur.id === updatedUserData.id) {
          return { ...instructeur, ...updatedUserData };
        }
        return instructeur;
      });
      return updatedInstructeurs;
    });
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#818ea1' }}>
      <MDBContainer>
        <MDBRow>
          {instructeurs.slice(startIndex, endIndex).map((instructeur, index) => (
            <MDBCol md="5" className="mt-5" key={index}>
              <MDBCard style={{ borderRadius: '15px', marginBottom: '150px', marginLeft: '30px' }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={`http://localhost:3000/uploads/${instructeur.Avatar}`}
                        fluid
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="card-title">{instructeur.prenom} {instructeur.nom}</h5>
                      <p className="card-text">{instructeur.specialite}</p>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        <p className="card-text">{instructeur.tel}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        <p className="card-text">{instructeur.email}</p>
                      </div>
                      <div className="d-flex pt-1" style={{ borderRadius: '15px' }}>
                      <MDBBtn outline className="me-1 flex-grow-1" onClick={() => handleModifierClick(instructeur)} style={{ display: instructeur.status === 0 ? 'none' : 'block' }}>
  <FontAwesomeIcon icon={faEdit} className="me-2" />
  Modifier
</MDBBtn>

                        {instructeur.status === 0 ? (
                          <MDBBtn className="flex-grow-1" onClick={() => handleDesarchiverClick(instructeur)}>
                            <FontAwesomeIcon icon={faUndo} className="me-2" />
                            Désarchiver
                          </MDBBtn>
                        ) : (
                          <MDBBtn className="flex-grow-1" onClick={() => handleArchiverClick(instructeur)}>
                            <FontAwesomeIcon icon={faArchive} className="me-2" />
                            Archiver
                          </MDBBtn>
                        )}
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        <div className="d-flex justify-content-center mt-3" style={{ borderRadius: '15px', marginBottom: '210px' }}>
          <MDBBtn onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Précédent</MDBBtn>
          <MDBBtn onClick={() => handlePageChange(page + 1)} disabled={endIndex >= instructeurs.length}>Suivant</MDBBtn>
        </div>
      </MDBContainer>

      {/* Afficher le modal de modification uniquement si showModalModifier est true */}
      {showModalModifier && (
        <ModalModifier
          isOpen={showModalModifier}
          onClose={() => setShowModalModifier(false)}
          userData={selectedInstructeur}
          userId={selectedInstructeur.id} // Assurez-vous que vous avez une propriété id dans votre objet d'instructeur
          updateParticipantData={updateParticipantData} // Passer la fonction de mise à jour
          handleToastMessage={(message) => { /* Vous pouvez ajouter une fonction de gestion de messages toast si nécessaire */ }}
        />
      )}
      {showModalArchiver && (
        <ModalArchiver
          isOpen={showModalArchiver}
          onClose={() => setShowModalArchiver(false)}
          instructeur={selectedInstructeur}
          handleToastMessage={(message) => { /* Ajoutez une fonction de gestion de messages toast si nécessaire */ }}
          updateParticipantData={updateParticipantData}
        />
      )}
      {showModalDesarchiver && (
        <ModalDesarchiver
          isOpen={showModalDesarchiver}
          onClose={() => setShowModalDesarchiver(false)}
          instructeur={selectedInstructeur}
          handleToastMessage={(message) => { /* Ajoutez une fonction de gestion de messages toast si nécessaire */ }}
          updateParticipantData={updateParticipantData}
        />
      )}
    </div>
  );
}

export default ListeInstructeursAdmin;
