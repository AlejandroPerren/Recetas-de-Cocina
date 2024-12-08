import * as React from 'react';
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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IRecipes } from '../models/ServicesModel';

interface ExpandMoreProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

function RecipeReviewCard({ card }: { card: IRecipes }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {card.title.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={card.title}
                subheader={new Date(card.createdAt).toLocaleDateString()}
            />
            <CardMedia
                component="img"
                height="194"
                image={card.image || '/static/images/cards/paella.jpg'}
                alt={`${card.title} image`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {card.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Type:</strong> {card.type}
                </Typography>
                <Typography variant="body2">
                    <strong>Cooking Time:</strong> {card.cookingTime} mins
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h6">Ingredients</Typography>
                    <ul>
                        {card.ingredients.map((ingredient) => (
                            <li key={ingredient.name}>
                                {ingredient.quantity} of {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Steps
                    </Typography>
                    <ol>
                        {card.steps.map((step) => (
                            <li key={step.stepNumber}>
                                Step {step.stepNumber}: {step.instruction}
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RecipeReviewCard;
