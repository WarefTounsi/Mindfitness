import Box from "@mui/material/Box";
import Header from "./Shared/Header";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TrainingDetails from "./Shared/TrainingDetails";
import { Button } from "@mui/material";
import ContentForm from "./Shared/ContentForm";
import { array } from "prop-types";
import { createTraining } from "../services/Training";
import { getCoachByEmail } from "../services/Trainer";
import useAuth from "../hooks/useAuth";

const Courses = () => {
  const auth = useAuth();
  const [value, setValue] = useState(0);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [coachIdentifier, setCoachIdentifier] = useState("");

  useEffect(() => {
    getCoachByEmail(JSON.parse(sessionStorage.getItem('auth'))?.user).then((coach) => setCoachIdentifier(coach[0]?.id))
  })

  const handleValidate = (e, type) => {
    console.log(e);
    switch (type) {
      case 0:
        setSummary(e);
        break;
      case 1:
        setContent(e);
        break;
    }
  };
  const handleSubmit = () => {
    const data = new FormData();
    data.append('creator',coachIdentifier)
    for (const property in summary) {
      switch (property) {
        case "prerequisites":
          summary[property]?.forEach((item) =>
            data.append("prerequisites", item)
          );
          break;
        case "addValues":
          summary[property]?.forEach((item) => data.append("addedValue", item));
          break;
        case "tags":
          summary[property]?.forEach((item) => data.append("image", item));
          break;
        case "image":
          data.append("image", summary[property].file);
          break;
        case "video":
          data.append("video", summary[property].file);
          break;
        default:
          data.append(property, summary[property]);
          break;
      }
    }
    
    content?.forEach((element) => {
      data.append("chaptersTitles", element["name"]);
      data.append("chaptersDescriptions", element["description"]);
      data.append("ressources", element?.support?.file);
    });
    // console.log(data.);
    createTraining(data).then((response) => {
      if (response.status === 201) {
        setMessage("Added Successfully");
      } else {
        setSeverity("error")
        setMessage("Failed")
      }
      response.status ? setMessage('Added Successfully') : setMessage('Failed');
    });
  };

  return (
    <>
      <Box>
        <Header title="Courses" />
        <Paper sx={{ marginTop: 5, padding: 5 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              aria-label="basic tabs example"
            >
              <Tab label="Training Summary" />
              <Tab label="Training Content" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <TrainingDetails handleValidate={handleValidate} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ContentForm handleValidate={handleValidate} />
            </TabPanel>
          </Box>
        </Paper>
        <Paper sx={{ marginTop: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: 2,
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Add New Course
            </Button>
          </Box>
          <Box  marginTop={5} marginBottom={3} display={message ? 'flex' : 'none'} justifyContent= "center">
            <Alert severity={severity}>{message}</Alert>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default Courses;
