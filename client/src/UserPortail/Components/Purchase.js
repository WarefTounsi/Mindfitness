import {
    Card,
    Typography,
    CardContent,
    Box,
    Chip,
    CardMedia,
    IconButton
} from '@mui/material';

import CloseIcon from "@mui/icons-material/Close";
import CardHeader from "@mui/material/CardHeader";

const Purchase = ({removeMe, id, name, price, image, advantages}) => {
    return (
        <Card sx={{ marginTop:2, display: "flex", justifyContent: "space-between" }}>
              <CardContent>
                <CardHeader
                  title={price + " DT"}
                  titleTypographyProps={{ variant: "h4" }}
                />
                <Typography my={2} ml={2} variant="h6">
                  {name}
                </Typography>
                <Box display="flex" justifyContent="space-evenly">
                  {advantages.map((advantage,index) => (<Chip key={index} sx={{marginX:1}} label={advantage} />))}
                </Box>
              </CardContent>
              <CardMedia
                sx={{ width: "40%" }}
                component="div"
                image={image}
              >
                <Box display='flex' justifyContent="flex-end">
                  <IconButton onClick={() => removeMe(id)} color='error'>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </CardMedia>
            </Card>
    )
}

export default Purchase