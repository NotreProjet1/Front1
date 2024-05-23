import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom'; // Importer Redirect
import { MDBInput } from 'mdb-react-ui-kit'; // Importer MDBInput
import { useHistory } from 'react-router-dom';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false); // État pour suivre si l'input email a le focus
  const [passwordFocused, setPasswordFocused] = useState(false); // État pour suivre si l'input password a le focus
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [adminData, setAdminData] = useState(null); // State for instructeurData
  const [role, setRole] = useState('admin'); // Rôle par défaut : participant




  const gradientStyle = {
    background: '#6a11cb',
    background: '-webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))',
    background: 'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))'
  };

  const customPlaceholderStyle = {
    color: 'rgba(255, 255, 255, 0.5)' // Couleur du placeholder
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/Admin/login', {
        email,
        mots_de_passe: password,
      });

      const responseData = response.data;

      if (response.status === 200) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('id_A', responseData.user.id);
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        localStorage.setItem('role', 'admin');
        console.log(role);
        localStorage.setItem('adminData', JSON.stringify(responseData.user));
        setTimeout(() => {
          window.location.reload();
        }, 1000); 

        // Afficher une notification de succès
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push({
          pathname: '/DashboardPage',
          state: { adminData: responseData.user,role: 'admin' }
        });

    window.location.reload();

      } else {
        // Afficher une notification d'échec
        toast.error('Login failed. Please check your credentials and try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Rediriger si isLoggedIn est vrai
  

  return (
    <section className="vh-100 gradient-custom" style={gradientStyle}>
      <style>
        {`
          .custom-placeholder {
            color:  color: rgba(255, 255, 255); /* Couleur du placeholder */
          }
        `}
      </style>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 h-100">
            <div className="card bg-dark text-white h-100" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <div className="form-outline form-white mb-4">
                    <label htmlFor="typeEmailX" className="text-white me-3 mt-2">Email</label>
                    <MDBInput
                      placeholder="Email"
                      id="typeEmailX"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={emailFocused || email ? "custom-placeholder" : ""}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}

                      labelClass="text-white" // Appliquer la classe pour le texte blanc
                    />

                  </div>
                  <div className="form-outline form-white mb-4">
                    <label htmlFor="typePasswordX" className="text-white me-3 mt-2">Password</label>
                    <MDBInput
                      placeholder="Password"
                      id="typePasswordX"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={passwordFocused || password ? "custom-placeholder" : ""}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}

                      labelClass="text-white" // Appliquer la classe pour le texte blanc
                    />

                  </div>
                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                  <button className="btn btn-outline-light btn-lg px-5" onClick={handleLogin}>Login</button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </section>
  );
};

export default LoginAdmin;
