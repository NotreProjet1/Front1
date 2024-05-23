import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../css/modal.css';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDesarchiver = ({ isOpen, onClose, instructeur, handleToastMessage, updateParticipantData }) => {
  const [loading, setLoading] = useState(false);

  const handleDesarchiver = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/instructeur/Desarchiver/${instructeur.id}`);

      if (response.status === 200) {
        handleToastMessage('Instructeur désarchivé avec succès !');
        updateParticipantData({ ...instructeur, statut: 0 });
        onClose();
      } else {
        console.error('Erreur lors du désarchivage de l\'instructeur :', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors du désarchivage de l\'instructeur :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Desarchiver l'instructeur"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <h2>Desarchiver l'instructeur</h2>
        <p>Êtes-vous sûr de vouloir désarchiver cet instructeur ?</p>
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
