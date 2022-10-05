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


const Purchase = () => {
    return (
        <Card sx={{ marginTop:2, display: "flex", justifyContent: "space-between" }}>
              <CardContent>
                <CardHeader
                  title="452,00 DT"
                  titleTypographyProps={{ variant: "h4" }}
                />
                <Typography ml={2} variant="h6">
                  {" "}
                  Cloud Computing
                </Typography>
                {/* <List>
                  <ListItem>
                    <ListItemIcon children={<PlaylistAddCheckCircleIcon />} />
                    <ListItemText>Chapter1</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon children={<PlaylistAddCheckCircleIcon />} />
                    <ListItemText>Chapter1</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon children={<PlaylistAddCheckCircleIcon />} />
                    <ListItemText>Chapter1</ListItemText>
                  </ListItem>
                </List> */}
                <Box display="flex" justifyContent="space-evenly">
                  <Chip label="Add Value1" />
                  <Chip label="Add Value1" />
                  <Chip label="Add Value1" />
                </Box>
              </CardContent>
              <CardMedia
                sx={{ width: "40%" }}
                component="div"
                image="https://picsum.photos/seed/picsum/300/200"
              >
                <Box display='flex' justifyContent="flex-end">
                  <IconButton color='error'>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </CardMedia>
            </Card>
    )
}

export default Purchase