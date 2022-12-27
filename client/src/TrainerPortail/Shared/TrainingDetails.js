import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { MenuItem, Select } from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";

const TrainingDetails = ({ handleValidate }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({ name: "", file: "" });
  const [video, setVideo] = useState({ name: "", file: "" });
  const [tags, setTags] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [addValues, setAddValues] = useState([]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="titleInput">Title</InputLabel>
          <Input
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="subTitleInput">SubTitle</InputLabel>
          <Input
            id="subTitleInput"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="CategorySelect">Category</InputLabel>
          <Select
            labelId="categorySelect"
            id="categorySelect"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            variant="standard"
          >
            <MenuItem value={"Cloud Computing"}>Cloud Computing</MenuItem>
            <MenuItem value={"Mobile Development"}>
              Mobile Developpement
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="priceInput">Price</InputLabel>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="priceInput"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="descriptionInput">Description</InputLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="descriptionInput"
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="imageInput">Image</InputLabel>
          <Input
            sx={{ paddingTop: 3 }}
            type="file"
            value={image?.name}
            onChange={(e) =>
              setImage({ name: e.target.value, file: e.target.files.item(0) })
            }
            accept="image/*"
            id="imageInput"
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="videoInput">Teaser</InputLabel>
          <Input
            sx={{ paddingTop: 3 }}
            type="file"
            value={video?.name}
            onChange={(e) =>
              setVideo({ name: e.target.value, file: e.target.files.item(0) })
            }
            accept="video/*"
            id="videoInput"
            placeholder="Choisir Une IMage"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          value={tags}
          onChange={(event, value) => setTags(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Tags" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          value={prerequisites}
          onChange={(event, value) => setPrerequisites(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Prerequisties" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          value={addValues}
          onChange={(event, value) => setAddValues(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Added Values" />
          )}
        />
      </Grid>
      <Grid
        justifyContent="end"
        item
        sx={{ display: "flex", flexDirection: "end" }}
        xs={12}
      >
        <Button
          variant="contained"
          onClick={(e) =>
            handleValidate(
              {
                title,
                subTitle,
                category,
                price,
                description,
                tags,
                prerequisites,
                addValues,
                image,
                video,
              },
              0
            )
          }
        >
          Validate This Informations
        </Button>
      </Grid>
    </Grid>
  );
};

export default TrainingDetails;
