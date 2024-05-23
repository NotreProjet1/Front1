import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Divider, IconButton, Paper } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'; 
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person"; 
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DescriptionIcon from "@material-ui/icons/Description";
const useStyles = makeStyles(theme => ({
  sidebarContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100%",
    zIndex: 1,
    overflowX: "hidden",
  },
  sidebarBackground: {
    backgroundImage: "url('https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-lumineux-leger-ville-route.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "250px", // Correspond à la largeur de la barre latérale
    height: "100%", // Correspond à la hauteur de la barre latérale
    position: "absolute",
    top: 0,
    left: 0,
    filter: "brightness(70%)",

  },
  sidebarContent: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "250px",
    height: "100%",
    borderRight: "1px solid #e0e0e0",
    position: "relative",
    zIndex: 2,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s ease",
    overflowX: "hidden",
    padding: "5px",
  },
  collapsedSidebar: {
    width: "50px",
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#444",
    }
  },
  searchA: {
    margin: "20px 10px",
    marginTop: "-40px",
    borderBottom: "1px  red",
    backgroundColor: "transparent",
  },
  icon: {
    color: "#fff",
    transition: "color 0.3s ease",
  },
  logo: {
    display: "block",
    margin: "20px auto",
    width: "60%", // Utilise 80% de la largeur du Paper
    height: "auto", // Ajuste automatiquement la hauteur
  },
  whiteText: {
    color: "#fff",
  },
}));

const Sidebar = ({ onSidebarItemClick }) => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProfileSelected, setUserProfileSelected] = useState(false);
  const [demandeSelected, setDemandeSelected] = useState(false);
  const [ConsulterSelected, setConsulterSelected] = useState(false);
  const [StatiqueSelected, setStatiqueSelected] = useState(false);
  const [modifierSelected, setmodifierSelected] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const history = useHistory();
  const [contentWidth, setContentWidth] = useState("calc(100% - 250px)"); // La largeur initiale du contenu
  const sidebarWidth = sidebarOpen ? "250px" : "50px"; // La largeur de la barre latérale en fonction de son état

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Mettre à jour la largeur du contenu en fonction de l'état de la barre latérale
    setContentWidth(sidebarOpen ? "calc(100% - 50px)" : "calc(100% - 250px)");
  };




  const handleSelectChange = (option) => {
    setUserProfileSelected(option === "userProfil" ? !userProfileSelected : false);
    setDemandeSelected(option === "demander" ? !demandeSelected : false);
    setConsulterSelected(option === "Consulter" ? !ConsulterSelected : false);
    setStatiqueSelected(option === "Statique" ? !StatiqueSelected : false);
    setmodifierSelected(option === "Modifier" ? !modifierSelected : false);
  };


  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('adminData');
    history.push('/');
    window.location.reload();
  };

  return (
    <div className={classes.sidebarContainer}>
      <div className={`${classes.sidebarBackground} ${!sidebarOpen && classes.collapsedSidebar}`}></div>
      <Paper className={`${classes.sidebarContent} ${!sidebarOpen && classes.collapsedSidebar}`} style={{ width: sidebarWidth }}>
         <IconButton onClick={toggleSidebar}>
          <MenuIcon className={`${classes.icon} ${classes.whiteText}`} />
        </IconButton>
        {sidebarOpen && (
          <>
            <img className={classes.logo} src='/images/logg.png' alt="Logo" />
          </>
        )}
        {sidebarOpen && (
          <IconButton onClick={handleLogout}>
            <PowerSettingsNewIcon className={`${classes.icon} ${classes.whiteText}`} />
          </IconButton>
        )}	
        <List className={classes.list}>
          <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("Tous")}>
            <HomeIcon className={`${classes.icon} ${classes.whiteText}`} />
            {sidebarOpen && <ListItemText primary="Dashboard" className={classes.whiteText} />}
          </ListItem>
          <Divider />
          <ListItem button className={classes.listItem} onClick={() => handleSelectChange("userProfil")}>
            <PersonIcon className={`${classes.icon} ${classes.whiteText}`} /> {/* Nouvel icône pour Profil */}
            {sidebarOpen && <ListItemText primary="User Profil" className={classes.whiteText} />}
          </ListItem>
          {userProfileSelected && sidebarOpen && (
            <>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ProfilParticipant")}>
                <ListItemText primary="Participants" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ListeInstructeursAdmin")}>
                <ListItemText primary="Instrcuteurs" className={classes.whiteText} />
              </ListItem>
            </>
          )}
          <ListItem button className={classes.listItem} onClick={() => handleSelectChange("Statique")}>
            <EqualizerIcon className={`${classes.icon} ${classes.whiteText}`} /> {/* Nouvel icône pour Statique */}
            {sidebarOpen && <ListItemText primary="Statique" className={classes.whiteText} />}
          </ListItem>
          {StatiqueSelected && sidebarOpen && (
            <>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("InstructorChart")}>
                <ListItemText primary="Augmentation" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("statiqueAdmin")}>
                <ListItemText primary="global" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("TotalChart")}>
                <ListItemText primary="nombre" className={classes.whiteText} />
              </ListItem>  
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("StackedBarChart")}>
                <ListItemText primary="Domaine" className={classes.whiteText} />
              </ListItem> 
            </>
          )}
          <ListItem button className={classes.listItem} onClick={() => handleSelectChange("demander")}>
            <PlaylistAddIcon className={`${classes.icon} ${classes.whiteText}`} /> {/* Nouvel icône pour Demande */}
            {sidebarOpen && <ListItemText primary="Demande" className={classes.whiteText} />}
          </ListItem>
          {demandeSelected && sidebarOpen && (
            <>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("FormationAdminD")}>
                <ListItemText primary="Formation" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("CoursListAdminD")}>
                <ListItemText primary="Cours gratuits" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("RessourcesDemande")}>
                <ListItemText primary="Ressources" className={classes.whiteText} />
              </ListItem> 
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ListPublicationAdmin")}>
                <ListItemText primary="Publications" className={classes.whiteText} />
              </ListItem> 
             
            </>
          )}
           <ListItem button className={classes.listItem} onClick={() => handleSelectChange("Modifier")}>
            <PlaylistAddIcon className={`${classes.icon} ${classes.whiteText}`} /> {/* Nouvel icône pour Demande */}
            {sidebarOpen && <ListItemText primary="modifier" className={classes.whiteText} />}
          </ListItem>
              {modifierSelected && sidebarOpen && (
            <>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("FormationAdminDModifier")}>
                <ListItemText primary="Formation" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("CoursListAdminModifier")}>
                <ListItemText primary="Cours gratuits" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("RessourcesDemandeModifier")}>
                <ListItemText primary="Ressources" className={classes.whiteText} />
              </ListItem> 
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("FormationAdminDModifier")}>
                <ListItemText primary="Publications" className={classes.whiteText} />
              </ListItem> FormationAdminDModifier
             
            </>
          )}

          <ListItem button className={classes.listItem} onClick={() => handleSelectChange("Consulter")}>
            <DescriptionIcon className={`${classes.icon} ${classes.whiteText}`} /> {/* Nouvel icône pour Consulter */}
            {sidebarOpen && <ListItemText primary="Consulter" className={classes.whiteText} />}
          </ListItem>
          {ConsulterSelected && sidebarOpen && (
            <>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ListeFormationAdmin")}>
                <ListItemText primary="Formation" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ListecourAdmin")}>
                <ListItemText primary="Cours gratuits" className={classes.whiteText} />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ListeRessourceAdmin")}>
                <ListItemText primary="Ressources" className={classes.whiteText} />
              </ListItem>
            </>
          )}

          <Divider />
          <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("ListeRessourceAdmin")}>
            <SupervisorAccountIcon className={`${classes.icon} ${classes.whiteText}`} />
            {sidebarOpen && <ListItemText primary="SuperAdmin" className={classes.whiteText} />}
          </ListItem>
          <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("Tableau")}>  
            <FormatListBulletedIcon className={`${classes.icon} ${classes.whiteText}`} />
            {sidebarOpen && <ListItemText primary="Table Liste" className={classes.whiteText} />}
          </ListItem> 
          <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("PaiementTabl")}>  
            <FormatListBulletedIcon className={`${classes.icon} ${classes.whiteText}`} />
            {sidebarOpen && <ListItemText primary="Table Paiement" className={classes.whiteText} />}
          </ListItem> 
        </List>
      </Paper>
      <div className="content" style={{ width: contentWidth }}>
        {/* Le contenu du tableau de bord va ici */}
      </div>
    </div>
  );
};

export default Sidebar;