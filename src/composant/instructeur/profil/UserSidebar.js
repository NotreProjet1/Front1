import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = ({ activePage, userId, userdata,updateUserProfileData  }) => {
  const history = useHistory();

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    switch (selectedOption) {
      case 'travail':
        history.push('/votre-travail');
        break;
      case 'formation':
        history.push(`/ListeFormationInstructeur?userId=${userId}`);
        break;
      case 'cours':
        history.push(`/ListecoursInstructeur?userId=${userId}`);
        break;
      case 'ressource': 
        history.push(`/ListeresInstructeur?userId=${userId}`);  
        break;
        case 'ListePublicationInstructeur': 
        history.push(`/ListePublicationInstructeur?userId=${userId}`);  
        break;
      default:
        break;
    }
  };

  return (
    <div className='usersidebar'>
      <div className={`s1 ${activePage === 'ListeFormationInstructeur' ? 'active' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <select className="select-option" onChange={(e) => handleOptionChange(e)}>
          <option value="travail" selected={activePage === 'travail'}>Votre travail</option>
          <option value="formation" selected={activePage === 'formation'}>Liste des formations</option> 
          <option value="cours" selected={activePage === 'cours'}>Liste des cours</option> 
          <option value="ressource" selected={activePage === 'ressource'}>Liste des ressources</option>  
          <option value="ListePublicationInstructeur" selected={activePage === 'ListePublicationInstructeur'}>Liste des ListePublicationInstructeur</option>  
        </select>
      </div>
      <Link to={`/accountsettings?userId=${userId}&userData=${encodeURIComponent(JSON.stringify(userdata))}`} className={activePage === 'accountsettings' ? 'active' : ''}>
  <div className='s1'>
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd"/>
    </svg>
    <span>Paramètres du compte</span>
  </div>
</Link>

<Link to={`/AddFormationForm?userId=${userId}`} className={activePage === 'ListeFormationInstructeur' ? 'active' : ''}>
  <div className='s1'>
  <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd"/>
</svg>

    <span>Créer une formation</span>
  </div>
</Link>



<Link to={`/AddCours?userId=${userId}`} className={activePage === 'liste-cours' ? 'active' : ''}>
  <div className='s1'>
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/>
</svg>


    <span>Ajouter des cours</span>
  </div>
</Link> 

<Link to={`/AddRessource?userId=${userId}`} className={activePage === 'liste-ressources' ? 'active' : ''}>
  <div className='s1'>
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11 16.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Zm4.5 2.5v-1.5H14v-2h1.5V14h2v1.5H19v2h-1.5V19h-2Z" clip-rule="evenodd"/>
  <path d="M3.987 4A2 2 0 0 0 2 6v9a2 2 0 0 0 2 2h5v-2H4v-5h16V6a2 2 0 0 0-2-2H3.987Z"/>
  <path fill-rule="evenodd" d="M5 12a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
</svg>

    <span>Ajouter des ressources</span>
  </div>
</Link>

<Link to={`/AddPublication?userId=${userId}`} className={activePage === 'liste-ressources' ? 'active' : ''}>
  <div className='s1'>
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
</svg>

    <span>Ajouter une publication</span>
  </div>
</Link>
    </div>
  );
}

export default UserSidebar;