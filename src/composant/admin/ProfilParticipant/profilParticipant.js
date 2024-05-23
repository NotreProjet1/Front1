import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Avatar } from '@mui/material';

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import ModalArchiver from '../../admin/ProfilParticipant/ModalArchiver';
import ModalDesarchiver from '../../admin/ProfilParticipant/modalDesarchiver';
import ModalModifier from '../ProfilParticipant/ModalModifier'; // Importez le composant ModalModifier

const ProfilParticipant = () => {
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalArchiver, setShowModalArchiver] = useState(false);
  const [showModalDesarchiver, setShowModalDesarchiver] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showModalModifier, setShowModalModifier] = useState(false); // Nouvel état pour le modal de modification
  const [editedParticipant, setEditedParticipant] = useState(null); // État pour stocker les données du participant en cours de modification

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/participant/');
        const data = response.data;
        if (data.success) {
          const updatedParticipants = data.participants.map(participant => {
            if (participant.status === 'archived') {
              participant.status = 0;
            } else {
              participant.status = 1;
            }
            return participant;
          });
          setParticipants(updatedParticipants);
        } else {
          console.error('Response data is not as expected:', data);
        }
      } catch (error) {
        console.error('Error fetching participant data:', error);
      }
    };

    fetchParticipants();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleModifierClick = (participant) => {
    setSelectedParticipant(participant);
    setEditedParticipant(participant); // Mettez à jour l'état de l'participant en cours de modification
    if (participant.id_p) {
      setShowModalModifier(true); // Ouvrez le modal de modification uniquement si l'ID du participant est défini
    } else {
      console.error('ID du participant non défini');
    }
  };

  const handleArchiverClick = (participant) => {
    setSelectedParticipant(participant);
    setShowModalArchiver(true);
  };

  const handleDesarchiverClick = (participant) => {
    setSelectedParticipant(participant);
    setShowModalDesarchiver(true);
  };

  const indexOfLastCard = currentPage * 2;
  const indexOfFirstCard = indexOfLastCard - 2;
  const currentParticipants = participants.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const updateParticipantData = (updatedUserData) => {
    setParticipants(prevState => {
      const updatedParticipants = prevState.map(participants => {
        if (participants.id_p === updatedUserData.id_p) {
          return { ...participants, ...updatedUserData };
        }
        return participants;
      });
      return updatedParticipants;
    });
  };
  
  return (
    <div style={{ backgroundColor: '#818ea1', minHeight: '100vh' }}> {/* Style pour l'arrière-plan de toute la page */}
      <MDBContainer>
        <MDBRow>
          {currentParticipants.map((participant) => (
            <MDBCol md="6" key={participant.id}>
              <MDBCard style={{ borderRadius: '15px', marginTop: '40px', backgroundColor: '#9de2ff' }}>
                <MDBCardBody className="text-center" style={{ height: '350px' }}>
                  <Avatar src={`http://localhost:3000/uploads/${participant.Avatar}`} alt="Avatar" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
                  <MDBTypography tag="h4">{participant.prenom} {participant.nom}</MDBTypography>
                  <MDBTypography tag="p" className="text-muted mb-4">
                    {participant.email} <span className="mx-2">|</span> <a href="#!">{participant.domaine}</a>
                  </MDBTypography>

                  {participant.status === 0 ? (
                    <MDBBtn rounded size="lg" onClick={() => handleDesarchiverClick(participant)}>
                      Désarchiver
                    </MDBBtn>
                  ) : (
                    <>
                      <MDBBtn rounded size="lg" onClick={() => handleModifierClick(participant)}>
                        Modifier
                      </MDBBtn>
                      <MDBBtn rounded size="lg" onClick={() => handleArchiverClick(participant)}>
                        Archiver
                      </MDBBtn>
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        <MDBRow>
          <MDBCol className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {Array.from({ length: Math.ceil(participants.length / 2) }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          </MDBCol>
        </MDBRow>

        {/* Modal de modification */}
        <ModalModifier
          isOpen={showModalModifier}
          onClose={() => setShowModalModifier(false)}
          userData={editedParticipant} // Passez les données du participant en cours de modification
          userId={editedParticipant ? editedParticipant.id_p : null} // Passez l'ID du participant en cours de modification
          updateParticipantData={updateParticipantData} // Passez la fonction de mise à jour des données du participant
          handleToastMessage={(message) => { /* Ajoutez une fonction de gestion de messages toast si nécessaire */ }}
        />

        {/* Modal d'archivage */}
        <ModalArchiver
          isOpen={showModalArchiver}
          onClose={() => setShowModalArchiver(false)}
          participant={selectedParticipant}
          handleToastMessage={(message) => { /* Ajoutez une fonction de gestion de messages toast si nécessaire */ }}
          updateParticipantData={updateParticipantData}
        />

        {/* Modal de désarchivage */}
        <ModalDesarchiver
          isOpen={showModalDesarchiver}
          onClose={() => setShowModalDesarchiver(false)}
          participant={selectedParticipant}
          handleToastMessage={(message) => { /* Ajoutez une fonction de gestion de messages toast si nécessaire */ }}
          updateParticipantData={updateParticipantData}
        />
      </MDBContainer>
    </div>
  );
};

export default ProfilParticipant;
