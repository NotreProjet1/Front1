import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalArchiver = ({ isOpen, onClose, instructeur, handleToastMessage, updateParticipantData }) => {
  const handleArchive = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/instructeur/archiver/${instructeur.id}`);

      if (response.status === 200) {
        handleToastMessage('Instructeur archivé avec succès !');
        onClose();

        // Mettre à jour les données pour cacher le profil de l'instructeur archivé
        updateParticipantData({ ...instructeur, statut: 1 });
      } else {
        console.error('Erreur lors de l\'archivage de l\'instructeur :', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'instructeur :', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Archiver l'instructeur"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <h2>Archiver l'instructeur</h2>
        <div>
          {instructeur ? (
            <p>Êtes-vous sûr de vouloir archiver l'instructeur {instructeur.nom} {instructeur.prenom} ?</p>
          ) : (
            <p>Êtes-vous sûr de vouloir archiver cet instructeur ?</p>
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
