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
import '../../css/liste.css';
import Devenir from './devenir';


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
  const [isNew, setNew] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContainer
      sx={{ maxWidth: 345 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia
        component="div"
        className={`card-media ${isNew ? 'new' : ''}`}
      >
        {isNew && <div className="new-label">New</div>}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKyVc4U_7Rbjvk4bELndiacM5K3I9QMg9TGKcMWVAI2Q&s"
          alt="Paella dish"
          className="card-image"
        />
      </CardMedia>
      {isHovered && (
        <HoverContent className="hover-content">
          <Typography variant="h6" color="text.primary">
            Plant de cour
          </Typography>
          <Typography variant="body2" color="text.primary">
            Prix: $15.99
          </Typography>
          <Typography variant="body2" color="text.primary">
            Plat: Paella aux crevettes et chorizo
          </Typography>
          <Link to="/">
            Voir plus <StarIcon />
          </Link>
        </HoverContent>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
      
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Paella aux crevettes et chorizo"
        subheader="14 septembre 2016"
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

const CardGride = () => {
  return (
    <> 
     <page1/>
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

export default CardGride;
