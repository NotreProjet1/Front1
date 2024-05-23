import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageCollectionsBusiness = () => {
  const [formations, setFormations] = useState([]);
  
  // Collection d'URL d'images
  const imagesCollection = [
    "https://img.freepik.com/photos-gratuite/close-up-affaires-tablette-numerique_1098-549.jpg?t=st=1714856843~exp=1714860443~hmac=1c7e3eb2383ad27bd5a2148027351de66f8bfb55eb591edf550e0a2a32c0ea42&w=996",
    "https://img.freepik.com/photos-gratuite/hommes-affaires-femmes-affaires-asie-du-millenaire-rencontrant-idees-reflexion-nouveaux-collegues-projet-paperasse-travaillant-ensemble-planifier-strategie-reussite-apprecient-travail-equipe-dans-petit-bureau-nuit-moderne_7861-2386.jpg?t=st=1714856906~exp=1714860506~hmac=745f97549a3b5fe3c824af9671b3a79a31a120547f23d8e6ce20c464aea553d7&w=1380",
    "https://img.freepik.com/photos-gratuite/hommes-affaires-analysant-plan-affaires-tablette_23-2148252119.jpg?t=st=1714856986~exp=1714860586~hmac=0eefdaceca7e2ad197595c3b76757f868def4ffaf7a22f5932b6279ee127ee6a&w=996"
  ];

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/lister');
        const allFormations = response.data.liste;
        const BusinessFormations = allFormations.filter(formation => formation.domaine === 'Business');
        const formattedFormations = BusinessFormations.slice(0, 3).map((formation, index) => ({
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
            <h2 className="text-2xl font-bold text-gray-900" style={{backgroundColor:'#53B9CD' , color:'white', display: 'flex',justifyContent: 'center',alignItems: 'center'}}> Formations de Business</h2>
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

export default PageCollectionsBusiness;
