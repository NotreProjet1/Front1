import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Button, Modal, TextField } from '@mui/material';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdb-react-ui-kit';

const defaultImageSrc = 'https://images.pexels.com/photos/8250994/pexels-photo-8250994.jpeg?auto=compress&cs=tinysrgb&w=600';

const ListeRessourceAdmin = () => {
  const [token, setToken] = useState('');
  const [Ressource, setRessource] = useState([]);
  const [selectedRessource, setSelectedRessource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [RessourceToDelete, setRessourceToDelete] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Ressource/liste`);
        setRessource(response.data.liste);
      } catch (error) {
        console.error('Error fetching Ressource:', error);
      }
    };

    fetchRessource();
  }, []);

  const handleSupprimer = async (id_r) => {
    try {
      await axios.delete(`http://localhost:3000/Ressource/supprimer/${id_r}`, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('Ressource supprimée avec succès.');
      const updatedRessource = Ressource.filter(form => form.id_r !== id_r);
      setRessource(updatedRessource);
      setModalConfirm(false);
    } catch (error) {
      console.error('Error deleting Ressource:', error);
      toast.error('Erreur lors de la suppression de la Ressource.');
    }
  };

  const handleModifier = (Ressource) => {
    setSelectedRessource(Ressource);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRessource(null);
  };

  const handleConfirmDelete = (Ressource) => {
    setModalConfirm(true);
    setRessourceToDelete(Ressource);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setRessourceToDelete(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedRessource((prevRessource) => ({
      ...prevRessource,
      contenu: file,
    }));
  };

  const handleSubmitModifier = async (modifiedRessource) => {
    try {
      const formData = new FormData();
      formData.append('titre', modifiedRessource.titre); 
      formData.append('description', modifiedRessource.description); 
      formData.append('contenu', modifiedRessource.contenu); 
   
      const response = await axios.put(`http://localhost:3000/Ressource/modifier/${modifiedRessource.id_r}`, formData, {
        headers: {
          authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Ressource modifiée avec succès.');
      const updatedRessource = Ressource.map(form => (form.id_r === modifiedRessource.id_r ? modifiedRessource : form));
      setRessource(updatedRessource);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating Ressource:', error);
      toast.error('Erreur lors de la modification de la Ressource.');
    }
  };

  const itemsPerPage = 2;
  const numPages = Math.ceil(Ressource.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedRessource = Ressource.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
      <div className="row">
        {paginatedRessource.map(Ressource => (
          <div className="col-md-6" key={Ressource.id_r}>
            <div className="mx-2 my-3">
              <MDBCard style={{ maxWidth: '22rem', backgroundColor: '#eee', marginLeft: '150px' }}>
                <MDBCardBody>
                  <MDBCardImage src={Ressource.image || defaultImageSrc} alt="Card image cap" top />
                  <MDBCardTitle>{Ressource.titre}</MDBCardTitle>
                  <MDBCardText>{Ressource.description}</MDBCardText>
                  <Link to={`/RessourceP/getRessourceById/${Ressource.id_r}`} className="details-button">Voir les détails</Link>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <Button onClick={() => handleModifier(Ressource)} variant="contained" color="primary" sx={{ borderRadius: '20px' }}>Modifier</Button>
                    <Button onClick={() => handleConfirmDelete(Ressource)} variant="contained" color="secondary" sx={{ borderRadius: '20px' }}>Supprimer</Button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        ))}
      </div>

      <Pagination count={numPages} page={page} onChange={(event, value) => setPage(value)} />

      <MDBModal
  animationDirection='right'
  open={showModal}
  toggle={handleCloseModal}
>
  <MDBModalHeader toggle={handleCloseModal}>Modifier la Ressource</MDBModalHeader>
  <MDBModalBody>
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmitModifier(selectedRessource);
    }}>
      <TextField label="Titre" value={selectedRessource?.titre} onChange={(e) => setSelectedRessource(prevState => ({ ...prevState, titre: e.target.value }))} fullWidth />
      <TextField label="Description" value={selectedRessource?.description} onChange={(e) => setSelectedRessource(prevState => ({ ...prevState, description: e.target.value }))} fullWidth />
      <input type="file" onChange={handleFileChange} />
    </form>
  </MDBModalBody>
  <MDBModalFooter> 
    <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmitModifier(selectedRessource)}>Enregistrer</Button>
    <Button variant="contained" color="secondary" onClick={handleCloseModal}>Annuler</Button>
  </MDBModalFooter>
</MDBModal>


      <MDBModal
        animationDirection='right'
        open={modalConfirm}
        toggle={handleCancelDelete}
      >
        <MDBModalHeader toggle={handleCancelDelete}>Confirmer la suppression</MDBModalHeader>
        <MDBModalBody>
          Êtes-vous sûr de vouloir supprimer cette ressource ?
        </MDBModalBody>
        <MDBModalFooter>
          <Button variant="contained" color="secondary" onClick={() => handleSupprimer(RessourceToDelete.id_r)}>Supprimer</Button>{' '}
          <Button variant="contained" onClick={handleCancelDelete}>Annuler</Button>
        </MDBModalFooter>
      </MDBModal>

      <ToastContainer />
    </div>
  );
}

export default ListeRessourceAdmin;
