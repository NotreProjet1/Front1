import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../css/modal.css';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDesarchiver = ({ isOpen, onClose, participant, handleToastMessage, updateParticipantData }) => {
  const [loading, setLoading] = useState(false);

  const handleDesarchiver = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/participant/Desarchiver/${participant.id_p}`);
    
      if (response.status === 200) {
        handleToastMessage('Participant désarchivé avec succès !');
  
        // Mettre à jour le statut du participant dans les données
        const updatedParticipant = { ...participant, status: 0 };
  
        // Fermer le modal de désarchivage
        onClose();
  
        // Mettre à jour les données du participant dans la liste directement
        updateParticipantData(updatedParticipant);
      } else {
        console.error('Erreur lors de la désarchivage de l\'participant :', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la désarchivage de l\'participant :', error);
    }
  };
  
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Desarchiver l'participant"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <h2>Desarchiver l'participant</h2>
        <p>Êtes-vous sûr de vouloir désarchiver cet participant ?</p>
        <div className="button-wrapper">
          <MDBBtn className="btn-save" type="button" onClick={handleDesarchiver} disabled={loading}>
            {loading ? 'Chargement...' : 'Confirmer'}
          </MDBBtn>
          <MDBBtn className="btn-cancel" type="button" onClick={onClose} disabled={loading}>Annuler</MDBBtn>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default ModalDesarchiver;
