import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { Input } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

const ListeFormationInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formationsPerPage] = useState(2);
  const [coursForFormations, setCoursForFormations] = useState({});
  const [domaineRecherche, setDomaineRecherche] = useState('');
  const [quizzesForFormations, setQuizzesForFormations] = useState({});

  const handleSubmitRecherche = async (e) => {
    e.preventDefault();
    try {
      if (domaineRecherche.trim() !== '') {
        const response = await axios.get(`http://localhost:3000/formationP/searchByDomaine?domaine=${domaineRecherche}`);
        setFormations(response.data.formations);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de formations par domaine:', error);
      toast.error('Erreur lors de la recherche de formations.');
    }
  };
  const fetchQuizzesByFormationId = async (formationId) => {
    try {
      const response = await axios.get(`http://localhost:3000/quizFinal/quizze/${formationId}`);
      return response.data.quiz[0];
    } catch (error) {
      console.error('Erreur lors de la récupération des quiz par ID de formation :', error);
      return null;
    }
  };

  const getQuizzesForFormation = async (formationId) => {
    try {
      const quiz = await fetchQuizzesByFormationId(formationId);
      setQuizzesForFormations((prevQuizzes) => ({
        ...prevQuizzes,
        [formationId]: quiz,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des quiz pour la formation :', error);
    }
  };
  useEffect(() => {
    const fetchQuizzesForAllFormations = async () => {
      try {
        await Promise.all(formations.map(async (formation) => {
          await getQuizzesForFormation(formation.id_fp);
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz pour toutes les formations :', error);
      }
    };

    fetchQuizzesForAllFormations();
  }, [formations]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
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

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/formationP/formations/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setFormations(response.data.formations);
        }
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormations();
  }, [instructeurId, token]);

  const handleSupprimer = async (id_fp) => {
    try {
      await axios.delete(`http://localhost:3000/formationP/supprimer/${id_fp}`, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('Formation supprimée avec succès.');
      const updatedFormations = formations.filter(form => form.id_fp !== id_fp);
      setFormations(updatedFormations);
      setModalConfirm(false);
    } catch (error) {
      console.error('Error deleting formation:', error);
      toast.error('Erreur lors de la suppression de la formation.');
    }
  };

  const handleModifier = (formation) => {
    setSelectedFormation(formation);
    setShowModal(true);
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
      // Ajoutez les autres champs de formation à formData comme vous le faites déjà
      const response = await axios.put(`http://localhost:3000/formationP/modifier/${modifiedFormation.id_fp}`, formData, {
        headers: {
          authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data', // Assurez-vous d'ajouter le Content-Type approprié
        },
      });
      toast.success('Formation modifiée avec succès.');
      const updatedFormations = formations.map(form => (form.id_fp === modifiedFormation.id_fp ? modifiedFormation : form));
      setFormations(updatedFormations);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating formation:', error);
      toast.error('Erreur lors de la modification de la formation.');
    }
  };

  // Pagination logic
  const indexOfLastFormation = currentPage * formationsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  const currentFormations = formations.slice(indexOfFirstFormation, indexOfLastFormation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchInputStyle = {
    flex: 1,
    padding: '5px',
    borderRadius: '20px 0 0 20px',
    border: '1px solid black',
    outline: 'none',
    width: "700px",
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
    <div style={containerStyle} >
      <h1 className="formations-title" style={{ textAlign: "center" }}>Liste des formations payantes </h1>
      <form onSubmit={handleSubmitRecherche} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={domaineRecherche}
          onChange={(e) => setDomaineRecherche(e.target.value)}
          placeholder="Rechercher par domaine"
          style={searchInputStyle}
        />
        <button type="submit" style={searchButtonStyle}>
          <FaSearch />
        </button>
      </form>
      <div className="card-row" style={cardRowStyle}>
        {currentFormations.map(formation => (
          <div className="card" key={formation.id_fp} style={cardStyle}>
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
              <h2 style={{ marginBottom: '10px' }}>{formation.titre}</h2>
              <p className="domaine-niveau" style={{ marginBottom: '10px' }}>Domaine : {formation.domaine} | Niveau : {formation.niveaux}</p>
              <p className="description" style={{ marginBottom: '10px' }}>Description : {formation.description}</p>
              <p className="prix" style={{ marginBottom: '10px' }}>Prix : {formation.prix}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaEye style={{ marginRight: '5px' }} />
              <Link to={`/formationP/getFormationById/${formation.id_fp}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease', marginBottom: "10px" }}>Voir plus de détails de la formation</Link>
            </div>
            </div>

            <div style={{ marginBottom: '20px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Quiz final :</h4>
              {quizzesForFormations[formation.id_fp] ? (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaEye style={{ marginRight: '5px' }} />
                  <Link
                    to={`/QuizfinalDetail/${quizzesForFormations[formation.id_fp].id_Q}`}
                    className="details-button"
                    style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #000', transition: 'border-color 0.3s ease' }}
                  >
                    {quizzesForFormations[formation.id_fp].Titre}
                  </Link>
                </div>
              ) : (
                <Link to={`/QuizForm/${formation.id_fp}`} className="btn btn-primary" style={{ marginBottom: '10px' }}> + Ajouter un quiz final pour cette formation </Link>
              )}
            </div>

            <div style={{ marginBottom: '20px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
              <h5 style={{ marginBottom: '10px' }}>Cours Correspondants :</h5>
              {coursForFormations[formation.id_fp] ? (
                <ul>
                  {coursForFormations[formation.id_fp].map(cour => (
                    <li key={cour.id_cp} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaEye style={{ marginRight: '5px' }} />
                        <Link to={`/coursPayantI/getcoursById/${cour.id_cp}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease' }}>
                          {cour.titre}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ marginBottom: '10px' }}>Aucun cours trouvé pour cette formation.</p>
              )}
              <Link to={`/AddCoursPayent/${formation.id_fp}`} className="btn btn-primary" style={{ marginBottom: '10px' }}> + Ajouter un cours</Link>
            </div>

            <div className="button-group" style={buttonGroupStyle}>
              <button className="supp" onClick={() => handleConfirmDelete(formation)} style={{ ...suppButtonStyle, marginRight: '10px' }}>Supprimer</button>
              <button className="modif" onClick={() => handleModifier(formation)} style={modifButtonStyle}>Modifier</button>
            </div>
          </div>

        ))}
      </div>

      <div style={paginationStyle}>
        <ul className="pagination justify-content-center mt-4" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: "0.5px solid black" }}>
          {formationsPerPage < formations.length && (
            <React.Fragment>
              {Array.from({ length: Math.ceil(formations.length / formationsPerPage) }, (_, index) => (
                <li key={index + 1} className="page-item" style={pageItemStyle}>
                  <button onClick={() => paginate(index + 1)} className="page-link" style={{ ...pageLinkStyle, ...(currentPage === index + 1 ? activePageLinkStyle : null) }}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </React.Fragment>
          )}
        </ul>
      </div>

      {showModal && selectedFormation && (
        <MDBModal
          animationDirection='right'
          open={showModal}
          tabIndex='-1'
          onClose={handleCloseModal}
        >
          <MDBModalDialog position='top-right' side>
            <MDBModalContent style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <MDBModalHeader style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '8px 8px 0 0' }}>
                <MDBModalTitle>Modifier la formation</MDBModalTitle>
                <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCloseModal}>X</MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitModifier(selectedFormation);
                }}>
                  <div>
                    <label htmlFor="titre">Titre:</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={selectedFormation.titre}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, titre: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedFormation.description}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, description: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="domaine">Domaine:</label>
                    <input
                      type="text"
                      id="domaine"
                      name="domaine"
                      value={selectedFormation.domaine}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, domaine: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="niveaux">niveaux:</label>
                    <input
                      type="text"
                      id="niveaux"
                      name="niveaux"
                      value={selectedFormation.niveaux}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, niveaux: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="certeficat">Certeficat:</label>
                    <input
                      type="text"
                      id="certeficat"
                      name="certeficat"
                      value={selectedFormation.certeficat}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, certeficat: e.target.value })}
                      style={inputStyle}
                    />    <label htmlFor="prix">prix:</label>
                    <input
                      type="text"
                      id="prix"
                      name="prix"
                      value={selectedFormation.prix}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, prix: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="plant">plant:</label>
                    <Input
                      type="file"
                      id="plantFileInput"
                      name="plantFile"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  </div>
                  <button type="submit" style={buttonStyle}>Enregistrer</button>
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
              <MDBModalTitle>Supprimer cette formation</MDBModalTitle>
              <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={handleCancelDelete}>X</MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Êtes-vous sûr de vouloir supprimer cette formation ?</p>
            </MDBModalBody>
            <hr style={{ color: "black" }} />
            <MDBModalFooter style={{ display: 'flex', justifyContent: 'space-between', borderTop: "1px solid black" }}>
              <MDBBtn color='info' onClick={() => handleSupprimer(formationToDelete.id_fp)}>Confirmer</MDBBtn>
              <MDBBtn outline color='info' onClick={handleCancelDelete}>Annuler</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <ToastContainer />
    </div>
  );
}
const cardRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  gap: '40px',
  marginTop: "20px"

};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#efefef', padding: "5px"
};
const cardContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gap: '20px',
  flexWrap: 'wrap',
};




const cardStyle = {
  width: '600px',
  border: "1px solid black",
  backgroundColor: '#9de2ff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const buttonGroupStyle = {
  display: 'flex',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px 0',
  gap: '10px',
};

const detailsButtonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  textDecoration: 'none',
};

const suppButtonStyle = {
  backgroundColor: '#ff1744',
  color: 'white',
};

const modifButtonStyle = {
  backgroundColor: '#2196f3',
  color: 'white',
};

const paginationStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const pageItemStyle = {
  margin: '0 5px',
};

const pageLinkStyle = {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};
const activePageLinkStyle = {
  backgroundColor: '#0056b3',
};

export default ListeFormationInstructeur;