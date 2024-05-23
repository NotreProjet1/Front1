import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const PublicationAdmin = () => {
  const [publications, setPublications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/publication/lister');
        setPublications(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    };

    fetchPublications();
  }, []);

  const handleClick = (event, publication) => {
    setAnchorEl(event.currentTarget);
    setSelectedPublication(publication);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (publication) => {
    setDeleteModalOpen(true);
    setSelectedPublication(publication);
  };

  const handleEditClick = (publication) => {
    setEditModalOpen(true);
    setSelectedPublication(publication);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/publication/supprimer/${selectedPublication.id_public}`);
      setPublications(publications.filter(pub => pub.id_public !== selectedPublication.id_public));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de la publication :', error);   
    }
  };

  const handleEditConfirm = async () => {
    try {
      const updatedPublication = await axios.put(`http://localhost:3000/publication/updatePublicationAdmin/${selectedPublication.id_public}`, selectedPublication);
      setPublications(publications.map(pub => (pub.id_public === updatedPublication.id_public ? updatedPublication : pub)));
      setEditModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la modification de la publication :', error);
    }
  };

  const filteredPublications = publications.filter(publication => publication.titre.toLowerCase().includes(searchTerm.toLowerCase()));

  const pageCount = Math.ceil(filteredPublications.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedPublications = filteredPublications.slice(startIndex, endIndex);


  return (
    <div className="flex flex-col items-center gap-4 p-4">
    <h1 className="text-3xl font-bold mb-4">Liste des Publications</h1>
    <TextField
      label="Rechercher une publication"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4"
    />
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {publications.map((publication) => (
        <div key={publication.id_public} className="relative overflow-hidden text-white shadow-lg rounded-xl bg-gray-900" style={{ width: 'calc(30% - 2rem)' }}>
          <img src='https://media.istockphoto.com/id/1312139041/photo/learning-on-the-job.jpg?s=2048x2048&w=is&k=20&c=mQ-y57Zcx84nzmc17a_sedKHW4Pn57732LTd2fmzgUA=' alt={publication.titre} style={{ width: '100%', height: 'auto' }} />
          <div className="absolute inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="absolute top-4 right-4">
          <button
  className="h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-blue-500 relative"
  type="button"
  onClick={(e) => handleClick(e, publication)}
>
  <IconButton aria-label="paramètres" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', transition: 'color 0.3s' }}>
    <SettingsIcon />
  </IconButton>
</button>


            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && selectedPublication && selectedPublication.id_public === publication.id_public)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}>
              <MenuItem onClick={() => handleEditClick(publication)}>Modifier la publication</MenuItem>
              <MenuItem onClick={() => handleDeleteClick(publication)}>Supprimer la publication</MenuItem>
            </Menu>
          </div>

          <div className="p-4">
          <p className="block font-sans text-sm font-light leading-relaxed text-white">
  Il y 'a  : {publication.temps_ecoule}
</p>

            <h5 className="block font-sans text-lg font-medium leading-snug text-white">
              {publication.titre}
            </h5>
            <p className="block font-sans text-sm font-light leading-relaxed text-white">
              {publication.description}
            </p>
            <div className="flex items-center gap-3 mt-4 group">
              <Avatar src={`http://localhost:3000/uploads/${publication.instructeur_Avatar}`} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <span className="text-white">{publication.instructeur_nom} {publication.instructeur_prenom}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Modal de Modifier */}
      <MDBModal animationDirection="right" open={editModalOpen} tabIndex="-1" onClose={() => setEditModalOpen(false)}>
  <MDBModalDialog position="top-right" side>
    <MDBModalContent>
      <MDBModalHeader className="bg-info text-white flex justify-between items-center">
        <MDBModalTitle>Modifier la publication</MDBModalTitle>
        <IconButton onClick={() => setEditModalOpen(false)} style={{ color: '#ffffff', background: 'transparent' }}>
          <CloseIcon />
        </IconButton>
      </MDBModalHeader>
      <MDBModalBody>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nouveau titre"
          value={selectedPublication?.titre || ''}
          onChange={(e) => setSelectedPublication({ ...selectedPublication, titre: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nouvelle description"
          value={selectedPublication?.description || ''}
          onChange={(e) => setSelectedPublication({ ...selectedPublication, description: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nouveau contenu"
          value={selectedPublication?.contenu || ''}
          onChange={(e) => setSelectedPublication({ ...selectedPublication, contenu: e.target.value })}
        />
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="info" className="mx-2" onClick={handleEditConfirm}>Enregistrer</MDBBtn>
        <MDBBtn outline color="info" className="mx-2" onClick={() => setEditModalOpen(false)}>Annuler</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>


    {/* Modal de supprimer */}
{/* Modal de supprimer */}
<MDBModal animationDirection="right" open={deleteModalOpen} tabIndex="-1" onClose={() => setDeleteModalOpen(false)}>
  <MDBModalDialog position="top-right" side>
    <MDBModalContent>
      <MDBModalHeader style={{ backgroundColor: '#17a2b8', color: '#fff' }}>
        <MDBModalTitle>Supprimer cette publication</MDBModalTitle>
        <MDBBtn color="none" className="btn-close" onClick={() => setDeleteModalOpen(false)} style={{ backgroundColor: 'transparent' }}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <p style={{ color: '#000' }}>Êtes-vous sûr de vouloir supprimer cette publication ?</p>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn style={{ color: '#fff' }} onClick={handleDeleteConfirm}>Supprimer</MDBBtn>
        <MDBBtn outline style={{ color: '#fff' }} onClick={() => setDeleteModalOpen(false)}>Annuler</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

</div>
    </div>
  );
};

export default PublicationAdmin;
