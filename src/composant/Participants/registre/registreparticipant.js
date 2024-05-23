import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../../../css/ParticipantRegister.css';
import { height } from '@fortawesome/free-solid-svg-icons/faAward';

const ParticipantRegister = () => {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [domaine, setDomaine] = useState('');
    const [categorie, setCategorie] = useState('');
    const [emailP, setEmail] = useState('');
    const [mots_de_passeP, setPassword] = useState('');
    const [tel, setTel] = useState('');

    const handleNextStep = async () => {
        switch (step) {
            case 1:
                if (!nom || !prenom || !emailP) {
                    toast.error('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                break;
            case 2:
                if (!tel || !mots_de_passeP) {
                    toast.error('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                if (!mots_de_passeP) {
                    toast.error('Le mot de passe est requis.');
                    return;
                }
                break;
            default:
                break;
        }

        const response = await fetch('http://localhost:3000/participant/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom,
                prenom,
                emailP,
                domaine,
                categorie,
                mots_de_passeP,
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
            <MDBRow className=' '>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right' style={{ width: "100%", height: "90%", background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)', borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)" }}>
                        <MDBCardBody className='p-5 '>
                            <h2 className="fw-bold mb-5 text-center">Sign up now</h2>
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
                                        <label className='form-label'>Domaine</label>
                                        <select
                                            className='form-select mb-2'
                                            value={domaine}
                                            onChange={(e) => setDomaine(e.target.value)}
                                            required
                                        >
                                            <option value='' disabled>Choisissez votre domaine</option>
                                            <option value='ecommerce'>E-commerce</option>
                                            <option value='Développeur'>Développeur</option>
                                        </select>
                                    </MDBCol>
                                    <MDBCol>
                                        <label className='form-label'>Catégorie</label>
                                        <select
                                            className='form-select mb-2'
                                            value={categorie}
                                            onChange={(e) => setCategorie(e.target.value)}
                                            required
                                        >
                                            <option value='' disabled>Choisissez votre catégorie</option>
                                            <option value='professionnel'>Professionnel</option>
                                            <option value='étudiant'>Étudiant</option>
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
                                            value={emailP}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-2'>
                                    <MDBCol>
                                        <label htmlFor="téléphone" className="form-label">Téléphone</label>
                                        <MDBInput
                                            size='sm'
                                            type='text'
                                            id='tel'
                                            value={tel}
                                            onChange={(e) => setTel(e.target.value)}
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
                                            value={mots_de_passeP}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </MDBCol>

                                </MDBRow>

                                <MDBBtn color='primary' type='submit' className='d-flex justify-content-center align-items-center' onClick={handleNextStep} style={{ marginLeft: "220px", width: "200px" }}>
                                    s'inscrire
                                </MDBBtn>
                            </form>
                            <div className="text-muted mt-2 text-center">
                                <small>Vous avez déjà un compte? <a href="/login">Connectez-vous ici</a></small>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol col='6'>
                    <img src="https://img.freepik.com/photos-premium/fond-bleu-abstrait-motif-triangles_662214-93722.jpg?w=360" class="w-100 rounded-4 shadow-4 " style={{ height: "990px" }} alt="" fluid />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default ParticipantRegister;