import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../css/modal.css';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalModifier = ({ isOpen, onClose, userData, userId, updateParticipantData, handleToastMessage }) => {
  const [editedUserData, setEditedUserData] = useState(userData || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  useEffect(() => {
    setEditedUserData(userData || {});
  }, [userData]);

  const handleSaveChanges = async () => {
    try {
      if (!userId) {
        console.error('ID du participant non défini');
        return;
      }

      const response = await axios.put(`http://localhost:3000/instructeur/modifier/${userId}`, editedUserData);

      if (response.status === 200) {
        handleToastMessage('Modifications sauvegardées avec succès !');

        // Mettre à jour les données de l'instructeur dans le composant parent
        updateParticipantData(editedUserData);

        onClose();
      } else {
        console.error('Erreur lors de l\'enregistrement des modifications :', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des modifications :', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modifier le profil"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <h2>Modifier le profil</h2>
        <div className="form-wrapper">
          <form>
            <label htmlFor="nom">Nom:</label>
            <input type="text" id="nom" name="nom" value={editedUserData.nom} onChange={handleInputChange} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={editedUserData.email} onChange={handleInputChange} />

            <label htmlFor="domaine">Domaine:</label>
            <input type="text" id="domaine" name="domaine" value={editedUserData.domaine} onChange={handleInputChange} />

            <label htmlFor="tel">Téléphone:</label>
            <input type="tel" id="tel" name="tel" value={editedUserData.tel} onChange={handleInputChange} />

            <label htmlFor="specialite">Spécialité:</label>
            <input type="text" id="specialite" name="specialite" value={editedUserData.specialite} onChange={handleInputChange} />

            <div className="button-wrapper">
              <MDBBtn className="btn-save" type="button" onClick={handleSaveChanges}>Enregistrer</MDBBtn>
              <MDBBtn className="btn-cancel" type="button" onClick={onClose}>Annuler</MDBBtn>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default ModalModifier;
