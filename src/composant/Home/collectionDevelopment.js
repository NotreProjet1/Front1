import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageCollectionsDevelopment = () => {
  const [formations, setFormations] = useState([]);
  
  // Collection d'URL d'images
  const imagesCollection = [
    "https://img.freepik.com/photos-gratuite/contexte-programmation-personne-travaillant-codes-ordinateur_23-2150010144.jpg?t=st=1714858536~exp=1714862136~hmac=46251697ce1e1ed0b6d32dc87baae55b6ab01346b8b98f679314b20e29bb5b7d&w=996",
    "https://img.freepik.com/photos-gratuite/contexte-programmation-personne-travaillant-codes-ordinateur_23-2150010119.jpg?t=st=1714858670~exp=1714862270~hmac=145fcb027c75d8fca9a7280fc05704e55932be1201fd91d5bcb373d9806556d6&w=996",
    "https://img.freepik.com/photos-gratuite/concept-collage-html-css_23-2150061955.jpg?t=st=1714858731~exp=1714862331~hmac=a9a30ff81e1e7b5249806cba4b2f8199b9b7fe4f8ed647c675f4e01622a570b1&w=996"
  ];

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/lister');
        const allFormations = response.data.liste;
        const developmentFormations = allFormations.filter(formation => formation.domaine === 'development');
        const formattedFormations = developmentFormations.slice(0, 3).map((formation, index) => ({
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
            <h2 className="text-2xl font-bold text-gray-900" style={{backgroundColor:'#53B9CD' , color:'white', display: 'flex',justifyContent: 'center',alignItems: 'center'}}> Formations de development</h2>
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

export default PageCollectionsDevelopment;
