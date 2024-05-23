import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../css/modal.css';
import {
  MDBBtn,
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const UserProfileModal = ({ isOpen, onClose, userData, userId, updateParticipantData, fetchParticipantData, handleToastMessage }) => {
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
  
      const response = await axios.put(`http://localhost:3000/participant/modifier/${userId}`, editedUserData);
      
      if (response.status === 200) {
        handleToastMessage('Modifications sauvegardées avec succès !'); // Appel de la fonction handleToastMessage avec le message approprié

        console.log('Modifications sauvegardées :', editedUserData);
        saveEditedUserDataToLocalStorage(editedUserData);
        updateParticipantData(editedUserData);
        fetchParticipantData(userId);
        localStorage.setItem('participantData', JSON.stringify(editedUserData));


      


        onClose();
     
      } else {
        console.error('Erreur lors de l\'enregistrement des modifications :', response.data.error);
        
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des modifications :', error);

    }
  };
  const saveEditedUserDataToLocalStorage = (data) => {
    localStorage.setItem('editedUserData', JSON.stringify(data));
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
            <input type="email" id="email" name="email" value={editedUserData.emailP} onChange={handleInputChange} />

            <label htmlFor="categorie">Catégorie:</label>
            <input type="text" id="categorie" name="categorie" value={editedUserData.categorie} onChange={handleInputChange} />

            <label htmlFor="tel">Téléphone:</label>
            <input type="tel" id="tel" name="tel" value={editedUserData.tel} onChange={handleInputChange} />

            <label htmlFor="domaine">Domaine:</label>
            <input type="text" id="domaine" name="domaine" value={editedUserData.domaine} onChange={handleInputChange} />

            <div className="button-wrapper">
            <MDBBtn className="btn-save" type="button" onClick={handleSaveChanges} >Enregistrer</MDBBtn>
              <MDBBtn className="btn-cancel" type="button" onClick={onClose} >Annuler</MDBBtn>

            </div>
          </form>
        </div>
      </div>
      <ToastContainer />

    </Modal>
    
  );
};

export default UserProfileModal;
