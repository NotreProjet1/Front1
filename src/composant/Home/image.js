// // Importer les bibliothèques nécessaires
// import React, { useState } from 'react';
// import Lightbox from 'react-images';

// // Créer le composant de la page
// const ImageGalleryPage = () => {
//   // État pour gérer l'état du Lightbox
//   const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
//   const [currentImage, setCurrentImage] = useState(0);

//   // Tableau d'images à afficher dans la galerie
//   const images = [
//     { src: 'lien_vers_image_1.jpg', alt: 'Image 1' },
//     { src: 'lien_vers_image_2.jpg', alt: 'Image 2' },
//     { src: 'lien_vers_image_3.jpg', alt: 'Image 3' },
//   ];

//   // Fonction pour ouvrir le Lightbox et afficher une image spécifique
//   const openLightbox = (index) => {
//     setCurrentImage(index);
//     setLightboxIsOpen(true);
//   };

//   // Fonction pour fermer le Lightbox
//   const closeLightbox = () => {
//     setCurrentImage(0);
//     setLightboxIsOpen(false);
//   };

//   return (
//     <div>
//       {/* Afficher les images dans un cadre carré avec un paragraphe à côté */}
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         {images.map((image, index) => (
//           <div key={index} style={{ margin: '10px' }}>
//             <img
//               src={image.src}
//               alt={image.alt}
//               onClick={() => openLightbox(index)}
//               style={{ width: '100px', height: '100px', cursor: 'pointer' }}
//             />
//           </div>
//         ))}
//         <p style={{ marginLeft: '20px' }}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ultricies
//           purus, vitae malesuada leo.
//         </p>
//       </div>

//       {/* Lightbox pour afficher les images en grand */}
//       <Lightbox
//         images={images}
//         isOpen={lightboxIsOpen}
//         onClose={closeLightbox}
//         currentImage={currentImage}
//       />
//     </div>
//   );
// };

// export default ImageGalleryPage;
