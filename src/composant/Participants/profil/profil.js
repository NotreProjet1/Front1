import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserProfileModal from './model';
import { FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { Avatar, Modal, Typography, Button } from '@mui/material';

const UserProfilParticipant = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [participantData, setParticipantData] = useState(location.state ? location.state.participantData : null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [participantFormations, setParticipantFormations] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not available');
      }
      await axios.delete(`http://localhost:3000/participant/supprimer/${participantData.id_p}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Compte supprimé avec succès.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('participantData');
        localStorage.removeItem('isLoggedIn');

        history.push('/'); 
        window.location.reload();

      }, 2000);
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Erreur lors de la suppression du compte.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fetchParticipantData = async (participantId) => {
    try {
      const editedUserDataFromLocalStorage = localStorage.getItem('editedUserData');
      if (editedUserDataFromLocalStorage) {
        localStorage.setItem('participantData', JSON.stringify(editedUserDataFromLocalStorage));

      }
      else {
        const response = await axios.get(`http://localhost:3000/participant/${participantId}`);
        setParticipantData(response.data.participant);
        localStorage.setItem('participantData', JSON.stringify(response.data.participant));

      }
    } catch (error) {
      console.error('Error fetching participant data:', error);
    }
  };
  useEffect(() => {
    const fetchParticipantFormations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/formationP/getParticipantFormations/${participantData.id_p}`);
        setParticipantFormations(response.data);
      } catch (error) {
        console.error('Error fetching participant formations:', error);
      }
    };
    fetchParticipantFormations();
    console.log(participantFormations);
  }, [id]);


  useEffect(() => {
    const storedParticipantData = localStorage.getItem('participantData');
    if (storedParticipantData) {
      setParticipantData(JSON.parse(storedParticipantData));
    }
  }, []);
  const handleUpdateParticipantData = (updatedData) => {
    setParticipantData(updatedData);
    toast.success('Données mises à jour avec succès !', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  const handleAvatarUpload = async (event) => {
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const response = await axios.put(`http://localhost:3000/participant/avatar/${participantData.id_p}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setParticipantData(response.data.participant);
        localStorage.setItem('participantData', JSON.stringify(response.data.participant));

        setIsAvatarModalOpen(false);

        // Afficher le message toast
        toast.success('Avatar ajouté avec succès !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Recharger la page après un délai
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error('Veuillez sélectionner un fichier image.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleOpenAvatarModal = () => {
    setIsAvatarModalOpen(true);
    setIsProfileModalOpen(false);
  };

  const handleCloseAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsAvatarModalOpen(false);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const handleToastMessage = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <section style={{ borderTop: "2px solid #000", borderTopColor: "black", background: 'linear-gradient(to bottom, #757575 10%, white 40%, #757575 60%)' }}>

      <MDBContainer className="py-5" style={{ marginTop: "-30px", }}>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4" style={{ border: "2px solid #000", borderTopColor: "black", borderRightColor: "black", borderBottomColor: "black", borderLeftColor: "black" }}>
              <MDBBreadcrumbItem active> {participantData && participantData.prenom}  {participantData && participantData.nom ? ` ${participantData.nom}` : ''} Profile</MDBBreadcrumbItem>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setIsDeleteModalOpen(true)}
                style={{ backgroundColor: "red" ,position:"absolute",right:"1px",marginRight:"130px",borderRadius:"50%",height:"50px",width:"40px",marginTop:"-12px" }}
                title="Supprimer le compte"

             >
                <DeleteIcon />
              </Button>
            </MDBBreadcrumb>

          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center" style={{ border: "2px solid #000", borderTopColor: "black", borderRightColor: "black", borderBottomColor: "black", borderLeftColor: "black", borderRadius: "10px" }}>
                <div className="d-flex justify-content-center mb-2">

                  <div className="flex-shrink-0 position-relative">

                    {participantData && participantData.Avatar ? (
                      <>
                        <Avatar src={`http://localhost:3000/uploads/${participantData.Avatar}`} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        <div className="edit-icon" onClick={handleOpenAvatarModal}>
                          <FaEdit />
                        </div>
                      </>
                    ) : (
                      <div className="avatar-placeholder">
                        <MDBBtn onClick={handleOpenAvatarModal} style={{ width: '100px', height: '100px', borderRadius: '50%', fontSize: '24px' }}>+</MDBBtn>
                      </div>
                    )}

                  </div>
                </div>

              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0" style={{ border: "2px solid black" }}>
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {participantFormations.map(formation => (
                    <MDBListGroupItem key={formation.id_fp} className="d-flex align-items-start p-3">
                      <div className="me-3">
                        <MDBIcon fas icon="book-open fa-lg" style={{ color: '#007bff' }} />
                      </div>
                      <div>
                        <div className="mb-2">
                          <h5 className="fw-bold mb-1">{formation.titre}</h5>
                          <div className="mb-2">
                            <span className="fw-bold me-1">Description:</span> {formation.description}
                          </div>
                          <div className="d-flex align-items-center" style={{ borderRadius: "10px", border: "1px solid black ", backgroundColor: "gray", color: 'white', paddingLeft: "10px" }}>
                            <FaEye style={{ marginRight: '5px' }} />
                            <Link to={`/Formation/getformationById/${formation.id_fp}`} className="details-button" style={{ color: "white" }}>Voir les détails</Link>
                          </div>
                        </div>
                      </div>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>






          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4" style={{ border: "2px solid #000", borderTopColor: "black", borderRightColor: "black", borderBottomColor: "black", borderLeftColor: "black" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.emailP}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>categorie  </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.categorie}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.tel}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>domaine</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.domaine}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <section style={{ justifyContent: "center", display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <MDBBtn onClick={handleOpenProfileModal} style={{ marginBottom: "-100px" }}  >Modifier vos donne </MDBBtn>
                </section>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <Modal open={isAvatarModalOpen} onClose={handleCloseAvatarModal}>
          <div className="modal-content" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
            <input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} />
            <Button onClick={handleAvatarUpload} variant="contained" color="primary">Envoyer</Button>
          </div>
        </Modal>
        {isProfileModalOpen && (
          <UserProfileModal
            isOpen={isProfileModalOpen} // Corrected
            handleToastMessage={handleToastMessage} // Pass the handleToastMessage function
            onClose={handleCloseProfileModal}
            userData={participantData}
            userId={participantData.id_p}
            updateParticipantData={handleUpdateParticipantData}
            fetchParticipantData={fetchParticipantData}
          />
        )}
        <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <div className='modal-content'>
            <Typography variant='h6'>Confirmer la suppression du compte ?</Typography>
            <Button onClick={handleDeleteAccount} variant='contained' color='secondary'>
              Supprimer
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)} variant='contained'>
              Annuler
            </Button>
          </div>
        </Modal>
      </MDBContainer>
      <ToastContainer />
    </section>
  );
};

export default UserProfilParticipant;

