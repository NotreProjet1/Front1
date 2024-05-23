import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Modal, Box, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaEye } from 'react-icons/fa';

const ListeFormationAdmin = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [cardsPerPage] = useState(3);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [coursForFormations, setCoursForFormations] = useState({});

  useEffect(() => {
    // Récupérer le token et l'id à partir du local storage
 
    const token = localStorage.getItem('token');
     const id_A = localStorage.getItem('id_A');
    setToken(token);
    setId(id);

    // Fetch des formations depuis le serveur en utilisant le token
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/formationP/lister`, {
          headers: {
            Authorization: ` ${token}` // Utiliser le token dans les headers de la requête
          }
        });
        setFormations(response.data.liste);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };
  
    fetchFormations();
  }, []);
  const fetchCoursForFormation = async (formationId) => {
    try {
      const response = await axios.get(`http://localhost:3000/coursPayant/formation/${formationId}/cours`);
      return response.data.cours;
    } catch (error) {
      console.error('Erreur lors de la récupération des cours pour la formation :', error);
      return [];
    }
  };
  useEffect(() => {
    const fetchCoursForAllFormations = async () => {
      try {
        const coursData = {};
        await Promise.all(formations.map(async (formation) => {
          const cours = await fetchCoursForFormation(formation.id_fp);
          coursData[formation.id_fp] = cours;
        }));
        setCoursForFormations(coursData);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours pour les formations :', error);
      }
    };

    fetchCoursForAllFormations();
  }, [formations]);


  // Pagination
  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = formations.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  
  const handleSupprimer = async (id_fp) => {
    try {
      await axios.delete(`http://localhost:3000/formationP/supprimer/${id_fp}`, {
        headers: {
          Authorization: ` ${token}`, // Utilisez le token dans les headers de la requête
        }
      });
      toast.success('Formation supprimée avec succès.');
      const updatedFormations = formations.filter(form => form.id_fp !== id_fp);
      setFormations(updatedFormations);
      setModalConfirm(false); // Fermer le modal de confirmation après la suppression
    } catch (error) {
      console.error('Error deleting formation:', error);
      toast.error('Erreur lors de la suppression de la formation.');
    }
  };
  
  const handleModifier = (formation) => {
    setSelectedFormation(formation); // Mettre à jour selectedFormation avec la formation à modifier
    setShowModal(true); // Afficher le modal de modification
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFormation(null); // Réinitialiser la formation sélectionnée
  };

  const handleConfirmDelete = (formation) => {
    setModalConfirm(true);
    setFormationToDelete(formation);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setFormationToDelete(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFormation((prevFormation) => ({
      ...prevFormation,
      plant: file,
    }));
  };

  const handleSubmitModifier = async (modifiedFormation) => {
    try {
      const formData = new FormData();
      formData.append('titre', modifiedFormation.titre); 
      formData.append('description', modifiedFormation.description); 
      formData.append('plant', modifiedFormation.plant); 
      formData.append('prix', modifiedFormation.prix); 
      formData.append('certeficat', modifiedFormation.certeficat); 
      formData.append('domaine', modifiedFormation.domaine); 
      formData.append('niveaux', modifiedFormation.niveaux); 
  
      const response = await axios.put(
        `http://localhost:3000/formationP/modifier/${modifiedFormation.id_fp}`,
        formData,
        {
          headers: {
            Authorization: ` ${token}`, // Utilisez le token dans les headers de la requête
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      toast.success('Formation modifiée avec succès.');
      const updatedFormations = formations.map(form =>
        form.id_fp === modifiedFormation.id_fp ? modifiedFormation : form
      );
      setFormations(updatedFormations);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating formation:', error);
      toast.error('Erreur lors de la modification de la formation.');
    }
  };


  return (
    <Grid container style={{marginTop:'20px'}} spacing={4}>
      {currentCards.map(formation => (
        <Grid item xs={12} sm={6} md={4} key={formation.id_fp}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" color="primary">
                {formation.titre}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                Domaine : {formation.domaine} | Niveau : {formation.niveaux}
              </Typography>
              <Typography variant="body2" component="p">
                Description : {formation.description}
              </Typography>
              <Typography variant="body2" component="p">
                Prix : {formation.prix}
              </Typography>
              <h5>Cours Correspondants :</h5>

{coursForFormations[formation.id_fp] ? (
  <ul>
    {coursForFormations[formation.id_fp].map(cour => (
      <li key={cour.id_cp}>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <FaEye style={{ marginRight: '5px' }} />
          <Link to={`/coursPayantI/getcoursById/${cour.id_cp}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease', marginBottom: "10px" }}>{cour.titre}</Link>
        </div>

      </li>
    ))}
  </ul>

) : (
  <p>Aucun cours trouvé pour cette formation.</p>
)}
  <h5>Quiz de foramtion :</h5>
              <Link to={`/formationP/getFormationById/${formation.id_fp}`} style={{ marginRight: '1rem', color: 'blue' }}>Voir les détails</Link>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
  <Button onClick={() => handleModifier(formation)} variant="contained" color="primary" sx={{ borderRadius: '20px' }}>Modifier</Button>
  <Button onClick={() => handleConfirmDelete(formation)} variant="contained" color="secondary" sx={{ borderRadius: '20px' }}>Supprimer</Button>
</div>

            </CardContent>
          </Card>
        </Grid>
      ))}

      <Stack spacing={2} style={{ marginTop: '2rem' , marginLeft:'570px' }}>
        <Pagination count={Math.ceil(formations.length / cardsPerPage)} page={page} onChange={handlePageChange} color="primary" />
      </Stack>

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Modifier la formation
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitModifier(selectedFormation);
            }}>
              <div>
                <TextField
                  label="Titre"
                  value={selectedFormation ? selectedFormation.titre : ''}
                  onChange={(e) => setSelectedFormation({ ...selectedFormation, titre: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  value={selectedFormation ? selectedFormation.description : ''}
                  onChange={(e) => setSelectedFormation({ ...selectedFormation, description: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Prix"
                  value={selectedFormation ? selectedFormation.prix : ''}
                  onChange={(e) => setSelectedFormation({ ...selectedFormation, prix: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Certificat"
                  value={selectedFormation ? selectedFormation.certeficat : ''}
                  onChange={(e) => setSelectedFormation({ ...selectedFormation, certeficat: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Domaine"
                  value={selectedFormation ? selectedFormation.domaine : ''}
                  onChange={(e) => setSelectedFormation({ ...selectedFormation, domaine: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Niveaux"
                  value={selectedFormation ? selectedFormation.niveaux : ''}
                  onChange={(e) => setSelectedFormation({ ...selectedFormation, niveaux: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </div>
              <Button type="submit" variant="contained" color="primary">
                Enregistrer
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={modalConfirm}
        onClose={handleCancelDelete}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Supprimer cette formation
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Êtes-vous sûr de vouloir supprimer cette formation ?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleSupprimer(formationToDelete ? formationToDelete.id_fp : '')}>
              Confirmer
            </Button>
            <Button variant="outlined" color="primary" onClick={handleCancelDelete} sx={{ ml: 2 }}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>

      <ToastContainer />
    </Grid>
  );
}

export default ListeFormationAdmin;
