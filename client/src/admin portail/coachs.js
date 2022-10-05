import * as react from 'react';
import { Create, Edit, List, Form, Title,ImageField, ImageInput, TextInput, SaveButton,TextField, DateField, Datagrid, EditButton, DeleteButton, SelectInput, EmailField} from 'react-admin';
import { Grid } from '@mui/material';
import SportsIcon from '@mui/icons-material/Sports';

export const coachIcon = SportsIcon;

export const coachList = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="firstName" />
                <TextField source="lastName" />
                <EmailField source="email" />
                <TextField source="phoneNumber" />
                <TextField source="description" />
                <TextField source="note" />
                <TextField source="gender" />
                <ImageField source="picture.src" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
};

export const coachEdit = () => {
    return (
        <Edit>
            <Form>
            <Grid p={5} container>
                <Grid itm p={2} xs={6}>
                    <TextInput name='firstName' source="First Name" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='lastName' source="Last Name" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='email' source="Email" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='phoneNumber' source="Phone Number" fullWidth />
                </Grid> 
                <Grid itm p={2} xs={6}>
                    <SelectInput name='gender' source="gender" fullWidth choices={
                        [
                            { id: 'Male', name: 'Male' },
                            { id:  'Femelle', name: 'Femelle' }
                        ]
                    } />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='description' source="Description" fullWidth />
                </Grid>
                <Grid itm xs={12}>
                    <ImageInput source="picture" multiple={false} label="choose a profile picture">
                        <ImageField source="src" title="src" />
                    </ImageInput>
                </Grid> 
                <Grid itm xs={12}>
                    <SaveButton />  
                </Grid>
            </Grid>
        </Form>
        </Edit>
    )
};

export const coachCreate = () => {
    return (
        <Grid m={5}>
    <Create>
        <Form>
            <Grid p={5} container>
                <Grid itm p={2} xs={6}>
                    <TextInput name='firstName' source="First Name" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='lastName' source="Last Name" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='email' source="Email" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='phoneNumber' source="Phone Number" fullWidth />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <SelectInput name='gender' source="gender" fullWidth choices={
                        [
                            { id: "Male", name: 'Male' },
                            { id:  "Femelle", name: 'Femelle' },
                        ]
                    } />
                </Grid>
                <Grid itm p={2} xs={6}>
                    <TextInput name='description' source="Description" fullWidth />
                </Grid> 
                <Grid itm xs={12}>
                    <ImageInput source="picture" multiple={false} label="choose a profile picture" accept="image/*">
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </Grid>
                <Grid itm xs={12}>
                    <SaveButton />
                </Grid>
            </Grid>
        </Form>
    </Create>
    </Grid>
    )
};
    