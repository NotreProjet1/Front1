import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa';
import { Input } from '@mui/material';
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';

const ITEMS_PER_PAGE = 3;

const ListePublicationInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [TitreRecherche, setTitreRecherche] = useState('');
  const handleSubmitRecherche = async (e) => {
    e.preventDefault();
    try {
      if (TitreRecherche.trim() !== '') {
        const response = await axios.get(`http://localhost:3000/publication/rechercherByTitre?titre=${TitreRecherche}`);
        setPublications(response.data.Publications); 
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de publications par titre:', error);
      toast.error('Erreur lors de la recherche de publications.');
    }
  };
  

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/publication/publicationsInstructeur/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setPublications(response.data.publications);
        }
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };

    fetchPublications();
  }, [instructeurId, token]);

  const handleSupprimer = async (id_public) => {
    try {
        await axios.delete(`http://localhost:3000/publication/supprimer/${id_public}`, {
            headers: {
                authorization: ` ${token}`,
            },
        });
        toast.success('Publication supprimée avec succès.');
        const updatedPublications = publications.filter(pub => pub.id_public !== id_public);
        setPublications(updatedPublications);
        setModalConfirm(false);
    } catch (error) {
        console.error('Error deleting publication:', error);
        toast.error('Erreur lors de la suppression de la publication.');
    }
};


  const handleModifier = (publication) => {
    setSelectedPublication(publication);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPublication(null);
  };

  const handleConfirmDelete = (publication) => {
    setModalConfirm(true);
    setPublicationToDelete(publication);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setPublicationToDelete(null);
  };

  const handleSubmitModifier = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/publication/publicationInstructeurModifier/${selectedPublication.id_public}`, selectedPublication, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('Publication modifiée avec succès.');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating publication:', error);
      toast.error('Erreur lors de la modification de la publication.');
    }
  };

  // Pagination
  const indexOfLastPublication = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPublication = indexOfLastPublication - ITEMS_PER_PAGE;
  const currentPublications = publications && publications.length > 0 ? publications.slice(indexOfFirstPublication, indexOfLastPublication) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcul du nombre total de pages
  const totalPageCount = Math.ceil((publications && publications.length ? publications.length : 0) / ITEMS_PER_PAGE);
  const searchInputStyle = {
    flex: 1,
    padding: '5px',
    borderRadius: '20px 0 0 20px',
    border: '1px solid black',
    outline: 'none',
    width: '300px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  <div style={{ backgroundColor: '#efefef', padding: "20px", paddingBottom: "90px" }}>
      <h1 className="formations-title" style={{ textAlign: "center" }}>Liste des publications</h1>
      <form onSubmit={handleSubmitRecherche} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <input
              type="text"
              value={TitreRecherche}
              onChange={(e) => setTitreRecherche(e.target.value)}
              placeholder="Rechercher par titre"
              style={{
                  ...searchInputStyle,
                  textAlign: 'center',
              }}
          />

          <button type="submit" style={searchButtonStyle}>
              <FaSearch />
          </button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', margin: '30px', marginTop: "80px" }}>
          {currentPublications && currentPublications.length > 0 ? (
              currentPublications.map((publication) => (
                  <div key={publication.id_public} style={{ flex: '0 0 calc(33.33% - 20px)', backgroundColor: '#f8f9fa', border: '1px solid black', borderRadius: '8px', padding: '20px', transition: 'box-shadow 0.3s ease', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#343a40' }}>{publication.titre}</h2>
                      <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>Description : {publication.description}</p>
                      <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>Contenu : {publication.contenu}</p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <FaEye style={{ marginRight: '5px' }} />
                              <Link to={`/publications/getPublicationById/${publication.id_public}`} style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease' }}>Voir les détails</Link>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <button style={{ backgroundColor: '#dc3545', color: '#fff', border: '1px solid #343a40', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={() => handleConfirmDelete(publication)}>Supprimer</button>
                              <button style={{ backgroundColor: '#28a745', color: '#fff', border: '1px solid #343a40', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={() => handleModifier(publication)}>Modifier</button>
                          </div>
                      </div>
                  </div>
              ))
          ) : (
              <div>Aucune publication trouvée.</div>
          )}

          {/* Pagination */}
          <MDBPagination
              style={{
                  position: 'fixed',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '20px',
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

              {Array(Math.ceil(publications.length / ITEMS_PER_PAGE))
                  .fill()
                  .map((_, i) => (
                      <MDBPaginationItem key={i} active={i + 1 === currentPage}>
                          <MDBPaginationLink onClick={() => paginate(i + 1)} style={{ backgroundColor: i + 1 === currentPage ? '#007bff' : 'transparent', color: i + 1 === currentPage ? '#fff' : '#007bff', border: '1px solid #007bff', margin: '0 5px', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                              {i + 1}
                          </MDBPaginationLink>
                      </MDBPaginationItem>
                  ))}

              <MDBPaginationItem disabled={currentPage === Math.ceil(publications.length / ITEMS_PER_PAGE)}>
                  <MDBPaginationLink onClick={() => paginate(currentPage + 1)} aria-label='Next'>
                      <span aria-hidden='true'>»</span>
                  </MDBPaginationLink>
              </MDBPaginationItem>
          </MDBPagination>

          {/* Modal pour modifier la publication */}
          {showModal && selectedPublication && (
              <MDBModal open={showModal} onClose={handleCloseModal}>
                  <MDBModalDialog>
                      <MDBModalContent style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                          <MDBModalHeader style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '8px 8px 0 0' }}>
                              <MDBModalTitle>Modifier la publication</MDBModalTitle>
                              <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCloseModal}>X</MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                              <form onSubmit={handleSubmitModifier}>
                                  <div className="form-group">
                                      <label htmlFor="titre">Titre:</label>
                                      <input
                                          type="text"
                                          id="titre"
                                          name="titre"
                                          className="form-control"
                                          value={selectedPublication.titre}
                                          onChange={(e) => setSelectedPublication({ ...selectedPublication, titre: e.target.value })}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="description">Description:</label>
                                      <textarea
                                          id="description"
                                          name="description"
                                          className="form-control"
                                          value={selectedPublication.description}
                                          onChange={(e) => setSelectedPublication({ ...selectedPublication, description: e.target.value })}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="contenu">Contenu:</label>
                                      <textarea
                                          id="contenu"
                                          name="contenu"
                                          className="form-control"
                                          value={selectedPublication.contenu}
                                          onChange={(e) => setSelectedPublication({ ...selectedPublication, contenu: e.target.value })}
                                      />
                                  </div>
                                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                      <button type="submit" className="btn btn-success mr-2">Enregistrer</button>
                                      <button type="button" onClick={handleCloseModal} className="btn btn-danger">Annuler</button>
                                  </div>
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
                          <MDBModalTitle>Supprimer cette publication</MDBModalTitle>
                          <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCancelDelete}>X</MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                          <p>Êtes-vous sûr de vouloir supprimer cette publication ?</p>
                      </MDBModalBody>
                      <MDBModalFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <MDBBtn color='danger' style={{ borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={() => handleSupprimer(publicationToDelete.id_public)}>Confirmer</MDBBtn>
                          <MDBBtn outline color='danger' style={{ borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleCancelDelete}>Annuler</MDBBtn>
                      </MDBModalFooter>
                  </MDBModalContent>
              </MDBModalDialog>
          </MDBModal>


          <ToastContainer />
      </div>
  </div>
);
}

export default ListePublicationInstructeur;