import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBIcon, MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaUserGraduate, FaBookOpen, FaChalkboardTeacher, FaLayerGroup } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
const FormationsListPayent = () => {
    const [formations, setFormations] = useState([]);
  
    const formationsPerPage = 2;
    const maxPagesDisplayed = 3;
    const [Courss, setCourss] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCoursForFormations = async (formationsData) => {
        const coursPromises = formationsData.map(async (formation) => {
            const response = await axios.get(`http://localhost:3000/coursPayant/formation/${formation.id_fp}/cours`);
            return response.data.cours;
        });

        return Promise.all(coursPromises);
    };

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/FormationP/lister`);
                const formationsData = response.data.liste;

                const coursForFormations = await fetchCoursForFormations(formationsData);
                const formationsWithCours = formationsData.map((formation, index) => ({
                    ...formation,
                    cours: coursForFormations[index]
                }));

                setFormations(formationsWithCours);
            } catch (error) {
                console.error('Erreur lors de la récupération des formations :', error);
            }
        };

        fetchFormations();
    }, []);

    const [domaineRecherche, setDomaineRecherche] = useState('');

    const handleSearchChange = async (event) => {
        const searchTerm = event.target.value.trim().toLowerCase();
        setSearchQuery(searchTerm);
    
        try {
          if (searchTerm) {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/formationP/searchByDomaine?domaine=${searchTerm}`);
            setSearchResults(response.data.liste || []);
            setNoResults(response.data.liste.length === 0);
          } else {
            setSearchResults([]);
            setNoResults(false);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des cours :', error);
        } finally {
          setLoading(false);
        }
      };
    
    
      const displayCourss = searchResults.length > 0 ? searchResults : Courss;
    const indexOfLastFormation = currentPage * formationsPerPage;
    const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
    const currentFormations = formations.slice(indexOfFirstFormation, indexOfLastFormation);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(formations.length / formationsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const styles = {
        iconText: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
        },
        icon: {
            marginLeft: '10px',
        },
        text: {
            margin: '0',
        }
    };
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(Math.ceil(formations.length / formationsPerPage), startPage + maxPagesDisplayed - 1);
    const handlePayment = async (formationId, amount) => {
        const token = localStorage.getItem('token');
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        const participantId = participantData.id_p; // Accéder directement à id_p
        console.log('Token from localStorage:', participantId);
        const config = {
            headers: {
                'Authorization': ` ${token}`, // Assurez-vous d'ajouter 'Bearer'
                'Content-Type': 'application/json' // Utilisez 'application/json' pour le type de contenu
            }
        };

        try {
            // Créer un nouveau paiement pour le montant donné
            const response = await axios.post('http://localhost:3000/Pa/paiment', { formation_id: formationId, amount, participantId }, config);
            // Passez l'ID de la formation ainsi que le montant dans la requête

            // Rediriger l'utilisateur vers le lien de paiement
            window.location.href = response.data.result.link;
        } catch (error) {
            console.error(error);
        }
    };


    return (

        <div className="formations-container" style={{ backgroundColor: '#efefef', padding: "20px" }}>

            <h1 className="formations-title" style={{ textAlign: "center" }}>Liste des formations payantes </h1>

            <input 
            className='rrecherche'
            type="text" 
            placeholder="Rechercher par domaine..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    {currentFormations.map(formation => (
                        <MDBCol md="6" lg="6" xl="6" className="mt-5" key={formation.id_fp}>
                            <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
                                <MDBCardBody className="p-4 text-black">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <p className="small mb-0"><MDBIcon far icon="clock me-2" />3 hrs</p>
                                        <p className="fw-bold mb-0">Prix: {formation.prix} $</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="flex-shrink-0">
                                            <MDBCardImage
                                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                                className="img-fluid rounded-circle border border-dark border-3"
                                                src={`http://localhost:3000/uploads/${formation.instructeur_Avatar}`}
                                                alt="Avatar"
                                                fluid
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <p className="mb-0 me-2">
                                                    <Link to={`/ProfilePage/${formation.instructeur_id}`}>
                                                        Voir profil
                                                    </Link>
                                                </p>
                                                <p className="mb-0">{`${formation.instructeur_prenom} ${formation.instructeur_nom}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-2">
                                                <FaBookOpen className={styles.icon} style={{ marginRight: "10px" }} />
                                                <MDBTypography tag="h6" className={styles.text}>
                                                    Titre: {formation.titre}
                                                </MDBTypography>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <FaChalkboardTeacher className={styles.icon} style={{ marginRight: "10px" }} />
                                                <MDBTypography tag="h6" className={styles.text}>
                                                    Description: {formation.description}
                                                </MDBTypography>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-2">
                                                <FaUserGraduate className={styles.icon} style={{ marginRight: "10px" }} />
                                                <MDBTypography tag="h6" className={styles.text}>
                                                    Niveaux: {formation.niveaux}
                                                </MDBTypography>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <FaLayerGroup className={styles.icon} style={{ marginRight: "10px" }} />
                                                <MDBTypography tag="h6" className={styles.text}>
                                                    Domaine: {formation.domaine}
                                                </MDBTypography>
                                            </div>
                                        </div>

                                    </div>




                                    <MDBBtn color="success" rounded block size="lg">
                                        <FaEye style={{ marginRight: '5px', marginBottom: "-10px" }} />
                                        <MDBBtn color="success" rounded block size="lg" onClick={() => handlePayment(formation.id_fp, formation.prix)}>
                                            Démarrer le Paiement
                                        </MDBBtn>

                                    </MDBBtn>
                                    <hr />
                                    <h5 className="mb-0">Cours Correspondant:</h5>
                                    {formation.cours.map(cour => (
                                        <React.Fragment key={cour.id_cp}>
                                            <MDBTypography tag="h5">{cour.titre}</MDBTypography>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <FaEye style={{ marginRight: '5px' }} />
                                                <Link to={`/coursPayant/getcoursById/${cour.id_cp}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease', marginBottom: "10px" }}>Voir les contenu de la cours</Link>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>
            {/* Pagination */}
            <ul className="pagination justify-content-center mt-4" style={{ border: "1px solid black", borderRadius: "10px", padding: "5px" }} >
                <li className="page-item">
                    <button onClick={goToPrevPage} className="page-link" disabled={currentPage === 1}>
                        <FaChevronLeft />
                    </button>
                </li>
                {[...Array(endPage - startPage + 1)].map((_, index) => (
                    <li key={index + startPage} className={`page-item ${currentPage === index + startPage ? 'active' : ''}`}>
                        <button onClick={() => paginate(index + startPage)} className="page-link">
                            {index + startPage}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button onClick={goToNextPage} className="page-link" disabled={currentPage === Math.ceil(formations.length / formationsPerPage)}>
                        <FaChevronRight />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default FormationsListPayent;

