import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';

const MyPage = () => {
  const [likedUsers, setLikedUsers] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const userData = [
    { id: 1, avatar: 'url_avatar_1', name: 'John', surname: 'Doe', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, avatar: 'url_avatar_2', name: 'Jane', surname: 'Doe', description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
    { id: 3, avatar: 'url_avatar_3', name: 'Bob', surname: 'Smith', description: 'Fusce non vestibulum leo, vel accumsan lacus. Ut eu malesuada quam, ac tincidunt nisl.' },
  ];

  const handleLikeClick = (userId) => {
    if (!likedUsers.includes(userId)) {
      setLikedUsers([...likedUsers, userId]);
    } else {
      const updatedLikes = likedUsers.filter((id) => id !== userId);
      setLikedUsers(updatedLikes);
    }
  };

  const handleShowCommentModal = (userId) => {
    setShowCommentModal(true);
    setSelectedUser(userId);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Page</h1>
      <div className="row">
        {userData.map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <Card>
              <img src={user.avatar} alt={`Avatar of ${user.name}`} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{`${user.name} ${user.surname}`}</h5>
                <p className="card-text">{user.description}</p>
                <Button
                  variant={likedUsers.includes(user.id) ? 'danger' : 'outline-danger'}
                  onClick={() => handleLikeClick(user.id)}
                >
                  <FontAwesomeIcon icon={faThumbsUp} /> J'adore ({likedUsers.filter(id => id === user.id).length})
                </Button>
                <Button
                  variant="primary"
                  className="ml-2"
                  onClick={() => handleShowCommentModal(user.id)}
                >
                  <FontAwesomeIcon icon={faThumbsDown} /> J'aime({likedUsers.filter(id => id === user.id).length})
                </Button>
                <Button
                  variant="link"
                  className="ml-2"
                  onClick={() => handleShowCommentModal(user.id)}
                >
                  <FontAwesomeIcon icon={faComment} /> Commentaires
                </Button>
              </div>
            </Card>

            <Modal show={showCommentModal} onHide={handleCloseCommentModal}>
              <Modal.Header closeButton>
                <Modal.Title>Commentaires</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Ajoutez ici la section pour afficher et envoyer des commentaires */}
                <Form className="mt-3">
                  <Form.Group controlId="commentForm">
                    <Form.Label>Commentaire</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Ajouter un commentaire" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Envoyer
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
