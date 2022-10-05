import { Link } from "react-router-dom"
import { Container, Grid, Typography } from "@mui/material"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Missing = () => {
    return (
        <Container>
            <Grid align="center" m={5} p={5}>
                <Typography variant='h2' m={5}>
                    Oops!
                </Typography>
                <SentimentVeryDissatisfiedIcon color='warning' className="fs-1" />
                <Typography variant='h3' m={5}>
                    Page Not Found
                </Typography>
                <Link className="fs-3" to="/home">Visit Our Homepage</Link>
            </Grid>
            
        </Container>
    )
}

export default Missing
