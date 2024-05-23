
import '../../../css/ParticipantRegister.css';import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [email, setEmail] = useState('');
    const [tel, settel] = useState(''); 
    const [mots_de_passe, setPassword] = useState('');



    const handleNextStep = async () => {
        switch (step) {
            case 1:
                if (!nom || !prenom || !email) {
                    toast.error('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                break;
            case 2:
                if (!tel || !mots_de_passe) {
                    toast.error('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                if (!mots_de_passe) {
                    toast.error('Le mot de passe est requis.');
                    return;
                }
                break;
            default:
                break;
        }

        const response = await fetch('http://localhost:3000/instructeur/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom,
                prenom,
                email,
                specialite,
                mots_de_passe,
                tel,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Inscription réussie:', result);
            toast.success('Inscription réussie!');
            history.push('/login');
        } else {
            console.error('Échec de l inscription:', response.statusText);
            toast.error('Échec de l\'inscription. Veuillez réessayer.');
        }

        setStep(step + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulaire soumis avec succès!');
    };

    return (
        <MDBContainer fluid className='my-1' style={{ marginTop: "-100px" }}>
            <MDBRow className='g-0 align-items-center'>
                <MDBCol col='6'>
                <MDBCard className='my-5 cascading-right' style={{ width: "100%", height: "80%", background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)', borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)" }}>
                        <MDBCardBody className='p-5 '>
                            <h2 className="fw-bold mb-2 text-center">Inscrivez-vous maintenant</h2>
                            <form onSubmit={handleSubmit}>
                                <MDBRow className='mb-2'>
                                    <MDBCol size='6'>
                                        <label htmlFor="Nom" className="form-label">Nom</label>
                                        <MDBInput
                                            size='sm'
                                            type='text'
                                            id='nom'
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                    <MDBCol size='6'>
                                        <label htmlFor="Prénom" className="form-label">Prénom</label>
                                        <MDBInput
                                            size='sm'
                                            type='text'
                                            id='prenom'
                                            value={prenom}
                                            onChange={(e) => setPrenom(e.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-2'>
                                    <MDBCol>
                                        <label className='form-label'>Spécialité</label>
                                        <select
                                            className='form-select mb-2'
                                            value={specialite}
                                            onChange={(e) => setSpecialite(e.target.value)}
                                            required
                                        >
                                            <option value='' disabled>Choisissez votre spécialité</option>
                                            <option value='ecommerce'>E-commerce</option>
                                            <option value='développeur'>Développeur</option>
                                        </select>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-2'>
                                    <MDBCol>
                                        <label htmlFor="Email" className="form-label">Email</label>
                                        <MDBInput
                                            size='sm'
                                            type='email'
                                            id='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-2'>
                                    <MDBCol>
                                        <label htmlFor="Téléphone" className="form-label">Téléphone</label>
                                        <MDBInput
                                            size='sm'
                                            type='text'
                                            id='tel'
                                            value={tel}
                                            onChange={(e) => settel(e.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-2'>
                                    <MDBCol>
                                        <label htmlFor="Mot_de_passe" className="form-label">Mot de passe</label>
                                        <MDBInput
                                            size='sm'
                                            type='password'
                                            id='mot_de_passe'
                                            value={mots_de_passe}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBBtn color='primary' type='submit' className='d-flex justify-content-center align-items-center' onClick={handleNextStep} style={{ marginLeft: "220px", width: "200px" }}>
                                    s'inscrire
                                </MDBBtn>                            </form>
                            <div className="text-muted mt-3 text-center">
                                <small>Vous avez déjà un compte? <a href="/login">Connectez-vous ici</a></small>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol col='6'>
                    <img src="https://img.freepik.com/vecteurs-premium/triangles-glace-fond-bleu-vectoriel-comme-papier-peint-fond-abstrait_923894-3433.jpg?w=360" className="w-100 rounded-4 shadow-4" style={{ height: "990px" }} alt="" fluid />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Register;