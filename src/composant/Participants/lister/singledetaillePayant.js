import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { FaEye, FaUserGraduate, FaBookOpen, FaChalkboardTeacher, FaLayerGroup } from 'react-icons/fa';

const SingleFormationPPP = () => {
  const { formation_id } = useParams();
  const [formation, setFormation] = useState(null);
  const [cours, setCours] = useState([]);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/formationP/getFormationById/${formation_id}`);
        const formationData = response.data.formation;
        setFormation(formationData);

        // Fetch cours correspondants à la formation
        const coursResponse = await axios.get(`http://localhost:3000/coursPayant/formation/${formation_id}/cours`);
        setCours(coursResponse.data.cours);
      } catch (error) {
        console.error('Erreur lors de la récupération de la formation :', error);
      }
    };

    fetchFormation();
  }, [formation_id]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="formation-container" style={{ backgroundColor: '#efefef', padding: "20px" }}>
      <h1 className="formation-title" style={{ textAlign: "center" }}>Formation : {formation.titre}</h1>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="6" lg="6" xl="6" className="mt-5">
            <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
              <MDBCardBody className="p-4 text-black">
                {/* Contenu de la formation */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="small mb-0">Durée : {formation.duree}</p>
                  <p className="fw-bold mb-0">Prix: {formation.prix} DT</p>
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
                      <FaBookOpen style={{ marginRight: "10px" }} />
                      <MDBTypography tag="h6">
                        Titre: {formation.titre}
                      </MDBTypography>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaChalkboardTeacher style={{ marginRight: "10px" }} />
                      <MDBTypography tag="h6">
                        Description: {formation.description}
                      </MDBTypography>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-2">
                      <FaUserGraduate style={{ marginRight: "10px" }} />
                      <MDBTypography tag="h6">
                        Niveaux: {formation.niveaux}
                      </MDBTypography>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaLayerGroup style={{ marginRight: "10px" }} />
                      <MDBTypography tag="h6">
                        Domaine: {formation.domaine}
                      </MDBTypography>
                    </div>
                  </div>
                </div>
                <Link to={`/formationP/getFormationById/${formation.id_fp}`} className="details-button">Voir les détails</Link>
                <FaEye style={{ marginRight: '5px', marginBottom: "-10px" }} />
                <hr />
                <h5 className="mb-0">Cours Correspondants:</h5>
                {/* Affichage des cours correspondants */}
                {cours.map(cour => (
                  <React.Fragment key={cour.id_cp}>
                    <MDBTypography tag="h5">{cour.titre}</MDBTypography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FaEye style={{ marginRight: '5px' }} />
                      <Link to={`/coursPayant/getcoursById/${cour.id_cp}`} className="details-button" style={{ color: '#007bff', textDecoration: 'none', borderBottom: '2px solid #007bff', transition: 'border-color 0.3s ease', marginBottom: "10px" }}>Voir le contenu du cours</Link>
                    </div>
                  </React.Fragment>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SingleFormationPPP;

