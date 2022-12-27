import * as react from "react";
import {
  Create,
  Edit,
  List,
  TabbedForm,
  SimpleFormIterator,
  ImageField,
  FileInput,
  NumberInput,
  FileField,
  ArrayInput,
  FormTab,
  Form,
  Title,
  AutocompleteArrayInput,
  TextInput,
  SaveButton,
  TextField,
  DateField,
  Datagrid,
  EditButton,
  DeleteButton,
  SelectInput,
  EmailField,
  RichTextField,
} from "react-admin";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useDataProvider } from "react-admin";

import { useGetList } from "react-admin";

export const trainingIcon = AutoStoriesIcon;

export const TrainingList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="title" />
        <TextField source="subTitle" />
        <TextField source="description" />
        <TextField source="category" />
        <TextField source="price" />
        <ImageField label="picture" source="image" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
export const trainingEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <FormTab label="summary">
          <TextInput name="title" source="title" fullWidth />
          <TextInput name="subTitle" source="subTitle" fullWidth />
          <SelectInput
            source="category"
            default="WEB Developpment"
            fullWidth
            choices={[
              { id: "WEB Developpment", name: "WEB Developpment" },
              { id: "Cloud Computing", name: "Cloud Computing" },
              { id: "Developpement Mobile", name: "Developpement Mobile" },
              { id: "Machine Learning", name: "Machine Learning" },
              { id: "Deep Learrning", name: "Deep Learrning" },
            ]}
          />
          <AutocompleteArrayInput
            source="tags"
            fullWidth
            choices={[
              { id: "programming", name: "Programming" },
              { id: "lifestyle", name: "Lifestyle" },
              { id: "photography", name: "Photography" },
            ]}
          />
          <NumberInput fullWidth source="price" />
        </FormTab>
        <FormTab label="description">
          <TextInput fullWidth source="description" />
        </FormTab>
        <FormTab label="prerequisites">
          <ArrayInput source="prerequisties" label="">
            <SimpleFormIterator>
              <TextInput fullWidth source="item" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="add Values">
          <ArrayInput source="addValues" label="">
            <SimpleFormIterator>
              <TextInput fullWidth source="item" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="content">
          <ArrayInput source="content" label="">
            <SimpleFormIterator>
              <TextInput fullWidth source="chapterTitle" />
              <TextInput fullWidth source="chapterDescription" />
              <FileInput source="file" label="Related files">
                <FileField source="src" title="title" />
              </FileInput>
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export const trainingCreate = () => {
  return (
    <Create>
      <TabbedForm>
        <FormTab label="summary">
          <TextInput name="title" source="title" fullWidth />
          <TextInput name="subTitle" source="subTitle" fullWidth />
          <SelectInput
            source="category"
            default="WEB Developpment"
            fullWidth
            choices={[
              { id: "WEB Developpment", name: "WEB Developpment" },
              { id: "Cloud Computing", name: "Cloud Computing" },
              { id: "Developpement Mobile", name: "Developpement Mobile" },
              { id: "Machine Learning", name: "Machine Learning" },
              { id: "Deep Learrning", name: "Deep Learrning" },
            ]}
          />
          <AutocompleteArrayInput
            source="tags"
            fullWidth
            choices={[
              { id: "programming", name: "Programming" },
              { id: "lifestyle", name: "Lifestyle" },
              { id: "photography", name: "Photography" },
            ]}
          />
          <NumberInput fullWidth source="price" />
        </FormTab>
        <FormTab label="description">
          <TextInput fullWidth source="description" />
          <FileInput fullWidth source="image">
            <FileField
              multiple={false}
              source="src"
              label="support your course with an image"
              accept="image/*"
            />
          </FileInput>
          <FileInput fullWidth source="video">
            <FileField
              multiple={false}
              source="src"
              label="support your course with a little teaser"
              accept="video/*"
            />
          </FileInput>
        </FormTab>
        <FormTab label="prerequisites">
          <ArrayInput source="prerequisties" label="">
            <SimpleFormIterator>
              <TextInput fullWidth source="item" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="added Values">
          <ArrayInput source="addedValue" label="">
            <SimpleFormIterator>
              <TextInput fullWidth source="item" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="content">
          <ArrayInput source="content">
            <SimpleFormIterator>
              <TextInput fullWidth source="chapterTitle" />
              <TextInput fullWidth source="chapterDescription" />
              <FileInput source="file" label="Related Resource">
                <FileField source="src" title="title" />
              </FileInput>
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
