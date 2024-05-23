import React, { useState, useEffect } from 'react';

const ModifierInstructeur = ({ instructeurId }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [mots_de_passe, setmots_de_passe] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Fetch current instructeur data based on id
    const fetchInstructeurData = async () => { 
      try {
        const response = await fetch(`http://localhost:3000/instructeurs/${instructeurId}`);
        const data = await response.json();
        const instructeur = data.instructeur;

        setNom(instructeur.nom);
        setPrenom(instructeur.prenom);
        setEmail(instructeur.email);
        setTel(instructeur.tel);
        setSpecialite(instructeur.specialite);
        // Ignore the motsDePasse and role fields for security reasons
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'instructeur:', error);
      }
    };

    fetchInstructeurData();
  }, [instructeurId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Données envoyées:', { nom, prenom, email, tel, specialite, mots_de_passe, role });
  
      const response = await fetch(`http://localhost:3000/instructeurs/modifier/${instructeurId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          tel,
          specialite,
          mots_de_passe,
          role,
        }),
      });
  
      console.log('Réponse de la requête:', response);
  
      if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'instructeur. Veuillez réessayer plus tard.');
      }
  
      const data = await response.json();
      console.log('Données de la réponse:', data);
      // Gérer la réponse JSON normalement
    } catch (error) {
      console.error('Erreur lors de la modification de l\'instructeur:', error.message);
      // Afficher un message d'erreur à l'utilisateur
    }
  };
  
  return (
    <div>
      <h2>Modifier l'instructeur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <label>Prénom:</label>
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Téléphone:</label>
          <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
        </div>
        <div>
          <label>Spécialité:</label>
          <input type="text" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={mots_de_passe} onChange={(e) => setmots_de_passe(e.target.value)} />
        </div>
        <div>
          <label>Rôle:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierInstructeur;
