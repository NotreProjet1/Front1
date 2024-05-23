import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';

const PaiementTabl = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/getFormationsPayees'); // Remplacez avec votre route API
        setFormations(response.data.formations);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'instructeur_nom',
        header: 'Nom de l\'instructeur',
        size: 200,
      },
      {
        accessorKey: 'instructeur_prenom',
        header: 'Prénom de l\'instructeur',
        size: 200,
      },
      {
        accessorKey: 'titre',
        header: 'Formation',
        size: 200,
      },
      {
        accessorKey: 'participant_nom',
        header: 'Participant qui a payé (Nom)',
        size: 200,
      },
      {
        accessorKey: 'participant_prenom',
        header: 'Participant qui a payé (Prénom)',
        size: 200,
      },
      {
        accessorKey: 'prix',
        header: 'Prix de la formation',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: formations,
  });

  return (
    <div style={{    backgroundColor: 'hsl(218, 41%, 15%)',
    backgroundImage: 'radial-gradient(650px circle at 0% 0%, hsl(218, 41%, 35%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%), radial-gradient(1250px circle at 100% 100%, hsl(218, 41%, 45%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%)',
    minHeight: '90vh', minHeight: '100vh', padding: '20px' }}>
      <div style={{ backgroundColor: '#eee', padding: '20px', textAlign: 'center' }}>
        <MaterialReactTable table={table} className="custom-table" />
      </div>
    </div>
  );
};

export default PaiementTabl;
