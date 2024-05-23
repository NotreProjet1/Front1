import React from 'react';
import './changermotsdepass.css';

const ChangePassword = () => {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1 className="mainhead1">Change Password</h1>
            <form>
              {/* Old Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="oldPassword" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="oldPassword">Old Password</label>
              </div>

              {/* New Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="newPassword" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="newPassword">New Password</label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-lg btn-block">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
