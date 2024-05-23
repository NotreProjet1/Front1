import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';

const ModifierAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [id_A, setId_A] = useState('');

    useEffect(() => {
        // Récupérer le token et l'id de l'admin à partir du local storage
        const token = localStorage.getItem('token');
        const id_A = localStorage.getItem('id_A');
        setToken(token);
        setId_A(id_A);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Données envoyées:', { email, password, id_A, token });

            const response = await axios.put(`http://localhost:3000/Admin/${id_A}`, {
                email: email,
                mots_de_passe: password,
            }, {
                headers: {
                    'Authorization': ` ${token}`
                }
            });

            console.log('Réponse du serveur:', response.data);
            alert('Modification réussie !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
            alert('Erreur lors de la mise à jour. Veuillez réessayer.');
        }
    };

    const gradientStyle = {
        background: '#6a11cb',
        background: '-webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))',
        background: 'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))',
        height: '100vh', // Hauteur de la fenêtre visible
        minHeight: '800px' // Hauteur minimale de l'arrière-plan
    };

    return (
        <MDBContainer className="my-5" style={gradientStyle}>
            <MDBRow>
                <MDBCol md="6" className="mb-5">
                    <div className="p-4 rounded-3" style={{ background: 'rgba(0, 0, 0, 0.5)', marginTop: '200px' }}>
                        <h4 className="text-white mb-4">Modifier les données de l'administrateur</h4>
                        <label> Nouvel email</label>
                        <MDBInput className="text-white custom-placeholder" placeholder='Nouvel email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label> Nouveau mot de passe</label>
                        <MDBInput className="text-white custom-placeholder" placeholder='Nouveau mot de passe' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className="text-center pt-3">
                            <MDBBtn className="me-3 w-50 gradient-custom-2" type="submit" onClick={handleSubmit}>Modifier</MDBBtn>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md="6" className="mb-5">
                    <div className="d-flex flex-column justify-content-center h-100 p-4 rounded-3 gradient-custom-2">
                        <h4 className="text-white mb-4">Nous sommes plus qu'une simple entreprise</h4>
                        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default ModifierAdmin;
