import React from 'react';
import 'firebase/auth';

import { Grid, Box } from '@mui/material';

import SignUpForm from './SignUpForm';

const SignUpScreen: React.FC = () => {
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={1} sm={9}>
          <Grid item sm={6} style={{ height: '100vh' }}>
            <div
              style={{
                backgroundImage: 'url(./LoginImage.png)',
                backgroundSize: 'contain',
                width: '100%',
                height: '100%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Grid>
          <Grid
            item
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SignUpForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpScreen;
