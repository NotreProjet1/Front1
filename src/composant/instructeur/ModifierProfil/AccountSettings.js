import React, { useState } from 'react';
import './AccountSettings.css';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountSettings = (updateUserProfileData) => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const userData = JSON.parse(decodeURIComponent(params.get('userData')));
  const [editedUserData, setEditedUserData] = useState(userData || {});
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      if (!userId) {
        console.error('ID du participant non défini');
        return;
      }

      setSaving(true);

      const response = await axios.put(`http://localhost:3000/instructeur/modifier/${userId}`, editedUserData);

      if (response.status === 200) {
     

        console.log('Modifications sauvegardées :', editedUserData);
        toast.success('Changes saved successfully!');
        // updateUserProfileData(editedUserData);
      
        localStorage.setItem('instructeurData', JSON.stringify(editedUserData));
        history.push({
          pathname: '/UserProfile',
          state: { instructeurData: editedUserData, role: 'instructeur' }
        });
      } else {
        console.error('Erreur lors de l\'enregistrement des modifications :', response.data.error);
        toast.error(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des modifications :', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="text-center">
      <ToastContainer />
      <div className="p-5 bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')", height: "300px" }}></div>

      <div className="card mx-auto shadow-5-strong" style={{ backgroundPosition: "center", marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.5)", maxWidth: "80%", backdropFilter: "blur(30px)" }}>
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Personal Information</h2>
              <form onSubmit={handleSaveChanges}>
                <div className="mb-4">
                  <input type="text" className="form-control" id="nom" name="nom" value={editedUserData?.nom || ''} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <input type="text" className="form-control" id="prenom" name="prenom" value={editedUserData?.prenom || ''} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <input type="text" className="form-control" id="tel" name="tel" value={editedUserData?.tel || ''} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <input type="email" className="form-control" id="email" name="email" value={editedUserData?.email || ''} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <input type="text" className="form-control" id="specialite" name="specialite" value={editedUserData?.specialite || ''} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <input type="text" className="form-control" id="specialite" name="specialite" value={editedUserData?.avatar || ''} onChange={handleInputChange} />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={{ width: "50%", margin: "0 auto" }}
                  onClick={handleSaveChanges}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
