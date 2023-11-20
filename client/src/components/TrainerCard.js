import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserToDM } from '../store/slices/user/userSlice';
import { setActiveConversation, setIsLoading, setIsOpen } from '../store/slices/conversation/conversationSlice';
import { setMessages } from '../store/slices/message/messageSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios'

const TrainerCard = ({picture,firstName, lastName, description, coachId}) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const getMessages = async (convID) => {
        if (convID) {
          dispatch(setIsLoading(true));
          let token = JSON.parse(sessionStorage.getItem("auth"))["accessToken"];
          if (
            token + "" == "undefined" ||
            token === null ||
            token === undefined ||
            !token
          ) {
            return () => {
              return navigate("/login");
            };
          }
          let config = {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
          await axios
            .get(`http://localhost:8800/messages/${convID}`, config)
            .then((res) => {
              dispatch(setMessages(res.data?.data));
              dispatch(setIsLoading(false));
            });
        }
      };
    const clickHandler = async (e)=>{
        e.preventDefault()
        let token = JSON.parse(sessionStorage.getItem('auth'))['accessToken'];
    
            if (token + "" == "undefined" || token === null || token === undefined || !token) {
                return () => {
                    return navigate('/login');
                }
            }
            let config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            dispatch(setUserToDM({
                firstName,
                lastName,
                id: coachId
            }));
            dispatch(setIsOpen(true))
            await axios.get(`http://localhost:8800/conversations/with/${coachId}`, config).then((res) => {
            if (res.data.data === null) {
                    dispatch(setActiveConversation(null));
                    dispatch(setMessages([]))
                } else {
                    dispatch(setActiveConversation(res?.data?.data));
                    getMessages(res?.data?.data?.id)
                }
                
            })
            return navigate('/user-profile/chat')
        }
    return (
        <Card className="shadow-lg" sx={{maxWidth:345}}> 
            <CardMedia align='center' className='p-5'>
                <Avatar src={picture?.src}  className='w-50 h-50'/> 
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
            <button style={{
                'border':'none',
                outline:'none',
                padding:'10px',
            }} onClick={(e)=>clickHandler(e)}> Message </button>
            </CardActions>
        </Card>
    )
}

export default TrainerCard;
