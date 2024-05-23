import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Apinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px', // Taille minimale
        maxHeight: '400px', // Taille maximale
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default Apinner;
