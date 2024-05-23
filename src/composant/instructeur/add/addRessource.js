import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useHistory } from 'react-router-dom';

const AddRessource = () => {
  const [coursData, setcoursData] = useState({
    titre: '',
    description: '',
    plantFile: null,
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcoursData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setcoursData((prevData) => ({
      ...prevData,
      plantFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      formData.append('titre', coursData.titre);
      formData.append('description', coursData.description);
      formData.append('plantFile', coursData.plantFile);

      const config = {
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(`http://localhost:3000/Ressource/ajouter`, formData, config);

      toast.success('Ressource pédagogique créée avec succès', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Session expirée. Veuillez vous reconnecter.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('instructeurData');
            localStorage.removeItem('isLoggedIn');
            history.push('/login');
            window.location.reload();
          }, 3000);
        } else {
          toast.error(`Erreur : ${error.response.data.message || 'Échec de la création du ressource pédagogique'}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error('Erreur de réseau. Veuillez vérifier votre connexion.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>{`
        .background-radial-gradient {
          background-color: hsl(218, 41%, 15%);
          background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
            radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
        }

        #radius-shape-1 {
          height: 220px;
          width: 220px;
          top: -60px;
          left: -130px;
          background: radial-gradient(#44006b, #ad1fff);
          overflow: hidden;
        }

        #radius-shape-2 {
          border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
          bottom: -60px;
          right: -110px;
          width: 300px;
          height: 300px;
          background: radial-gradient(#44006b, #ad1fff);
          overflow: hidden;
        }

        .bg-glass {
          background-color: hsla(0, 0%, 100%, 0.9) !important;
          backdrop-filter: saturate(200%) blur(25px);
        }
      `}</style>

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Créer <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Votre ressource pédagogique</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              Nous sommes profondément reconnaissants envers nos instructeurs dévoués pour leurs ressources. Leur générosité ouvre des portes à des milliers d'élèves, rendant l'éducation accessible à tous. Leur passion et leur engagement créent une communauté d'apprentissage dynamique et inclusive, élevant le niveau d'éducation à travers le monde. Merci pour votre précieuse contribution à cette noble mission.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <TextField
                      id="titre"
                      label="Titre"
                      variant="outlined"
                      fullWidth
                      name="titre"
                      value={coursData.titre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      fullWidth
                      name="description"
                      value={coursData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="plantFileInput" className="form-label">Fichier contenu</label>
                    <input
                      id="plantFileInput"
                      name="plantFile"
                      type="file"
                      accept=".pdf, .doc, .docx, .ppt, .pptx"
                      onChange={handleFileChange}
                      required
                      className="file-input"
                    />
                  </div>
                  <Button type="submit" variant="contained" color="primary" className="btn btn-primary btn-block mb-4">
                    Ajouter un ressource pédagogique
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AddRessource;
