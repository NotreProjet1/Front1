import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    backgroundColor: '#f0f0f0', // Couleur de fond du Card
    maxWidth: 400,
    margin: 'auto', // Centrer le Card
    marginTop: 100, // Marge supérieure pour le centrage vertical
    textAlign: 'center', // Centrer le texte
    borderRadius: 10,
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Ombre légère
  },
  icon: {
    color: '#7b1fa2', // Couleur violette pour l'icône de notification
  },
  notification: {
    position: 'absolute',
    bottom: 20, // Alignement au bas du Card
    width: '100%', // Pleine largeur
    textAlign: 'center', // Centrer le texte
  },
});

const Notifications = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get('http://localhost:3000/coursgratuis/notificationLastCours');
        const data = response.data;
        if (data.success) {
          setNotificationMessage(data.message);
          setNotificationOpen(true);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
        setError('Erreur lors de la récupération des notifications.');
      }
    };

    fetchNotification();
  }, []);

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
 
      <div className={classes.notification}>
        {error ? (
          <p>{error}</p>
        ) : (
          <Snackbar open={notificationOpen} autoHideDuration={3600000} onClose={handleCloseNotification}>
            <MuiAlert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
              {notificationMessage}
            </MuiAlert>
          </Snackbar>
        )}
      </div>
   
  );
};

export default Notifications;
