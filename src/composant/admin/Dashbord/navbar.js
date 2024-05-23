import { height } from '@fortawesome/free-solid-svg-icons/faAward';
import React, { useState } from 'react';

const NavbarAdmin = ({ nom, prenom }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = () => {
    // Fonction de déconnexion
    console.log("Déconnexion...");
  };

  const handleSettings = () => {
    // Fonction pour les paramètres
    console.log("Ouverture des paramètres...");
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const styles = {
    navbar: {
        borderBottom: '1px solid #00FFFF', // Bordure en bas de l'élément
        boxShadow: '0 2px 4px #00FFFF', // Ombre douce
        backgroundColor: 'rgba(9, 30, 87, 0.966)',
        width: '100%', // Largeur de 100% pour s'adapter à la largeur de son conteneur
        height: '60px', // Hauteur de 60 pixels
        marginBottom: '-6px', // Pour compenser la marge ajoutée par la shadowbox
        borderRadius: '8px', // Rayon de coin de 8 pixels
        border: '2px solid #f5b921', // Bordure bleue de 2 pixels
        marginTop:'10px' , 
        backgroundColor: 'black',
      }
,      
    container: {
      Width: '100%',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '50px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logoImg: {
      height: '32px',
      marginRight: '8px',
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#00FFFF',
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItem: {
      marginRight: '20px',
      textDecoration: 'none',
      color: '#00FFFF',
      fontSize: '1rem',
    },
    avatarContainer: {
      position: 'relative', // Pour permettre le positionnement du point d'exclamation
      marginRight: '10px', // Ajout de la marge entre le nom et l'avatar
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
      cursor: 'pointer', // Curseur pointer pour indiquer qu'il est cliquable
    },
    notificationDot: {
      position: 'absolute',
      top: '0',
      right: '-3px',
      width: '10px',
      height: '10px',
      backgroundColor: 'green', // Couleur verte pour le point d'exclamation
      borderRadius: '50%',
      boxShadow: '0 0 3px #000', // Effet de bordure
    },
    optionsContainer: {
      position: 'absolute',
      top: '48px', // Position en dessous de l'avatar
      right: '0',
      backgroundColor: '#fff', // Fond blanc
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)', // Ombre légère
      display: showOptions ? 'block' : 'none', // Affichage conditionnel des options
    },
    optionItem: {
      padding: '10px',
      color: '#333',
      textDecoration: 'none',
      display: 'block',
      fontSize: '1rem',
      cursor: 'pointer', // Curseur pointer pour indiquer qu'il est cliquable
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <a href="https://flowbite.com/" style={styles.logo}>
       
          <span style={styles.logoText}>EduPionner</span>
        </a>
        <div style={styles.menu}>
          <a href="#" style={styles.menuItem}>Briki Ahlem</a>
          <div style={styles.avatarContainer} onClick={toggleOptions}>
            <span style={styles.notificationDot}></span>
            <img src="https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="user photo" style={styles.avatar} />
            {/* Icone de select */}
          <div style={styles.optionsContainer}>
              <a href="#" style={styles.optionItem} onClick={handleSettings}>Paramètres</a>
              <a href="#" style={styles.optionItem} onClick={handleLogout}>Déconnexion</a>
            </div>
            {/* Options */}
          
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
