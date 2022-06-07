import React, { useCallback, useState, useContext, useEffect } from 'react';
import 'firebase/auth';
import * as yup from 'yup';

import { useAuth } from 'reactfire';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  Container,
  Grid,
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { UIContext } from '../../Unknown/UIContext';

import { ReactComponent as Logo } from '../../Images/Vector.svg';

const SignInForm: React.FC = () => {
  const auth = useAuth();

  const { setAlert } = useContext(UIContext);

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!error) return;
    setAlert({
      show: !!error,
      severity: 'error',
      message: error,
    });
  }, [error, setAlert]);

  const handleSignIn = useCallback(
    async ({ email, password }) => {
      auth.signInWithEmailAndPassword(email, password).catch(({ message }) => {
        setError(message);
      });
    },
    [auth, setError],
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: handleSignIn,
  });

  return (
    <Grid
      container
      flexWrap="nowrap"
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      height="100vh"
    >
      <Grid
        container
        spacing={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
        flexWrap="nowrap"
      >
        <Grid item xs={8}>
          <Logo />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h3" component="h3">
            Login
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    error={Boolean(formik.errors.email)}
                    helperText={formik.errors.email}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
        flexWrap="nowrap"
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Don`t have an account?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            <Button component={RouterLink} to="/register" color="secondary">
              Register
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
