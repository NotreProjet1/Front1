import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInputGroup, MDBIcon } from 'mdb-react-ui-kit';
import { Card, Avatar } from '@mui/material';


const CoursListAdminD = () => {
  const [cours, setCours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Nombre d'éléments à afficher par page

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coursgratuis/lister`);
        setCours(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    };

    fetchCours();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);

    try {
      const response = await axios.get(`http://localhost:3000/coursgratuis/rechercherByTitre?titre=${searchTerm}`);
      setCours(response.data.liste || []);
     
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:3000/coursgratuis/accepter/${id}`);
      setCours(prevCours => prevCours.map(c => c.id_cg === id ? { ...c, accepted: true } : c));
      localStorage.setItem('acceptedCours', JSON.stringify([...getAcceptedCours(), id]));
      toast.success('Cours accepté avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du cours :', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/coursgratuis/refuser/${id}`);
      setCours(prevCours => prevCours.map(c => c.id_cg === id ? { ...c, rejected: true } : c));
      localStorage.setItem('rejectedCours', JSON.stringify([...getRejectedCours(), id]));
      toast.success('Cours refusé avec succès.');
    } catch (error) {
      console.error('Erreur lors du refus du cours :', error);
    }
  };

  const getAcceptedCours = () => {
    return JSON.parse(localStorage.getItem('acceptedCours') || '[]');
  };

  const getRejectedCours = () => {
    return JSON.parse(localStorage.getItem('rejectedCours') || '[]');
  };

  // Filtrer les cours en fonction de leur état (non acceptés et non refusés)
  const filteredCours = cours.filter(c =>
    !getAcceptedCours().includes(c.id_cg) && !getRejectedCours().includes(c.id_cg)
  );

  // Pagination - Calcul de l'index de début et de fin pour l'affichage des éléments actuels
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCours.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCours.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    
    <div className="cours-list-admin" style={{ backgroundColor: '#eee', marginTop:'20px' }}>
      <style>
        {`
          .cours-list-admin {
            border: 2px solid #ccc;
            padding: 10px;
            width: 1050px;
            margin: 0 auto;
            margin-top: 20px;
          }
          .cours-list-admin img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
        `}
      </style>

      <ToastContainer />

      <h1 style={{ color: '#5e4803', fontFamily: 'Roboto, sans-serif', fontSize: '40px', marginTop: '0px' }}>
      les demande de création des Cours
      </h1>

      <div className="d-flex justify-content-center mb-3">
        <MDBInputGroup className="w-50">
          <input
            type="text"
            className="form-control h-100"
            placeholder="Rechercher par titre..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MDBBtn
            color='primary'
            disabled={searchQuery === ''}
            className="align-items-center h-100"
          >
            <MDBIcon icon='search' size="sm" className="mr-1 text-white" />
            <span className="align-middle">Rechercher</span>
          </MDBBtn>
        </MDBInputGroup>
      </div>

      <MDBTable align='middle' style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
        <MDBTableHead>
          <tr>
            <th>Avatar</th>
            <th>Instructeur</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((cours) => (
            <tr key={cours.id_cg}>
              <td>
              <Avatar src={`http://localhost:3000/uploads/${cours.instructeur_Avatar}`} alt="Avatar" style={{ width: '60px', height: '70px', borderRadius: '30%' }} />
              </td>
              <td>{`${cours.instructeur_prenom} ${cours.instructeur_nom}`}</td>
              <td>{cours.titre}</td>
              <td>{cours.description}</td>
              <td>
                <MDBBtn color='success' rounded size='sm' padding='10px'  onClick={() => handleAccept(cours.id_cg)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                </MDBBtn>
                <MDBBtn color='danger' rounded size='sm' padding='10px'  onClick={() => handleReject(cours.id_cg)}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Pagination */}
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className='page-link' onClick={() => handlePrevPage()}>&laquo;</button>
          </li>
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
              <button className='page-link' onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className='page-link' onClick={() => handleNextPage()}>&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CoursListAdminD;
