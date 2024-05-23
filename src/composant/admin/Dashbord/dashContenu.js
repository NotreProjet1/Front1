import React from "react";
import { Grid } from "@material-ui/core";
import FormationAdmin from "../demande/formationAdmin";
import ListeInstructeursAdmin from "../Profilinstructeur/ListProfilInstrcuteur";
import Tableau from "../statique/tableauInstrcut";
import ModifierAdmin from "../Profil/modifierCompt";
import ListeFormationAdmin from "../lister/Formation";
import ListecourAdmin from "../lister/cours";
import ListeRessourceAdmin from "../lister/ressource";
import CoursListAdminD from "../demande/listcoursadmin";
import StatiqueAdmin from "../statique/statique";
import InstructorChart from "../statique/instructeurStatique";
import StackedBarChart from "../statique/domaine";
import TotalChart from "../statique/etudier";
import ProfilParticipant from "../ProfilParticipant/profilParticipant";
import Tous from "../statique/tous";
import FormationAdminD from "../demande/formationAdmin";
import RessourcesDemande from "../demande/RessourceDemande";
import ListPublicationAdmin from "../demande/listPublicationAdmin";
import NavbarAdmin from "./navbar";
import PaiementTabl from "../paiement/tableau";
import FormationAdminDModifier from "../demandeModification/ModifierFormatoions";
import CoursListAdminModifier from "../demandeModification/modifierCours";
import RessourcesDemandeModifier from "../demandeModification/modifierRessource";

const DashboardContent = ({ selectedContent, sidebarOpen }) => {
  const contentClassName = sidebarOpen ? "content-container" : "content-container content-container-collapsed";
  
  return (
    <Grid container spacing={3} className={contentClassName} >
      <NavbarAdmin />
      {selectedContent === "ListecourAdmin" && (
        <Grid style={{marginBottom:'10px'}} item xs={12}>
          <ListecourAdmin />
        </Grid>
      )}
      {selectedContent === "ListeFormationAdmin" && (
        <Grid item xs={12}>
          <ListeFormationAdmin />
        </Grid>
      )}
      {selectedContent === "CoursListAdminD" && (
        <Grid item xs={12}>
          <CoursListAdminD />
        </Grid>
      )}
      {selectedContent === "FormationAdminD" && (
        <Grid item xs={12}>
          <FormationAdminD />
        </Grid>
      )}
      {selectedContent === "ProfilParticipant" && (
        <Grid item xs={12}>
          <ProfilParticipant />
        </Grid>
      )}
      {selectedContent === "ListeInstructeursAdmin" && (
        <Grid item xs={12}>
          <ListeInstructeursAdmin />
        </Grid>
      )}
      {selectedContent === "statiqueAdmin" && (
        <Grid item xs={12} style={{marginBottom:'10px'}}>
          <StatiqueAdmin />
        </Grid>
      )}
      {selectedContent === "InstructorChart" && (
        <Grid item xs={12} style={{marginBottom:'10px'}}>
          <InstructorChart />
        </Grid>
      )}
      {selectedContent === "TotalChart" && (
        <Grid item xs={12}style={{marginBottom:'10px'}}>
          <TotalChart />
        </Grid>
      )}
      {selectedContent === "StackedBarChart" && (
        <Grid item xs={12}style={{marginBottom:'10px'}}>
          <StackedBarChart />
        </Grid>
      )}
      {selectedContent === "Tous" && (
        <Grid item xs={12}>
          <Tous />
        </Grid>
      )}
      {selectedContent === "Tableau" && (
        <Grid item xs={12}>
          <Tableau />
        </Grid>
      )} 
      {selectedContent === "RessourcesDemande" && (
        <Grid item xs={12}>
          <RessourcesDemande />
        </Grid>
      )}  
      {selectedContent === "ListPublicationAdmin" && (
        <Grid item xs={12}>
          <ListPublicationAdmin />
        </Grid>
      )} 
         {selectedContent === "PaiementTabl" && (
        <Grid item xs={12}>
          <PaiementTabl   style={{ backgroundColor: 'red' }} />
        </Grid>
      )} 
          {selectedContent === "FormationAdminDModifier" && (
        <Grid item xs={12}>
          <FormationAdminDModifier    />
        </Grid>
      )}    
           {selectedContent === "CoursListAdminModifier" && (
        <Grid item xs={12}>
          <CoursListAdminModifier    />
        </Grid>
      )} 
             {selectedContent === "RessourcesDemandeModifier" && (
        <Grid item xs={12}>
          <RessourcesDemandeModifier    />
        </Grid>
      )} 
    </Grid>
  );
};

export default DashboardContent;
