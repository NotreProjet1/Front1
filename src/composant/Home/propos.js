import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous que vous avez React Router installé pour utiliser le composant Link
import FormContact from '../composant/formContact';
const Propos = () => {
  return (
    <div>
      <h1>À Propos</h1>
   
      
      {/* Inclusion du composant FormContact */}
      <FormContact />
      
      {/* Lien vers une autre page */}
      <Link to="/autre-page">
        <h1>Aller à une autre page</h1>
      </Link>
    </div>
  );
};



export default Propos;
