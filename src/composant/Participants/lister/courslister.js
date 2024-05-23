import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../lister/courslister.css';
import { FaBookOpen, FaComments, FaLink } from 'react-icons/fa';

const CoursGList = () => {
  const [Courss, setCourss] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursPerPage = 3;

  useEffect(() => {
    const fetchCourss = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/coursgratuis/lister`);
        setCourss(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des Courss :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourss();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);

    try {
      if (searchTerm) {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/coursgratuis/rechercherByTitre?titre=${searchTerm}`);
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
  const defaultImage = 'https://media.istockphoto.com/id/1227594250/fr/vectoriel/sim10-04.jpg?s=612x612&w=0&k=20&c=1sFBnA0ODFVcf7vvhlgv1c6QBYH8T59Cguz6jgFYGWo='; 

  const displayCourss = searchResults.length > 0 ? searchResults : Courss;

  // Pagination
  const indexOfLastCours = currentPage * coursPerPage;
  const indexOfFirstCours = indexOfLastCours - coursPerPage;
  const currentCours = displayCourss.slice(indexOfFirstCours, indexOfLastCours);

  const totalPages = Math.ceil(displayCourss.length / coursPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='ccoontainer'>
    <div className='cours-list'>
      <h1 className="Ccustom-title">Notre Cours Gratuits</h1>
      <div className="ssearch-ccntainer">
        <div className="ssearch-bbox">
          <input 
            className='rrecherche'
            type="text" 
            placeholder="Rechercher par titre..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <FaSearch className="ssearch-iicon" />
        </div>
        {loading && <div>Loading...</div>}
        <ul className="cours-grid">
          {currentCours.map((Cours) => {
            const baseFilePath = 'http://localhost:3000/uploads/';
            const filePath = baseFilePath + Cours.contenu;
            const courseImage = Cours.image || defaultImage; 
            if (searchQuery && !Cours.titre.toLowerCase().includes(searchQuery)) {
              return null;
            }

            return (
              <li key={Cours.id_cg} className="cours-card">
              <div className="cours-image">
                <img src={courseImage} alt={Cours.titre} />
              </div>
              <div className="cours-details">
                <h2 className="cours-title"><FaBookOpen /> {Cours.titre}</h2>
                <p className="cours-description"><FaComments /> Description : {Cours.description}</p>
                {Cours.contenu && (
                  <div>
                    <Document file={filePath}>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                )}
                <Link to={`/coursgratuis/getCoursById/${Cours.id_cg}`} className="cours-details-link"><FaLink /> Voir les détails</Link>
              </div>
            </li>
            );
          })}
        </ul>
        {noResults && !loading && (
          <div>
            <img src='https://media.tenor.com/VZ3hn4SEFRwAAAAi/mochi-cat-chibi-cat.gif' alt="No Results" />
          </div>
        )}

        {/* Pagination */}
        <div className="ppagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><FaChevronLeft /></button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>{index + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><FaChevronRight /></button>
        </div>
      </div> 
    </div>
    </div>
  );
};

export default CoursGList;

