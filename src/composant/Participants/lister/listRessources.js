import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './listeressource.css';

const RessourceList = () => {
  const [ressources, setRessources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change to 3 resources per page

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Ressource/listerParticipant');
        setRessources(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des ressources :', error);
      }
    };

    fetchRessources();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);

    try {
      if (searchTerm) {
        const response = await axios.get(`http://localhost:3000/Ressource/rechercherByTitre?titre=${searchTerm}`);
        setSearchResults(response.data.Ressources || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des ressources :', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRessources = searchResults.length > 0 ? searchResults : ressources;
  const paginatedRessources = currentRessources.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(currentRessources.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <a href="#" onClick={() => setCurrentPage(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="resource-container">
      <h1 className="formations-title" style={{ textAlign: "center" }}>Liste des Ressources </h1>

      <div className="searchh-box">
        <input 
          type="text" 
          placeholder="Rechercher par titre..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <FaSearch className="searchh-icon" />
      </div>
      <div className="resource-list">
        {paginatedRessources.map((ressource, index) => {
          const baseFilePath = 'http://localhost:3000/uploads/'; 
          const filePath = baseFilePath + ressource.contenu;

          return (
            <div key={index} className="resource-caarrdd">
              <div className="caarrdd" style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}>
                <img 
                  src={ressource.image || 'https://img.freepik.com/vecteurs-premium/fille-assise-pile-livres_165488-1063.jpg?w=900'} 
                  alt="Ressource Image" 
                  className="caarrdd-image"
                />
                <div className="caarrdd-content">
                  <h2 className="resource-title">{ressource.titre}</h2>
                  <p className="resource-description">Description : {ressource.description}</p>  

                  {ressource.contenu && (
                    <div>
                      <Document file={filePath}>
                        <Page pageNumber={1} />
                      </Document> 
                    </div>
                  )}

                  <Link to={`/Ressource/getRessourceGById/${ressource.id_r}`} className="resource-link">Voir les détails</Link>
                </div>
              </div>
            </div> 
          );
        })}
      </div>
      {renderPagination()}
    </div> 
  );
};

export default RessourceList;
