import { useState } from "react";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
} from "@mui/material";

const ContentForm = ({ handleValidate }) => {
  const [list, setList] = useState([
    {
      name: "",
      description: "",
      support: {
        name: "",
        file: null,
      },
    },
  ]);

  const handleChange = (index, event) => {
    let value = null;
    if (event.target.id == "fileInput") {
      console.log(event.target.files.item(0))
      value = {
        name: event.target.value,
        file: event.target.files.item(0)
      }
    } else {
      value = event.target.value;
    }
    let data = [...list];
    data[index][event?.target?.name] = value;
    setList(data);
  };

  const handleAddChapter = () => {
    console.log(list)
    let newChapter = {
      name: "",
      description: "",
      support: { name: "", file: null },
    };
    setList([...list, newChapter]);
  };
  return (
    <>
      <Box mb={5}>
        <Button
          variant="contained"
          onClick={() => handleAddChapter()}
          color="primary"
        >
          Add Chapter
        </Button>
      </Box>
      <Grid container spacing={2}>
        {list.map((item, index) => {
          return (
            <Grid
              display="flex"
              justifyContent="space-evenly"
              item
              key={index}
              xs={12}
            >
              <FormControl width="50%">
                <InputLabel htmlFor="titleInput">Chapter Title</InputLabel>
                <Input
                  value={item.name}
                  onChange={(event) => handleChange(index, event)}
                  id="titleInput"
                  name="name"
                  type="text"
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="descriptionInput">
                  Chapter Description
                </InputLabel>
                <Input
                  value={item.description}
                  onChange={(event) => handleChange(index, event)}
                  name="description"
                  id="descriptionInput"
                  type="text"
                  variant="standard"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="fileInput">File</InputLabel>
                <Input
                  name="support"
                  id="fileInput"
                  type="file"
                  multiple={false}
                  value={item?.support?.name}
                  onChange={(event) => {
                    handleChange(index, event);
                  }}
                />
              </FormControl>
            </Grid>
          );
        })}
        <Grid item xs={12} justifyContent="end" display="flex">
          <Button variant="contained" onClick={(e) => handleValidate(list, 1)} >
            Validate this content
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ContentForm;
