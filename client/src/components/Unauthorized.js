import { useNavigate } from "react-router-dom"
import { Container, Grid, Typography, Button } from "@mui/material"
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Container>
            <Grid align="center" m={5} p={5}>
                <Typography variant='h2' m={5}>
                    Unauthorized!
                </Typography>
                <DoNotDisturbOnIcon  color="warning" fontSize="large" />
                <Typography variant='h3' m={5}>
                    You do not have access to the requested page
                </Typography>
                <Button variant="contained" onClick={goBack}> Go Back </Button>
            </Grid>
        </Container>
    )
}

export default Unauthorized
