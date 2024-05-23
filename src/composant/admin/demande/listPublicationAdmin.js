import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBCardTitle, MDBBtn, MDBInputGroup, MDBIcon } from 'mdb-react-ui-kit';

const ListPublicationAdmin = () => {
  const [publications, setPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedPublications, setAcceptedPublications] = useState(new Set());
  const [rejectedPublications, setRejectedPublications] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // 3 cartes par ligne

  useEffect(() => {
    const fetchPublications = async () => {
      try { 
        const response = await axios.get(`http://localhost:3000/publication/lister`);
        setPublications(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    };

    fetchPublications();
  }, []);

  useEffect(() => {
    const accepted = JSON.parse(localStorage.getItem('acceptedPublications')) || [];
    const rejected = JSON.parse(localStorage.getItem('rejectedPublications')) || [];
    setAcceptedPublications(new Set(accepted));
    setRejectedPublications(new Set(rejected));
  }, []);

  const handleSearchChange = async (value) => {
    setSearchQuery(value);
    // Effectuer une recherche à chaque changement de la valeur de recherche
    try {
      const response = await axios.get(`http://localhost:3000/publication/searchByTitre?titre=${value}`);
      setPublications(response.data.publications || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des publications :', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:3000/publication/accepter/${id}`);
      const updatedPublications = publications.filter(publication =>
        publication.id_public !== id
      );
      setPublications(updatedPublications);
      setAcceptedPublications(new Set([...acceptedPublications, id]));
      localStorage.setItem('acceptedPublications', JSON.stringify([...acceptedPublications, id]));
      toast.success('Publication acceptée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la publication :', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/publication/refuser/${id}`);
      const updatedPublications = publications.filter(publication =>
        publication.id_public !== id
      );
      setPublications(updatedPublications);
      setRejectedPublications(new Set([...rejectedPublications, id]));
      localStorage.setItem('rejectedPublications', JSON.stringify([...rejectedPublications, id]));
      toast.success('Publication refusée avec succès.');
    } catch (error) {
      console.error('Erreur lors du refus de la publication :', error);
    }
  };

  const displayPublications = searchQuery === '' ? publications.filter(publication => {
    return !acceptedPublications.has(publication.id_public) && !rejectedPublications.has(publication.id_public);
  }) : publications || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayPublications.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(displayPublications.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="publications-list-admin" style={{ backgroundColor: '#eee', marginTop:'20px' }}>
      <ToastContainer />

      <h1 className="text-center" style={{ color: '#5e4803', fontFamily: 'Roboto, sans-serif', fontSize: '40px', marginTop: '0px' }}> les demande de création des Publications</h1>

      <div className="d-flex justify-content-center">
        <MDBInputGroup className="w-50">
          <input
            type="text"
            className="form-control h-100"
            placeholder="Rechercher par titre..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <MDBBtn
            color='primary'
            disabled={searchQuery === ''}
            className="align-items-center h-100"
          >
            <MDBIcon icon='search' size="sm"  className="mr-1 text-white" />
            <span className="align-middle">Search</span>
          </MDBBtn>
        </MDBInputGroup>
      </div>

      <div className="cards-container row row-cols-1 row-cols-md-3 g-4 mt-4">
        {currentItems.map((publication) => (
          <div className="col mb-4" key={publication.id_public}>
            <MDBCard className="h-100" border='primary' style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
              <MDBCardHeader>{publication.titre}</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle className="text-success">Description :</MDBCardTitle>
                <MDBCardText>{publication.description}</MDBCardText>
                <div className="button-container">
                  <MDBBtn onClick={() => handleAccept(publication.id_public)} className="mr-2"  padding='10px'color="success" rounded >              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></MDBBtn>
                  <MDBBtn onClick={() => handleReject(publication.id_public)} padding='10px' color="danger" rounded>                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <MDBBtn color='light' size='sm' onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</MDBBtn>
        <span style={{ margin: '0 10px' }}>{currentPage} / {totalPages}</span>
        <MDBBtn color='light' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</MDBBtn>
      </div>
    </div>
  );
};

export default ListPublicationAdmin;
