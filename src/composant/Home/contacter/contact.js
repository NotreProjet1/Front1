import React, { useEffect } from 'react';
import FormContact from '../formContact'; // Importez le composant FormContact depuis le bon chemin

import '../contacter/contact.css'; 

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0,0)
    }, []);

    return (
        <div>
            <div className='extrapage'>
              
           
                <FormContact /> {/* Utilisez correctement le composant FormContact ici */}
            </div>
        </div>
    );
};

export default Contact;
