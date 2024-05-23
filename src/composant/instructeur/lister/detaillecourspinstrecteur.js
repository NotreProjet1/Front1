import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import '../../../css/detillecourpinstrecteur.css';
import { FaEye } from 'react-icons/fa';

const SingleCoursPI = () => {
  const { id } = useParams();
  const [cours, setCours] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [contenu, setContenu] = useState('');
  const history = useHistory();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coursPayant/getcoursById/${id}`);
        const fetchedCours = response.data.cours[0];
        setCours(fetchedCours);
        setTitre(fetchedCours.titre);
        setDescription(fetchedCours.description);
        setContenu(fetchedCours.contenu);

        // Fetch quiz data after fetching course data
        fetchQuiz(fetchedCours.id_cp);
      } catch (error) {
        console.error('Erreur lors de la récupération du cours :', error);
      }
    };

    const fetchQuiz = async (courseId) => {
      try {
        const response = await axios.get(`http://localhost:3000/quiz/getQuizByCourseId/${courseId}`);
        setQuiz(response.data.Quiz);
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz du cours :', error);
      }
    };

    fetchCours();
  }, [id]);

  const openModifyModal = () => {
    setShowModifyModal(true);
  };

  const closeModifyModal = () => {
    setShowModifyModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Créez un objet FormData
      formData.append('titre', titre);
      formData.append('description', description);
      formData.append('contenu', contenu); // Ajoutez le contenu au FormData

      await axios.put(`http://localhost:3000/coursPayant/modifier/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Définissez le type de contenu sur multipart/form-data
        }
      });

      toast.success('Cours modifié avec succès.');
      closeModifyModal();

      // Après avoir modifié avec succès, récupérez à nouveau les données du cours actualisées
      const response = await axios.get(`http://localhost:3000/coursPayant/getcoursById/${id}`);
      const fetchedCours = response.data.cours[0];
      setCours(fetchedCours);
      setTitre(fetchedCours.titre);
      setDescription(fetchedCours.description);
      setContenu(fetchedCours.contenu);

    } catch (error) {
      console.error('Erreur lors de la modification du cours :', error);
      toast.error('Erreur lors de la modification du cours.');
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await axios.delete(`http://localhost:3000/coursPayant/supprimer/${id}`);
      closeDeleteModal();
      // Redirection après la suppression
      history.push('/ListeFormationInstructeur?userId=42');
    } catch (error) {
      console.error('Erreur lors de la suppression du cours :', error);
      // Gérer l'erreur de suppression
    }
  };

  if (!cours) {
    return <div>Loading...</div>;
  }

  const fileSource = contenu ? `http://localhost:3000/uploads/${contenu}` : '';

  return (
    <div className="background-container-new">
      <div className="background-image">
        <div className="single-cours-container-new">
          <h1 className="centered-title-new">Cours de : {cours.titre}</h1>

          <div className="cours-info-new">
            <p>Description : {cours.description}</p>

            <div>
              <h3>Quiz associés :</h3>
              <ul>
                {quiz.length === 0 ? (
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <FaEye style={{ marginRight: '5px' }} />
                    <Link to={`/AddQuiz/${cours.id_cp}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease', marginBottom: "10px" }}>Ajouter un Quiz blanc pour ce cours </Link>
                  </li>
                ) : (
                  quiz.map(q => (
                    <li key={q.id_q} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <FaEye style={{ marginRight: '5px' }} />
                      <Link to={`/UserQuizReview/${q.id_q}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease' }}>Voir le détail du quiz blanc - {q.titre}</Link>
                    </li>
                  ))
                )}
              </ul>
            </div>





          </div>

          <div className="cours-content-new">
            {cours.contenu && (
              <div className="formation-content">
                <h3>Contenu du cours :</h3>
                <div className="file-preview-new">
                  <iframe title="plan de la formation" src={fileSource}></iframe>
                </div>
              </div>
            )}
            <div className="button-container-new" style={{ display: "flex", justifyContent: "center", gap: "150px" }}>
              <button
                style={{ backgroundColor: "white", color: "green", transition: "background-color 0.3s, color 0.3s" }}
                onClick={openModifyModal}
                className="custom-button"
              >
                Modifier
              </button>

              <button
                style={{ backgroundColor: "white", color: "red", transition: "background-color 0.3s, color 0.3s" }}
                onClick={openDeleteModal}
                className="custom-button"
              >
                Supprimer
              </button>
            </div>
          </div>

        </div>
      </div>

      <MDBModal
        animationDirection='right'
        open={showModifyModal}
        onClose={closeModifyModal}
      >
        <MDBModalDialog position='top-right' side>
          <MDBModalContent style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <MDBModalHeader style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '8px 8px 0 0' }}>
              <MDBModalTitle>Modifier le cours</MDBModalTitle>
              <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={closeModifyModal}>X</MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleModifySubmit}>
                <div>
                  <label htmlFor="titre">Titre:</label>
                  <input
                    type="text"
                    id="titre"
                    name="titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                  <label htmlFor="contenu">Contenu:</label>
                  <input
                    type="file"
                    id="contenu"
                    name="contenu"
                    onChange={(e) => setContenu(e.target.files[0])} // Utilisez e.target.files[0] pour obtenir le fichier sélectionné
                    style={{ width: '100%', marginBottom: '10px' }}
                    required
                  />
                </div>
                <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '10px 0', gap: '10px' }}>Modifier</button>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal
        animationDirection='right'
        open={showDeleteModal}
        tabIndex='-1'
        onClose={closeDeleteModal}
      >
        <MDBModalDialog position='top-right' side>
          <MDBModalContent style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
            <MDBModalHeader style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <MDBModalTitle>Confirmer la suppression</MDBModalTitle>
              <MDBBtn style={{ color: 'red', backgroundColor: "white", width: "40px", height: "40px", borderRadius: "50%" }} onClick={closeDeleteModal}>X</MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Êtes-vous sûr de vouloir supprimer ce cours ?</p>
            </MDBModalBody>
            <MDBModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
              <MDBBtn color='info' onClick={handleDeleteSubmit}>Confirmer</MDBBtn>
              <MDBBtn outline color='info' onClick={closeDeleteModal}>Annuler</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <ToastContainer />
    </div>
  );
};

export default SingleCoursPI;
