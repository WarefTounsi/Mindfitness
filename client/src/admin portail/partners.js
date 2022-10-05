import * as react from 'react';
import { Create, Edit, List, Form, TextInput, SaveButton,TextField, DateField, Datagrid, EditButton, DeleteButton, SelectInput, EmailField, RichTextField} from 'react-admin';
import { ImageField, ImageInput } from 'react-admin';
import { Grid, Typography } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';

export const partnerIcon = HandshakeIcon;

export const partnerList = () => {
    return (
        <List>
            <Datagrid>
                <TextField  source="partnerName"></TextField>
                    <ImageField source="picture" />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}

export const partnerCreate = () => {
    return (
        <Create>
            <Grid align="center" m={5} xs={12}>
                    <Typography variant="h3">
                        Add new partner
                    </Typography>
            </Grid>
            <Form>
                <Grid container mt={5} direction='row' justifyContent='space-evenly' >
                    <Grid item>
                        <TextInput source="partnerName"></TextInput>
                    </Grid>
                    <Grid item>
                        <ImageInput source="picture" multiple={false} label="choose a partner logo" accept="image/*">
                            <ImageField source="src" title="title" />
                        </ImageInput>
                    </Grid>
                </Grid>
                <Grid xs={12} p={5} align="center">
                    <SaveButton />
                </Grid>
            </Form>
        </Create>
    )
}