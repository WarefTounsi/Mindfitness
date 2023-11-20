import Copyright from './Copyright';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from '@mui/system';

const Footer = () => {
    
    return (
    <Box mcomponent="footer" sx={{ bgcolor: '#F8F4E8', py:2 }}>
      <Container maxWidth="lg">
        <Typography color='#000000' variant="h6" align="center" gutterBottom>
          MindFitness
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Serving calmness since 2020
        </Typography>
        <Copyright />
      </Container>
    </Box>
    );
}

export default Footer;