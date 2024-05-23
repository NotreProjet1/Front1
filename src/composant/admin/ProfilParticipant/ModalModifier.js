// Importez useState dans votre code si ce n'est pas déjà fait
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../css/modal.css';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalModifier = ({ isOpen, onClose, userData, userId, updateParticipantData, handleToastMessage }) => {
  const [editedUserData, setEditedUserData] = useState(userData || {});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  useEffect(() => {
    setEditedUserData(userData || {});
  }, [userData]);

  const handleSaveChanges = async () => {
    try {
      // Vérifier si tous les champs requis sont remplis
      const requiredFields = ['nom', 'email', 'domaine', 'tel', 'specialite'];
      const newErrors = {};

      requiredFields.forEach(field => {
        if (!editedUserData[field]) {
          newErrors[field] = 'Ce champ est requis';
        }
      });

      // Mettre à jour l'état des erreurs
      setErrors(newErrors);

      // Vérifier s'il y a des erreurs
      if (Object.keys(newErrors).length > 0) {
        return; // Ne pas continuer si des erreurs sont présentes
      }

      // Si tous les champs requis sont remplis, continuer avec la sauvegarde
      const response = await axios.put(`http://localhost:3000/participant/modifier/${userId}`, editedUserData);

      if (response.status === 200) {
        handleToastMessage('Modifications sauvegardées avec succès !');

        // Mettre à jour les données de l'participant dans le composant parent
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
            {errors['nom'] && <span className="error-message">{errors['nom']}</span>}

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={editedUserData.emailP} onChange={handleInputChange} />
            {errors['email'] && <span className="error-message">{errors['email']}</span>}

            <label htmlFor="domaine">Domaine:</label>
            <input type="text" id="domaine" name="domaine" value={editedUserData.domaine} onChange={handleInputChange} />
            {errors['domaine'] && <span className="error-message">{errors['domaine']}</span>}

            <label htmlFor="tel">Téléphone:</label>
            <input type="tel" id="tel" name="tel" value={editedUserData.tel} onChange={handleInputChange} />
            {errors['tel'] && <span className="error-message">{errors['tel']}</span>}

            <label htmlFor="specialite">Spécialité:</label>
            <input type="text" id="specialite" name="specialite" value={editedUserData.categorie} onChange={handleInputChange} />
            {errors['specialite'] && <span className="error-message">{errors['specialite']}</span>}

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
