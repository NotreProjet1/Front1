import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import '../../css/listg.css';

const HoverContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: yellow[500],
  borderRadius: '5px',
  padding: '10px',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  '& h6, & body2': {
    margin: 0,
  },
  '& a': {
    color: 'inherit',
  },
  '& svg': {
    color: yellow[700],
    marginLeft: '5px',
  },
  zIndex: 1,
  visibility: 'hidden',
}));

const CardContainer = styled(Card)(({ theme }) => ({
  position: 'relative',
  '&:hover $hoverContent': {
    visibility: 'visible',
  },
}));

const RecipeReviewCard = () => {
  const [isHovered, setHovered] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [isFree, setFree] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContainer
      sx={{ maxWidth: 345 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia component="div" className={`card-media ${isFree ? 'free' : ''}`}>
        {isFree && <div className="free-badge">Gratuit</div>}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKyVc4U_7Rbjvk4bELndiacM5K3I9QMg9TGKcMWVAI2Q&s"
          alt="Paella dish"
          className="card-image"
        />
      </CardMedia>
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
       titre de formation
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMoreIcon
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        />
      </CardActions>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="nom et prenom de formateur "
        subheader="date de cration formation"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          {/* ... (votre contenu ici) ... */}
        </CardContent>
      </Collapse>
    </CardContainer>
  );
};

const CardGrid = () => {
  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <RecipeReviewCard />
        </Grid>
        <Grid item>
          <RecipeReviewCard />
        </Grid>
        <Grid item>
          <RecipeReviewCard />
        </Grid>
      </Grid>
    </>
  );
};

export default CardGrid;
