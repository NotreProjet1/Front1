import React from 'react';

const publication = () => {
  const userData = [
    { id: 1, avatar: 'url_avatar_1', name: 'John', surname: 'Doe', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, avatar: 'url_avatar_2', name: 'Jane', surname: 'Doe', description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
    { id: 3, avatar: 'url_avatar_3', name: 'Bob', surname: 'Smith', description: 'Fusce non vestibulum leo, vel accumsan lacus. Ut eu malesuada quam, ac tincidunt nisl.' },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Page</h1>
      <div className="row">
        {userData.map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={user.avatar} alt={`Avatar of ${user.name}`} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{`${user.name} ${user.surname}`}</h5>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{user.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default publication;
