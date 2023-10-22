import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { styled } from '@mui/system';

const CircleButton = styled(Button)`
  width: 40px;
  height: 40px;
  min-width: 0;
  border-radius: 50%;
`;

function BasicButtons() {
    return (
        <Stack spacing={15} direction="row">
            <Button variant="contained" color="primary">Search for places</Button>
            <CircleButton variant="contained" color="primary">
                <MyLocationIcon />
            </CircleButton>
        </Stack>
    );
}

export default BasicButtons;
