import PeopleIcon from '@mui/icons-material/People';
import { Datagrid, List, TextField, DeleteButton } from 'react-admin';

export const userIcon = PeopleIcon;

export const userList = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="firstName" />
                <TextField source="lastName" />
                <TextField source="email" />
                <TextField source="created_at" />
                <TextField source="role" />
                <DeleteButton />
            </Datagrid>
        </List>
    )
}