import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContact = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);

    const handleNomChange = (e) => {
        setNom(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nom || !email || !message) {
            toast.error('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/contact/ajouter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    email,
                    message,
                    rating,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success('Message envoyé avec succès !');
                // Réinitialiser les champs du formulaire ici si nécessaire
                setNom('');
                setEmail('');
                setMessage('');
            } else {
                console.error('Erreur lors de la soumission du formulaire:', response.status);
                // Gérer les erreurs ici
                toast.error('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
            // Gérer les erreurs ici
            toast.error('Erreur lors de l\'envoi du message.');
        }
    };

    return (
        <form className='extrapageform' onSubmit={handleSubmit}>
            <div className='fromgroup'>
                <label htmlFor="nom">Nom</label>
                <input className='vers' type="text" id="nom" value={nom} onChange={handleNomChange} style={{ width: '600px' }} />
            </div>

            <div className='fromgroup'>
                <label htmlFor="email">Email</label>
                <input  className='vers' type="text" id="email" value={email} onChange={handleEmailChange} style={{ width: '600px' }} />
            </div>

            <div className='fromgroup'>
                <label htmlFor="message">Message</label>
                <textarea className='vers' id="message" value={message} onChange={handleMessageChange} rows="5" style={{ width: '600px' }} />
            </div>

            {/* Ajoutez ici votre code pour le champ de notation (rating) */}

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormContact;
