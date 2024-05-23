import React, { useEffect, useState } from 'react'
import '../navbar/nav.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Avatar, Typography, Modal, Button } from '@mui/material';

const Navbar = ({ reloadnavbar, isLoggedIn, setLoggedIn, role }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cartquantity, setcartquantity] = useState(0)
    const [tokenDefined, setTokenDefined] = useState(false); // State to track whether token is defined
    const [instructeurData, setInstructeurData] = useState(null); // State for instructeurData
    const [searchResults, setSearchResults] = useState([]);
    const history = useHistory();
    const instructeurDataa = JSON.parse(localStorage.getItem('instructeurData'));
    const participantData = JSON.parse(localStorage.getItem('participantData'));

    const handleLogout = () => {
        // Supprimer le jeton d'authentification du localStorage ou d'un autre emplacement de stockage
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        localStorage.removeItem('participantData');
        localStorage.removeItem('instructeurData');
        setLoggedIn(false);

        history.push('/login');
    };

    const getcarttotalitems = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            let total = 0
            cart.forEach(item => {
                total += item.quantity
            })
            setcartquantity(total)
        }
        else {
            setcartquantity(0)
        }
    }

    useEffect(() => {
        getcarttotalitems()



    }, [reloadnavbar])

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/formationP/searchFormationsByDomaine?titre=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche de formations par titre:', error);
        }
    };




    return (
        <nav className='nav'>
            <div className='s1'>
            <img src='/images/logorrr.png' alt='logo' className='logo' />
                <div className='s2'>
                    <Link to='/'>
                        <a>Home</a>
                    </Link>
                    {isLoggedIn && role === 'instructeur' && (
                        <Dropdown className=''>
                            <Dropdown.Toggle variant="" className='droppppp' id="dropdown-basic">
                                Admin
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-dropdown-menu"> 
                            <Dropdown.Item href="/Affiche" className="custom-dropdown-item"> Affiche</Dropdown.Item>
                                <Dropdown.Item href="/Affiche" className="custom-dropdown-item"> Affiche</Dropdown.Item>
                                <Dropdown.Item href="/devenirInstructeur" className="custom-dropdown-item"> devenirInstructeur</Dropdown.Item>
                                <Dropdown.Item href="/loginAdmin" className="custom-dropdown-item"> loginAdmin</Dropdown.Item>
                                <Dropdown.Item href="/ModifierAdmin" className="custom-dropdown-item"> ModifierAdmin</Dropdown.Item>
                                <Dropdown.Item href="/statiqueAdmin" className="custom-dropdown-item"> statiqueAdmin</Dropdown.Item>
                                <Dropdown.Item href="/tableau" className="custom-dropdown-item"> tableau</Dropdown.Item>
                                <Dropdown.Item href="/ListeFormationAdmin" className="custom-dropdown-item"> ListeFormationAdmin</Dropdown.Item>
                                <Dropdown.Item href="/ListeRessourceAdmin " className="custom-dropdown-item"> ListeRessourceAdmin</Dropdown.Item>
                                <Dropdown.Item href="/ListecourAdmin" className="custom-dropdown-item"> ListecourAdmin</Dropdown.Item>
                                <Dropdown.Item href="/YourComponent" className="custom-dropdown-item"> YourComponent</Dropdown.Item>
                                <Dropdown.Item href="/ListeParticipantsAdmin" className="custom-dropdown-item"> ListeParticipantsAdmin</Dropdown.Item>
                                <Dropdown.Item href="/ListeInstructeursAdmin" className="custom-dropdown-item"> ListeInstructeursAdmin</Dropdown.Item>
                                <Dropdown.Item href="/ProfilePage" className="custom-dropdown-item"> ProfilePage</Dropdown.Item>
                                <Dropdown.Item href="/DashboardPage" className="custom-dropdown-item"> DashboardPage</Dropdown.Item>
                                <Dropdown.Item href="/DashboardContent" className="custom-dropdown-item"> DashboardContent</Dropdown.Item>
                                <Dropdown.Item href="/Sidebar" className="custom-dropdown-item"> Sidebar</Dropdown.Item>
                                <Dropdown.Item href="/ListerAdmin" className="custom-dropdown-item"> ListerAdmin</Dropdown.Item>
                                <Dropdown.Item href="/ListPublicationAdmin" className="custom-dropdown-item"> ListPublicationAdmin</Dropdown.Item>
                                <Dropdown.Item href="/RessourceListAdmin" className="custom-dropdown-item"> RessourceListAdmin</Dropdown.Item>
                                <Dropdown.Item href="/CoursListAdmin" className="custom-dropdown-item"> CoursAdmin</Dropdown.Item>
                                <Dropdown.Item href="/FormationAdmin" className="custom-dropdown-item"> FormationAdmin</Dropdown.Item>
                                <Dropdown.Item href="/loginAdmin" className="custom-dropdown-item"> loginAdmin</Dropdown.Item>
                                <Dropdown.Item href="/PublicationsList" className="custom-dropdown-item"> PublicationsList</Dropdown.Item>
                                <Dropdown.Item href="/ListeInstructeur" className="custom-dropdown-item"> ListeInstructeur</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>)}
                        {isLoggedIn && role === 'instructeur' && (

                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" className='droppppp'>
                            Instrcuteur
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item href="/ModifierAdmin" className="custom-dropdown-item"> ModifierAdmin</Dropdown.Item>
                            <Dropdown.Item href="/loginAdmin" className="custom-dropdown-item"> loginAdmin</Dropdown.Item>
                            <Dropdown.Item href="/ModifierAdmin" className="custom-dropdown-item"> ModifierAdmin</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>)}
                    {isLoggedIn && role === 'participant' && (

                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" className='droppppp'>
                            Options d'Apprentissage
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item href="/FormationsListPaiement" className="custom-dropdown-item">Notre Formation </Dropdown.Item>
                            <Dropdown.Item href="/CoursGList" className="custom-dropdown-item">Notre Cours Gratuit </Dropdown.Item>

                            <Dropdown.Item href="/RessourceList" className="custom-dropdown-item"> Notre resource</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>)}


                    <Link to='/aboutnous'>
                        <a>About Us</a>
                    </Link>
                    <Link to='/contact'>
                        <a>Contact Us</a>
                    </Link>   
                    <Link to='/PublicationsList'>
                        <a>PublicationsList</a> 
                    </Link>  
                    <Link to='/PublicationAdmin'>
                        <a>PublicationAdmin</a> 
                    </Link>  
                    <Link to='/PublicationParticipant'>
                        <a>PublicationParticipant</a> 
                    </Link>         
                    <Link to='/QuizList'>
                        <a>QuizList</a> 
                    </Link>
                    <Link to='/login'>
                        {isLoggedIn ? null : <a>Ce connecter</a>}
                    </Link>


                </div>
                {/* 

                <div className='searchbar'>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div> */}
                {/* Afficher les résultats de la recherche */}
                {/* <div className="search-results">
                <h2>Résultats de la recherche :</h2>
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            <h3>{result.titre}</h3>
                            <p>{result.description}</p>
                        </li>
                    ))}
                </ul>
            </div> */}
                {isLoggedIn && (
                    <div className='right'>
                        <Dropdown>
                            <Dropdown.Toggle variant='' id='dropdown-basic round' className='droppbas' style={{ borderRadius: "50%", backgroundColor: "transparent", padding: 0, height: "70px", width: "70px" }}>
                                {role === 'instructeur' && instructeurDataa && instructeurDataa.Avatar ? (
                                    <Avatar src={`http://localhost:3000/uploads/${instructeurDataa.Avatar}`} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: "15px" }} />
                                ) : role === 'participant' && participantData && participantData.Avatar ? (
                                    <Avatar src={`http://localhost:3000/uploads/${participantData.Avatar}`} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: "15px" }} />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ width: '60px', height: '60px', color: "white" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" stroke="white" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                )}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {role === 'instructeur' && <Dropdown.Item as={Link} to={{ pathname: `/UserProfile`, state: { instructeurData: JSON.parse(localStorage.getItem('instructeurData')) } }}>
                                    Profil
                                </Dropdown.Item>}
                                {role === 'participant' && <Dropdown.Item as={Link} to={{ pathname: `/UserProfileParticipant`, state: { participantData: JSON.parse(localStorage.getItem('participantData')) } }}>
                                    Profil
                                </Dropdown.Item>}
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>



        </nav>
    )
}

export default Navbar;
