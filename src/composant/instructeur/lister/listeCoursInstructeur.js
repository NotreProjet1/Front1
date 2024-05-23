import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa'; // Importez FaSearch ici
import { Input } from '@mui/material';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

const ITEMS_PER_PAGE = 3;

const ListecoursInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [cours, setcours] = useState([]);
  const [selectedcours, setSelectedcours] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [coursToDelete, setcoursToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');


  const [TitreRecherche, setTitreRecherche] = useState('');

  const handleSubmitRecherche = async (e) => {
    e.preventDefault();
    try {
      if (TitreRecherche.trim() !== '') {
        const response = await axios.get(`http://localhost:3000/coursgratuis/rechercherByTitre?titre=${TitreRecherche}`);
        setcours(response.data.results);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de cours par titre:', error);
      toast.error('Erreur lors de la recherche de cours.');
    }
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);


  useEffect(() => {
    const fetchcours = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/coursgratuis/getcoursByInstructorId/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setcours(response.data.cours);
        }
      } catch (error) {
        console.error('Error fetching cours:', error);
      }
    };

    fetchcours();
  }, [instructeurId, token]);

  const handleSupprimer = async (id_cg) => {
    try {
      await axios.delete(`http://localhost:3000/coursgratuis/supprimer/${id_cg}`, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('Cours supprimé avec succès.');
      const updatedcours = cours.filter(form => form.id_cg !== id_cg);
      setcours(updatedcours);
      setModalConfirm(false);
    } catch (error) {
      console.error('Error deleting cours:', error);
      toast.error('Erreur lors de la suppression du cours.');
    }
  };

  const handleModifier = (cours) => {
    setSelectedcours(cours);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedcours(null);
  };

  const handleConfirmDelete = (cours) => {
    setModalConfirm(true);
    setcoursToDelete(cours);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setcoursToDelete(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedcours((prevcours) => ({
      ...prevcours,
      contenu: file,
    }));
  };

  const handleSubmitModifier = async (modifiedcours) => {
    try {
      const formData = new FormData();
      formData.append('titre', modifiedcours.titre);
      formData.append('description', modifiedcours.description);
      formData.append('contenu', modifiedcours.contenu);

      const response = await axios.put(`http://localhost:3000/coursgratuis/updatecoursInstrcutrur/${modifiedcours.id_cg}`, formData, {
        headers: {
          authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Cours modifié avec succès.');
      const updatedcours = cours.map(form => (form.id_cg === modifiedcours.id_cg ? modifiedcours : form));
      setcours(updatedcours);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating cours:', error);
      toast.error('Erreur lors de la modification du cours.');
    }
  };

  // Pagination
  const indexOfLastcours = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstcours = indexOfLastcours - ITEMS_PER_PAGE;
  const currentcours = cours && cours.length > 0 ? cours.slice(indexOfFirstcours, indexOfLastcours) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcul du nombre total de pages
  const totalPageCount = Math.ceil((cours && cours.length ? cours.length : 0) / ITEMS_PER_PAGE);
  const searchInputStyle = {
    flex: 1,
    padding: '5px',
    borderRadius: '20px 0 0 20px',
    border: '1px solid black',
    outline: 'none',
    width: '300px',
    fontSize: '16px',
    display: 'flex', // Utilisez Flexbox pour centrer le contenu
    alignItems: 'center', // Centrez verticalement le contenu
    justifyContent: 'center', // Centrez horizontalement le contenu
  };

  const searchButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderRadius: '0 20px 20px 0',
  };return (
    <div style={{ backgroundColor: '#efefef', padding: "20px", paddingBottom: "90px" }}>
      <h1 className="formations-title" style={{ textAlign: "center" }}>Liste des cours gratuits </h1>
      <form onSubmit={handleSubmitRecherche} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={TitreRecherche}
          onChange={(e) => setTitreRecherche(e.target.value)}
          placeholder="Rechercher par titre"
          style={{
            ...searchInputStyle,
            textAlign: 'center', // Centrer le texte
          }}
        />

        <button type="submit" style={searchButtonStyle}>
          <FaSearch />
        </button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', margin: '30px', marginTop: "80px" }}>
        {currentcours && currentcours.length > 0 ? (
          currentcours.map((cours) => (
            <div key={cours.id_cg} style={{ flex: '0 0 calc(33.33% - 20px)', backgroundColor: '#f8f9fa', border: '1px solid black', borderRadius: '8px', padding: '20px', transition: 'box-shadow 0.3s ease', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#343a40' }}>{cours.titre}</h2>
              <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>Description : {cours.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaEye style={{ marginRight: '5px' }} />
                  <Link to={`/coursgratuis/getCoursById/${cours.id_cg}`} style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease' }}>Voir les détails</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button style={{ backgroundColor: '#dc3545', color: '#fff', border: '1px solid #343a40', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={() => handleConfirmDelete(cours)}>Supprimer</button>
                  <button style={{ backgroundColor: '#28a745', color: '#fff', border: '1px solid #343a40', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={() => handleModifier(cours)}>Modifier</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Aucun cours trouvé.</div>
        )}

        {/* Pagination */}
        <MDBPagination
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '20px', // Ajustez la position verticale selon vos besoins
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '40px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: "0.5px solid black",
            marginBottom: "50px"
          }}
        >
          <MDBPaginationItem disabled={currentPage === 1}>
            <MDBPaginationLink onClick={() => paginate(currentPage - 1)} aria-label='Previous'>
              <span aria-hidden='true'>«</span>
            </MDBPaginationLink>
          </MDBPaginationItem>

          {Array(Math.ceil(cours.length / ITEMS_PER_PAGE))
            .fill()
            .map((_, i) => (
              <MDBPaginationItem key={i} active={i + 1 === currentPage}>
                <MDBPaginationLink onClick={() => paginate(i + 1)} style={{ backgroundColor: i + 1 === currentPage ? '#007bff' : 'transparent', color: i + 1 === currentPage ? '#fff' : '#007bff', border: '1px solid #007bff', margin: '0 5px', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                  {i + 1}
                </MDBPaginationLink>
              </MDBPaginationItem>
            ))}

          <MDBPaginationItem disabled={currentPage === Math.ceil(cours.length / ITEMS_PER_PAGE)}>
            <MDBPaginationLink onClick={() => paginate(currentPage + 1)} aria-label='Next'>
              <span aria-hidden='true'>»</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>


        {/* Modal pour modifier le cours */}
        {showModal && selectedcours && (
          <MDBModal open={showModal} onClose={handleCloseModal}>
            <MDBModalDialog>
              <MDBModalContent style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <MDBModalHeader style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '8px 8px 0 0' }}>
                  <MDBModalTitle>Modifier le cours</MDBModalTitle>
                  <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCloseModal}>X</MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitModifier(selectedcours);
                  }}>
                    <div>
                      <label htmlFor="titre">Titre:</label>
                      <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={selectedcours.titre}
                        onChange={(e) => setSelectedcours({ ...selectedcours, titre: e.target.value })}
                      />
                      <label htmlFor="description">Description:</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={selectedcours.description}
                        onChange={(e) => setSelectedcours({ ...selectedcours, description: e.target.value })}
                      />
                      <label htmlFor="contenu">Contenu:</label>
                      <Input
                        type="file"
                        id="contenuFileInput"
                        name="contenuFile"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        style={{ width: '100%', marginBottom: '10px' }}
                      />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Enregistrer</button>
                  </form>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        )}

        {/* Modal de confirmation de suppression */}
        <MDBModal open={modalConfirm} onClose={handleCancelDelete}>
          <MDBModalDialog>
            <MDBModalContent style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
              <MDBModalHeader style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MDBModalTitle>Supprimer ce cours</MDBModalTitle>
                <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCancelDelete}>X</MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <p>Êtes-vous sûr de vouloir supprimer ce cours ?</p>
              </MDBModalBody>
              <MDBModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MDBBtn color='danger' style={{ borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={() => handleSupprimer(coursToDelete.id_cg)}>Confirmer</MDBBtn>
                  <MDBBtn outline color='danger' style={{ borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleCancelDelete}>Annuler</MDBBtn>
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <ToastContainer />
      </div>
    </div>
  );
}

export default ListecoursInstructeur;

