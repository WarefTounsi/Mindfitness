import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Chip } from "@mui/material";
import ReactPlayer from "react-player";

function FeaturedTraining(props) {
  return (
    <CardActionArea component="a" href={'training/' + props.id}>
      <Card sx={{ display: props.type }}>
        <CardMedia
          component="img"
          sx={{ width: 300, height: 200, display: { xs: "flex", sm: "flex" } }}
          src={props.image}
        >
        </CardMedia>
        <CardContent>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={8}>
              <Typography component="subtitle1" variant="h4">
                {props.title}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Chip label={props.category} variant="outlined" />
            </Grid>
          </Grid>
          <Grid pb={2}>
            <Typography component="subtitle2" variant="h6">
              {props.subTitle}
            </Typography>
          </Grid>
          <Typography variant="subtitle1" paragraph>
            {props.description}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Explore More
          </Typography>
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {
              props?.tags?.map((tag) => (
                <Grid  pr={2} py={2} item>
                  <Chip className="shadow-lg" label={tag} color="warning" />
                </Grid>
              ))
            }  
          </Grid>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default FeaturedTraining;
