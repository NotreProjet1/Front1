import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faStar, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@mui/material';
import { faBook, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ message }) => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="card text-center p-4" style={{ width: '400px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid black', marginTop: "-200px" }}>
      <FontAwesomeIcon icon={faExclamationCircle} size="5x" color="red" style={{ marginBottom: '20px' }} />
      <p className="mb-0">{message}</p>
    </div>
  </div>
);

const ProfileCard = ({ instructeur }) => {
  return (
    <MDBCol className="mt-5 d-flex justify-content-center">
      <div style={{ background: '#ffffff', borderRadius: '15px', width: '600px', border: '1px solid black', padding: '30px', marginTop: "-200px", display: 'inline-block' }}>
        <div className="d-flex text-black align-items-center vertical-line-container" style={{ position: 'relative' }}>
          <div className="flex-shrink-0 position-relative" style={{ width: '200px', height: '200px', borderRadius: '10%', marginRight: '30px' }}>
            {instructeur && instructeur.Avatar ? (
              <Avatar src={`http://localhost:3000/uploads/${instructeur.Avatar}`} alt="Avatar" style={{ width: '200px', height: '200px', borderRadius: '10%' }} fluid />
            ) : (
              <Avatar src={`https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg`} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            )}
          </div>
          <hr className="vertical-line" style={{ position: 'absolute', borderLeft: "3px solid black", height: "100%", margin: "0 200px" }} />
          <div className="position-relative">
            <h3 className="card-title"><FontAwesomeIcon icon={faUser} className="me-2" /> {instructeur.prenom} {instructeur.nom}</h3><br />
            <p className="card-text"><FontAwesomeIcon icon={faUserGraduate} className="me-2" /> {instructeur.specialite}</p>
            <hr />
            <p className="card-text"><FontAwesomeIcon icon={faEnvelope} className="me-2" /> {instructeur.email}</p>
            <p className="card-text"><FontAwesomeIcon icon={faPhone} className="me-2" /> {instructeur.tel}</p>
            <hr />
            <div className="mt-3">
              <div className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faBook} className="me-2" style={{ color: 'green' }} />
                <span>{instructeur.count_formations} Formations</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" style={{ color: 'blue' }} />
                <span>{instructeur.count_cours_gratuits} Cours gratuits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MDBCol>
  );
};
const ProfilePage = () => {
  const [instructeur, setInstructeur] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { instructeur_id } = useParams();

  useEffect(() => {
    const fetchInstructeur = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/instructeur/getInstructeurById/${instructeur_id}`);
        const data = response.data;

        if (data.success) {
          const instructeurData = data.Instructeur;

          if (instructeurData.status === 1) {
            setErrorMessage("L'instructeur que vous recherchez n'est plus disponible");
          } else {
            const statsResponse = await axios.get(`http://localhost:3000/instructeur/instructeur/${instructeur_id}/stats`);
            const statsData = statsResponse.data;
            const instructeurWithStats = {
              ...instructeurData,
              count_formations: statsData.formationsCount,
              count_cours_gratuits: statsData.coursGratuitsCount
            };
            setInstructeur(instructeurWithStats);
          }
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error('Error fetching instructeur:', error);
        setErrorMessage("L'instructeur que vous recherchez n'est plus disponible");
      }
    };

    fetchInstructeur();
  }, [instructeur_id]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"

      style={{
        backgroundColor: 'hsl(218, 41%, 15%)',
        backgroundImage: 'radial-gradient(650px circle at 0% 0%, hsl(218, 41%, 35%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%), radial-gradient(1250px circle at 100% 100%, hsl(218, 41%, 45%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%)',
        minHeight: '90vh',
      }}


    >
      <div
        className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: '#9de2ff',
          opacity: '0',
        }}

      ></div>
      <MDBContainer>
        {errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          instructeur && <ProfileCard instructeur={instructeur} />
        )}
      </MDBContainer>
    </div>
  );
};

export default ProfilePage;

