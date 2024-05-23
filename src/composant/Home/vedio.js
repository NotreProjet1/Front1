import React, { useState } from 'react';
import { Card, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const VideoPage = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const videoData = [
    { id: 1, url: 'https://www.youtube.com/embed/QBrJp_Sd-7M?si=RlVNmcpMAsZ8BV2Y' },
    { id: 2, url: 'https://www.youtube.com/embed/T4mxZ2bazSA?si=cmwo-P5kN_Lq1Dfo' },
    { id: 3, url: 'https://www.youtube.com/embed/yMHill9jx5Q?si=fZh3bGHDtADnUh0B' },
  ];

  const handleLikeClick = (videoId) => {
    if (!likedVideos.includes(videoId)) {
      setLikedVideos([...likedVideos, videoId]);
    } else {
      const updatedLikes = likedVideos.filter((id) => id !== videoId);
      setLikedVideos(updatedLikes);
    }  
  };

  const handleShowModal = (videoId) => {
    setShowModal(true);
    setSelectedVideo(videoId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/commentaire/ajouter', {
        commentaireC: comment,
      });
      fetchComments(selectedVideo);
      toast.success("Commentaire ajouté avec succès !");
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error("Une erreur s'est produite lors de l'ajout du commentaire.");
    }
  };

  const fetchComments = async (videoId) => {
    try {
      const response = await axios.get(`http://localhost:3000/commentaire/lister?id=${videoId}`);
      setComments(response.data.liste);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleViewComments = async (videoId) => {
    try {
      await fetchComments(videoId);
      handleShowModal(videoId);
    } catch (error) {
      console.error('Error viewing comments:', error);
    }
  };

  return (
    <div className="container mt-5">
   
      <div className="row">
        {videoData.map((video) => (
          <div key={video.id} className="col-md-4">
            <Card>
              <iframe
                width="100%"
                height="200"
                src={video.url}
                title={`YouTube Video ${video.id}`}
                frameBorder="0"
                allowFullScreen
              />
              <Card.Body>
               
                <Button
                  variant={likedVideos.includes(video.id) ? 'danger' : 'outline-danger'}
                  onClick={() => handleLikeClick(video.id)}
                >
                  <FontAwesomeIcon icon={faHeart} /> Like
                </Button>
                <Button
                  variant="info"
                  className="ml-2"
                  onClick={() => handleViewComments(video.id)}
                >
                  <FontAwesomeIcon icon={faComments} /> Voir Commentaires
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="400"
            src={videoData.find((video) => video.id === selectedVideo)?.url}
            title={`YouTube Video ${selectedVideo}`}
            frameBorder="0"
            allowFullScreen
          />
          <Form className="mt-3" onSubmit={handleCommentSubmit}>
            <Form.Group controlId="commentForm">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Ajouter un commentaire" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </Form>
          <ListGroup className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>{comment.commentaireC}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default VideoPage;
