import React from 'react';
import '../css/deffinir.css';

const Deffinir = () => {
  return (
    <div className="container">
      {/* Image à gauche */}
      <img src="https://img.freepik.com/photos-gratuite/formateur-expliquant-details-du-logiciel-au-nouvel-employe_74855-1666.jpg" alt="Sample Image" className="left-image" />

      {/* Conteneur pour le titre et le paragraphe à droite de l'image */}
      <div className="text-container">
        {/* Titre */}
        <h1 className="main-title">Éduquez, Évoluez, Excellence : Bienvenue sur EduPionner</h1>

        {/* Paragraphe */}
        <div>
          <p className="side-paragraph">
            Rejoignez EduPionner, votre passerelle vers l'apprentissage de qualité, où chaque cours est une opportunité de croissance personnelle et professionnelle. Profitez de notre vaste sélection de cours gratuits et premium, dispensés par des formateurs experts, et obtenez des certificats officiels attestant de vos compétences. Avec une flexibilité d'apprentissage et une communauté mondiale, EduPionner est votre partenaire pour atteindre de nouveaux sommets académiques. Découvrez un monde d'opportunités éducatives avec EduPionner dès aujourd'hui.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Deffinir; 






  