import { Grid, Typography,Container } from '@mui/material';

export default function SectionHeader(props) {
    return (
        <Typography my={5} align="left" variant="h4">
                <span className="p-2 px-5 border-2 rounded-pill border shadow border-danger">
                    {props.name}
                </span>
        </Typography>
    );
}