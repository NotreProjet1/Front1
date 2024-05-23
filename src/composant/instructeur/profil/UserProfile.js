import UserSidebar from '../profil/UserSidebar';
import { Card, Avatar, Typography, Modal, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './UserProfile.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [instructeurData, setinstructeurData] = useState(() => {
    // Load instructeurData from localStorage if available
    const storedData = localStorage.getItem('instructeurData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activepage } = useParams();
  const [avatarFile, setAvatarFile] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not available');
      }
      await axios.delete(`http://localhost:3000/instructeur/supprimer/${instructeurData.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Compte supprimé avec succès.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('instructeurData');
        localStorage.removeItem('isLoggedIn');
        history.push('/');
        window.location.reload();
      }, 3000);
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


  useEffect(() => {
    const getAxiosInstance = () => {

      const token = localStorage.getItem('token');
      const instance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return instance;
    };

    const fetchinstructeurData = async () => {
      try {
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.get(`/instructeur/${id}`);
        setinstructeurData(response.data.Instructeur);
        // Store instructeurData in localStorage
        localStorage.setItem('instructeurData', JSON.stringify(response.data.Instructeur));


      } catch (error) {
        console.error('Error fetching instructeur data:', error);
      }
    };

    if (!instructeurData && id) {
      fetchinstructeurData(id);
    }
  }, [id, instructeurData]);

  const updateUserProfileData = (updatedData) => {
    setinstructeurData(updatedData);
  };

  const handleAvatarUpload = async (event) => {
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const response = await axios.put(`http://localhost:3000/instructeur/avatar/${instructeurData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setinstructeurData(response.data.Instructeur);
        localStorage.setItem('instructeurData', JSON.stringify(response.data.Instructeur));

        closeModal(response.data.Instructeur);

        toast.success('Avatar ajouté avec succès !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
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
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className='userprofile'>
      <div className='profile-banner'>
      </div>

      <div className='userprofilein'>
        <div className='left'>
          <UserSidebar activepage={activepage} userId={instructeurData && instructeurData.id} userdata={instructeurData} updateUserProfileData={updateUserProfileData} />
        </div>
        <div className='right' style={{ backgroundColor: "#f5f5f5", border: "2px solid #000", borderTopColor: "black", borderRightColor: "black", borderBottomColor: "black", borderLeftColor: "black", borderRadius: "10px" }}>
          <Card className='profile-card' style={{ marginTop: '10px' }}>
            <div className="card-body p-4">
              <div className="d-flex text-black align-items-center">
                <div className="flex-shrink-0 position-relative">
                  {instructeurData && instructeurData.Avatar ? (
                    <>
                      <Avatar src={`http://localhost:3000/uploads/${instructeurData.Avatar}`} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                      {/* Edit icon */}
                      <div className="edit-icon" onClick={openModal}>
                        <FaEdit />
                      </div>
                    </>
                  ) : (
                    <div className="avatar-placeholder">
                      <MDBBtn onClick={openModal} style={{ width: '100px', height: '100px', borderRadius: '50%', fontSize: '24px' }}>+</MDBBtn>
                    </div>
                  )}

                </div>

                <div className="flex-grow-1 ms-3">
                  <Typography variant="h5" className="mb-1">{instructeurData && `${instructeurData.nom} ${instructeurData.prenom}`}</Typography>
                </div>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => setIsDeleteModalOpen(true)}
                  style={{ backgroundColor: "red", position: "absolute", right: "1px", marginRight: "150px", borderRadius: "50%", height: "50px", width: "40px" }}
                  title="Supprimer le compte"
                >
                  <DeleteIcon />
                </Button>

              </div>

            </div>
          </Card>

          <div className="profile-table" style={{ marginTop: '20px' }}>
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>Specialite</strong></td>
                  <td>{instructeurData && instructeurData.specialite}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>{instructeurData && instructeurData.email}</td>
                </tr>
                <tr>
                  <td><strong>Téléphone</strong></td>
                  <td>{instructeurData && instructeurData.tel}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="modal-content" >
          <input type="file" onChange={(event) => setAvatarFile(event.target.files[0])} />
          <Button onClick={handleAvatarUpload} variant="contained" color="primary">Envoyer</Button>
        </div>
      </Modal>
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
      <ToastContainer />
    </div>
  );
}

export default UserProfile;
