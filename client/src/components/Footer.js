import Copyright from './Copyright';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from '@mui/system';

const Footer = () => {
    
    return (
    <Box mcomponent="footer" sx={{ bgcolor: '#1976d2', py:2 }}>
      <Container maxWidth="lg">
        <Typography color='#FFF' variant="h6" align="center" gutterBottom>
          MindFitness
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Container>
    </Box>
    );
}

export default Footer;