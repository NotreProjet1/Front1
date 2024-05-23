import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalArchiver = ({ isOpen, onClose, participant, handleToastMessage, updateParticipantData }) => {
  const handleArchive = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/participant/archiver/${participant.id_p}`);
  
      if (response.status === 200) {
        handleToastMessage('Participant archivé avec succès !');
  
        // Mettre à jour le statut du participant dans les données
        const updatedParticipant = { ...participant, status: 0 };
  
        // Fermer le modal d'archivage
        onClose();
  
        // Mettre à jour les données du participant dans la liste
        updateParticipantData(updatedParticipant);
      } else {
        console.error('Erreur lors de l\'archivage de l\'participant :', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'participant :', error);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Archiver l'participant"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <h2>Archiver l'participant</h2>
        <div>
          {participant ? (
            <p>Êtes-vous sûr de vouloir archiver l'participant {participant.nom} {participant.prenom} ?</p>
          ) : (
            <p>Êtes-vous sûr de vouloir archiver cet participant ?</p>
          )}
        </div>
        <div className="button-wrapper">
          <MDBBtn className="btn-archive" type="button" onClick={handleArchive}>Archiver</MDBBtn>
          <MDBBtn className="btn-cancel" type="button" onClick={onClose}>Annuler</MDBBtn>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default ModalArchiver;
