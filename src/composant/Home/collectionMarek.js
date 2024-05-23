import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageCollectionsDev = () => {
  const [formations, setFormations] = useState([]);
  
  // Collection d'URL d'images
  const imagesCollection = [
    "https://img.freepik.com/photos-premium/main-femme-affaires-travaillant-supports-marketing-numerique-ecran-virtuel-telephone-mobile-calcul-moderne-diagramme-icone-vr-au-bureau_533878-666.jpg?w=1060",
    "https://img.freepik.com/photos-gratuite/objectifs-objectifs-mission-concept-graphique-cible_53876-13734.jpg?t=st=1714856396~exp=1714859996~hmac=a2bdbb43e46b7886cb9e65e7d5b99c782e1309a63b2c5fc386776961058b30c1&w=900",
    "https://img.freepik.com/photos-gratuite/marketing-numerique-icones-gens-affaires_53876-94833.jpg?t=st=1714856358~exp=1714859958~hmac=055aec892e31c8e78c8562cab26dfb2c96d95d382a20b3381f9c4333ae193734&w=900"
  ];

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/lister');
        const allFormations = response.data.liste;
        const marketingFormations = allFormations.filter(formation => formation.domaine === 'marketing');
        const formattedFormations = marketingFormations.slice(0, 3).map((formation, index) => ({
          titre: formation.titre,
          description: formation.description,
          imageUrl: imagesCollection[index % imagesCollection.length] // Attribution des images en boucle
        }));
        setFormations(formattedFormations);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormations();
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900"style={{backgroundColor:'#53B9CD' , color:'white', display: 'flex',justifyContent: 'center',alignItems: 'center'}}> Formations de Marketing</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {formations.map((formation, index) => ( 
                <div className="group relative" key={index}>
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={formation.imageUrl}
                      alt={formation.titre}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">{formation.titre}</h3>
                  <p className="text-base font-semibold text-gray-900">{formation.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCollectionsDev;
