import React, { useState,useEffect  } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchComponent from './composant/Home/SearchComponent';
import './css/themecolor.css';
import  './App.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import tableau from './composant/admin/statique/tableauInstrcut';
import Login from './composant/Participants/registre/login';
import VideoPage from './composant/Home/vedio';
import publication from './composant/Home/publication';
import FormationAdmin from './composant/admin/demande/formationAdmin';

import HomeFinal from './composant/Home/homefinal';
import ParticipantRegister from './composant/Participants/registre/registreparticipant';
import Register from './composant/instructeur/registre/registreinstructeur';
import AddCours from './composant/instructeur/add/addCours';
import AffichCours from './composant/Participants/lister/courslister'; 
import UserProfilParticipant from './composant/Participants/profil/profil';

import UserProfileParticipant from './composant/Participants/profil/profil';  
import UserProfile from './composant/instructeur/profil/UserProfile';
import ModifierInstructeur from './composant/admin/Profilinstructeur/modifierInstructeur';
import ChangePassword from './composant/instructeur/ModifierProfil/ChangePassword';
import AccountSettings from './composant/instructeur/ModifierProfil/AccountSettings';
import Footer from './composant/Home/footer/footer';


import AddPublication from './composant/instructeur/add/addPublication';
import AddRessource from './composant/instructeur/add/addRessource';
import CoursGList from './composant/Participants/lister/courslister';
import Navbar from './composant/Home/navbar/nav';
import ListeInstructeur from './composant/Participants/lister/listeInstructeur';

import SingleCours from './composant/Participants/lister/iframCours';
import FormationsList from './composant/Participants/lister/FormationListe';
import SingleFormation from './composant/Participants/lister/detailllistformation';
import SinglePublication from './composant/Participants/lister/iframPublication';
import PublicationsList from './composant/Participants/lister/ListePublication';
import RessourceList from './composant/Participants/lister/listRessources';
import SingleRessource from './composant/Participants/lister/DetaillRessource';
import AddFormationForm from './composant/instructeur/add/newformation';
import ListeFormationInstructeur from './composant/instructeur/lister/listerFormationinstructeur';
import QuizForm from './composant/instructeur/add/addquizfinal.js';


import PageCollectionsDev from './composant/Home/collectionMarek';
import aboutnous from './composant/Home/aboutnous';
import Contact from './composant/Home/contacter/contatcttt';
import ListeresInstructeur from './composant/instructeur/lister/listressinst';
import ListecoursInstructeur from './composant/instructeur/lister/listeCoursInstructeur';
import SingleCoursPI from './composant/instructeur/lister/detaillecourspinstrecteur.js';
import ProfilePage from './composant/Participants/lister/listeInstructeur';
import loginAdmin from './composant/admin/Profil/login';
import { ToastContainer } from 'react-toastify'; // Importez ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import CoursListAdmin from './composant/admin/demande/listcoursadmin';
import ListPublicationAdmin from './composant/admin/demande/listPublicationAdmin';
import Sidebar from './composant/admin/Dashbord/sidebarAdmin';
import DashboardContent from './composant/admin/Dashbord/dashContenu';
import DashboardPage from './composant/admin/Dashbord/dashbord';
import ListeInstructeursAdmin from './composant/admin/Profilinstructeur/ListProfilInstrcuteur'; 
import Notifications from './composant/admin/notification/Notifications';
import ProfilParticipant from './composant/admin/ProfilParticipant/profilParticipant';
import ListecourAdmin from './composant/admin/lister/cours';
import ListeRessourceAdmin from './composant/admin/lister/ressource';
import ListeFormationAdmin from './composant/admin/lister/Formation';
import statiqueAdmin from './composant/admin/statique/statique';
import InstructorChart from './composant/admin/statique/instructeurStatique';
import TotalChart from './composant/admin/statique/etudier';
import Tous from './composant/admin/statique/tous';
import FormPasswordResetI from './composant/instructeur/Password/ressetpassword';
import FormPasswordReset from './composant/Participants/Password/resetpasswordParticipant';
import AddCoursP from './composant/instructeur/add/addCoursP';
import ModifierAdmin from './composant/admin/Profil/modifierCompt';
import CoursListAdminD from './composant/admin/demande/listcoursadmin';
import FormationAdminD from './composant/admin/demande/formationAdmin';
import StackedBarChart from './composant/admin/statique/domaine';
import RessourcesDemande from './composant/admin/demande/RessourceDemande';
import SingleCoursP from './composant/Participants/lister/DetailleCoursP';
import devenirInstructeur from './composant/Home/devenirInstructeur.js';
import DevenirParticipant from './composant/Home/devenirParticipant.js';
import PageCollectionsBusiness from './composant/Home/collectionBusiness.js';
import PageCollectionsDevelopment from './composant/Home/collectionDevelopment.js';
import Affiche from './composant/Home/affiche.js';
import AddQuiz from './composant/instructeur/add/addQuiz.js';
import QuizDetail from './composant/Participants/lister/quizDetail.js';
import QuizList from './composant/Participants/lister/quizliste.js';
import PaiementTabl from './composant/admin/paiement/tableau.js';
import FormationsListPayent from './composant/Participants/lister/FormationsListPayent.js';
import quizFinal from './composant/Participants/lister/quizFinal.js';
import SingleFormationPPP from './composant/Participants/lister/singledetaillePayant.js';
 import Quiz from './composant/jareb.js';
import Certificate from './composant/Participants/lister/certif.js';
import DetailQuizFinal from './composant/Participants/lister/detailleFinalQuiz.js';
import ListePublicationInstructeur from './composant/instructeur/lister/publication.js';
import InstructorQuizReview from './composant/instructeur/lister/quizDetailleFinal.js';
import UserQuizReview from './composant/instructeur/lister/quizDetaille.js';
import publicationAdmin from './composant/admin/lister/publication.js';
import PublicationParticipant from './composant/Participants/add/publication.js';
import FormationAdminDModifier from './composant/admin/demandeModification/ModifierFormatoions.js';



const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state for isLoggedIn
  const [role, setUserRole] = useState('participant'); // State for user role
  const [instructeurData, setInstructeurData] = useState(null); // State for instructeurData
  const [participantData, setParticipantData] = useState(null); // State for instructeurData
  const [adminData, setAdminData] = useState(null); // State for instructeurData


 useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    const instructeurData = JSON.parse(localStorage.getItem('instructeurData')); 
    const participantData = JSON.parse(localStorage.getItem('participantData')); 
    const adminData = JSON.parse(localStorage.getItem('adminData')); 
  
    if (loggedInStatus && role === "instructeur") {
      setIsLoggedIn(true);
      setUserRole(role); 
      setInstructeurData(instructeurData); 
    } else if (loggedInStatus && role === "participant") {
      setIsLoggedIn(true);
      setUserRole(role); 
      setParticipantData(participantData); 
    } else if (loggedInStatus && role === "admin") {

      setIsLoggedIn(true);
      setUserRole(role); 
      setAdminData(adminData); 

    }
  }, []);



  return (
    <Router>
      <div>
      {role !== 'admin' &&  

 <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} role={role} instructeurData={instructeurData} />}
        {showSearch && <SearchComponent />}
        <Switch>
          <Route exact path="/" component={HomeFinal} />
        
 
          <Route path="/VideoPage" component={VideoPage} />
          <Route path="/FormationAdmin" component={FormationAdmin} />

       
          <Route path="/UserProfile/:instructeurData" component={UserProfile} />
          <Route path="/UserProfileParticipant" component={UserProfileParticipant} />

    
        
          <Route path="/Register" component={Register} />
          <Route path="/publication  " component={publication} />
          <Route path="/HomeFinal" component={HomeFinal} /> 
          <Route path="/QuizForm/:formationId" component={QuizForm} />
          <Route path="/login">
            <Login setLoggedIn={setIsLoggedIn} />
          </Route>

         {/* deffinition */}
          <Route path="/Contact" component={Contact} />
          <Route path="/aboutnous" component={aboutnous} />
          <Route path="/devenirInstructeur" component={devenirInstructeur} /> 
          <Route path="/DevenirParticipant" component={DevenirParticipant} />
          
          <Route path="/ResetPasswordPageI" component={FormPasswordResetI} /> 
          <Route path="/ResetPasswordPage" component={FormPasswordReset} />

          <Route path="/PageCollectionsDev" component={PageCollectionsDev} />
          <Route path="/ParticipantRegister" component={ParticipantRegister} />
       
          
          <Route path="/UserProfilParticipant" component={UserProfilParticipant} />
          <Route path="/UserProfile" component={UserProfile} />
          <Route path="/AccountSettings/:userId" component={AccountSettings} />
          <Route path="/ModifierInstructeur" component={ModifierInstructeur} />
          <Route path="/ChangePassword" component={ChangePassword} /> 
          <Route path="/AccountSettings" component={AccountSettings} /> 
          {/* ajouter les  */}
          <Route path="/AddCours" component={AddCours} />
          <Route path="/AffichCours" component={AffichCours} />
          <Route path="/AddRessource" component={AddRessource} />
          <Route path="/AddPublication" component={AddPublication} />  
          <Route path="/AddCoursPayent/:formationId" component={AddCoursP} />
         {/* detaiiler pour les lister  */}
          <Route path="/publication/getPublicationById/:id" component={SinglePublication} />     
          <Route path="/formationP/getFormationById/:id" component={SingleFormation} />   
          <Route path="/coursgratuis/getCoursById/:id" component={SingleCours} />    
          <Route path="/coursPayant/getcoursById/:id" component={SingleCoursP} /> 
            
          <Route path="/coursPayantI/getCoursById/:id" component={SingleCoursPI} />    

          <Route path="/Ressource/getRessourceGById/:id" component={SingleRessource} />      
          <Route path="/ListePublicationInstructeur" component={ListePublicationInstructeur} /> 
         
          <Route path="/Formation/getformationById/:formation_id" component={SingleFormationPPP} />  
          <Route path="/quiz/:id_Q" component={DetailQuizFinal} /> 
          {/* lister  */}
          <Route path="/CoursGList" component={CoursGList} /> 
          <Route path="/FormationsList" component={FormationsList} /> 
          <Route path="/RessourceList" component={RessourceList} />
          <Route path="/PublicationsList" component={PublicationsList} />
          <Route path="/AddFormationForm" component={AddFormationForm} />  
          <Route path="/ProfilePage/:instructeur_id" component={ProfilePage} />  
          <Route path="/FormationsListPayent" component={FormationsListPayent} /> 
          <Route path="/UserQuizReview/:id_q" component={UserQuizReview} />
          <Route path="/quizFinal" component={quizFinal} />
          {/* liste pour instructeur   */}
          <Route path="/ListeFormationInstructeur" component={ListeFormationInstructeur} />    
          <Route path="/ListeresInstructeur" component={ListeresInstructeur} />     
          <Route path="/ListecoursInstructeur" component={ListecoursInstructeur} />     
          <Route path="/QuizfinalDetail/:id_Q" component={InstructorQuizReview} />
       

          {/* admin */}
          <Route path="/loginAdmin" component={loginAdmin} />  
     
          <Route path="/CoursListAdmin" component={CoursListAdmin} />  
          <Route path="/ListPublicationAdmin" component={ListPublicationAdmin} />    
          <Route path="/Sidebar" component={Sidebar} />      
          <Route path="/DashboardContent" component={DashboardContent} /> 
          <Route path="/DashboardPage" component={DashboardPage} />  
          <Route path="/ListeInstructeursAdmin" component={ListeInstructeursAdmin} />   
          
          <Route path="/AddQuiz/:id_cp" component={AddQuiz} />  
          <Route path="/ProfilParticipant" component={ProfilParticipant} />   
          <Route path="/ListecourAdmin" component={ListecourAdmin} />    
          <Route path="/ListeRessourceAdmin" component={ListeRessourceAdmin} />    
          <Route path="/ListeFormationAdmin" component={ListeFormationAdmin} />  
          <Route path="/tableau" component={tableau} /> 
          <Route path="/statiqueAdmin" component={statiqueAdmin} /> 
          <Route path="/InstructorChart" component={InstructorChart} />   
          <Route path="/TotalChart" component={TotalChart} />   
          <Route path="/Tous" component={Tous} /> 
          <Route path="/RessourcesDemande" component={RessourcesDemande} />  
          <Route path="/Affiche" component={Affiche} /> 
          <Route path="/AddQuiz" component={AddQuiz} />  
          <Route exact path="/QuizList" component={QuizList} />
          <Route path="/getQuizById/:id_q" component={QuizDetail} />  
          <Route path="/tablePaiement" component={PaiementTabl} />   
          <Route path="/Certificate" component={Certificate} />  
          <Route path="/Quiz" component={Quiz} /> 
          <Route path="/FormationAdminDModifier" component={FormationAdminDModifier} />  
          <Route path="/publicationAdmin" component={publicationAdmin} /> 
          <Route path="/PublicationParticipant" component={PublicationParticipant} />
          <ToastContainer />
          
        </Switch>
       
        {role !== 'admin' &&  
 < Footer/>}
      </div>
  
    </Router>
  );
};

export default App;
