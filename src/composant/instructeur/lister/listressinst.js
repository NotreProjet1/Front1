import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { Input } from '@mui/material';
import { FaEye } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const ListeRessourceInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [Ressource, setRessource] = useState([]);
  const [selectedRessource, setSelectedRessource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [RessourceToDelete, setRessourceToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [RessourcePerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/Ressource/getRessourceByInstructorId/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setRessource(response.data.Ressource);
        }
      } catch (error) {
        console.error('Error fetching Ressource:', error);
      }
    };

    fetchRessource();
  }, [instructeurId, token]);

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

      const response = await axios.put(`http://localhost:3000/Ressource/updateRessourceInstructeur/${modifiedRessource.id_r}`, formData, {
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
  const handleSubmitRechercheRessource = async (e) => {
    e.preventDefault();
    try {
      if (searchTerm.trim() !== '') {
        const response = await axios.get(`http://localhost:3000/Ressource/rechercherByTitre?titre=${searchTerm}`);
        setRessource(response.data.results);
      } else {
        // Si le champ de recherche est vide, rechargez la liste complète de ressources
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de ressources par terme:', error);
      toast.error('Erreur lors de la recherche de ressources.');
    }
  };

  // Pagination
  const indexOfLastRessource = currentPage * RessourcePerPage;
  const indexOfFirstRessource = indexOfLastRessource - RessourcePerPage;
  const currentRessources = Ressource ? Ressource.slice(indexOfFirstRessource, indexOfLastRessource) : [];
  const totalRessources = Ressource ? Ressource.length : 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const searchInputStyle = {
    flex: 1,
    padding: '5px',
    borderRadius: '20px 0 0 20px',
    border: '1px solid black',
    outline: 'none',
    width: "300px",
    fontSize: '16px',
  };

  const searchButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderRadius: '0 20px 20px 0',
  };
  return (
    <div style={{ backgroundColor: '#efefef' }}>
      <h1 className="formations-title" style={{ textAlign: "center" }}>Liste des Ressource </h1>
      <form onSubmit={handleSubmitRechercheRessource} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par title"
          style={{ ...searchInputStyle, width: "200px" }} 
        />

        <button type="submit" style={searchButtonStyle}>
          <FaSearch />
        </button>
      </form>

      <div className="container" style={{ padding: '20px', marginTop: "40px" }}>

        <div className="row" >
          {currentRessources.map((Ressource, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{ border: '1px solid black', backgroundColor: "white", borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: "10px" }}>
                <h2 style={{ marginBottom: '10px' }}>{Ressource.titre}</h2>
                <p className="description" style={{ marginBottom: '20px' }}>Description : {Ressource.description}</p>
                <div className="button-container">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaEye style={{ marginRight: '5px' }} />
                    <Link to={`/Ressource/getRessourceGById/${Ressource.id_r}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease', marginBottom: "10px" }}>Voir les détails</Link>
                  </div>
                  <button className="supp" onClick={() => handleConfirmDelete(Ressource)} style={{ marginLeft: "20px", border: '1px solid black', marginRight: '150px', padding: '5px 10px', borderRadius: '5px', background: '#dc3545', color: '#fff', cursor: 'pointer' }}>Supprimer</button>
                  <button className="modif" onClick={() => handleModifier(Ressource)} style={{ border: '1px solid black', padding: '5px 10px', borderRadius: '5px', background: '#007bff', color: '#fff', cursor: 'pointer' }}>Modifier</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <ul className="pagination-list" style={{ display: 'flex', justifyContent: 'center' }}>
            {Array(Math.ceil(Ressource.length / RessourcePerPage))
              .fill()
              .map((_, i) => (
                <li key={i} className={currentPage === i + 1 ? 'active' : ''} style={{ listStyle: 'none', margin: '0 5px' }}>
                  <button onClick={() => paginate(i + 1)} style={{ padding: '5px 10px', borderRadius: '5px', background: currentPage === i + 1 ? '#007bff' : '#f8f9fa', color: currentPage === i + 1 ? '#fff' : '#007bff', border: '1px solid #007bff', cursor: 'pointer' }}>{i + 1}</button>
                </li>
              ))}
          </ul>
        </div>
        {showModal && selectedRessource && (
          <MDBModal
            animationDirection='right'
            open={showModal}
            tabIndex='-1'
            onClose={handleCloseModal}
          >
            <MDBModalDialog position='top-right' side>
              < MDBModalContent style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <MDBModalHeader style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '8px 8px 0 0' }}>
                  <MDBModalTitle>Modifier la Ressource</MDBModalTitle>
                  <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCloseModal}>X</MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitModifier(selectedRessource);
                  }}>
                    <div>
                      <label htmlFor="titre">Titre:</label>
                      <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={selectedRessource.titre}
                        onChange={(e) => setSelectedRessource({ ...selectedRessource, titre: e.target.value })}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                      <label htmlFor="description">Description:</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={selectedRessource.description}
                        onChange={(e) => setSelectedRessource({ ...selectedRessource, description: e.target.value })}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                      <label htmlFor="contenu">Contenu:</label>
                      <Input
                        type="file"
                        id="contenuFileInput"
                        name="contenuFile"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        className="file-input"
                        style={{ marginTop: "10px", marginBottom: '20px', width: '100%' }}
                      />
                    </div>
                    <button type="submit" style={{ padding: '5px 10px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Enregistrer</button>
                  </form>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        )}

        <MDBModal
          animationDirection='right'
          open={modalConfirm}
          tabIndex='-1'
          onClose={() => setModalConfirm(false)}
        >
          <MDBModalDialog position='top-right' side>
            <MDBModalContent style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
              <MDBModalHeader style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MDBModalTitle>Supprimer cette Ressource </MDBModalTitle>
                <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCancelDelete}>X</MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <p>Êtes-vous sûr de vouloir supprimer cette Ressource ?</p>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='info' onClick={() => handleSupprimer(RessourceToDelete.id_r)}>Confirmer</MDBBtn>
                <MDBBtn outline color='info' onClick={handleCancelDelete}>Annuler</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <ToastContainer />
      </div>
    </div>
  );
}

export default ListeRessourceInstructeur;