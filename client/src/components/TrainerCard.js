import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';

const TrainerCard = ({picture,firstName, lastName, description, coachId}) => {
    const location = useLocation();
    return (
        <Card className="shadow-lg" sx={{maxWidth:345}}> 
            <CardMedia align='center' className='p-5'>
                <Avatar src={picture.src}  className='w-50 h-50'/> 
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {firstName + "  " + lastName}  
                </Typography>
                <Typography variant='body2' color='text.secondary' >
                    {description}
                </Typography>

            </CardContent>
            <CardActions className='justify-content-between'>
                <Button size="small" variant='outlined'><Link href={location.pathname + "/" +coachId}>About Me</Link></Button>
                <Button size="small" variant='outlined'>Reserver une Formation</Button>
            </CardActions>
        </Card>
    )
}

export default TrainerCard;