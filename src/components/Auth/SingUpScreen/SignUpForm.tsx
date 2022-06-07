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
  FormHelperText,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { UIContext } from '../../Unknown/UIContext';

import { ReactComponent as Logo } from '../../Images/Vector.svg';

const SignUpForm: React.FC = () => {
  const auth = useAuth();

  const { setAlert } = useContext(UIContext);

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUpProcessing, setSignUpProcessing] = useState(false);

  useEffect(() => {
    if (!error) return;
    setAlert({
      show: !!error,
      severity: 'error',
      message: error,
    });
  }, [error, setAlert]);

  const handleSignUp = useCallback(
    async ({ email, password, fullName }) => {
      setSignUpProcessing(true);
      try {
        const result = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        if (!result?.user) {
          throw new Error('Something went wrong. Please try again');
        }

        await result.user.updateProfile({ displayName: fullName });
        setAlert({
          show: true,
          severity: 'success',
          message: 'Welcome on board 🚀',
        });
      } catch ({ message }) {
        setError(message as string);
      } finally {
        setSignUpProcessing(false);
      }
    },
    [auth, setError, setAlert, setSignUpProcessing],
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Required'),
      fullName: yup
        .string()
        .matches(
          /([A-Z]{1}[a-z]*[ ]?){2,}/,
          'Full name must contain 2 words and every start with capital letter',
        )
        .required('Full name is required'),
      password: yup
        .string()
        .min(12, 'Minimal 12 symbols')
        .required('Password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: handleSignUp,
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
            Register
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
                    helperText={formik.touched.email && formik.errors.email}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldTouched(e.target.name, true, true);
                    }}
                    onBlur={(e) =>
                      formik.setFieldTouched(e.target.name, true, true)
                    }
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    error={Boolean(formik.errors.fullName)}
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    value={formik.values.fullName}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldTouched(e.target.name, true, true);
                    }}
                    onBlur={(e) =>
                      formik.setFieldTouched(e.target.name, true, true)
                    }
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
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      value={formik.values.password}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldTouched(e.target.name, true, true);
                      }}
                      onBlur={(e) =>
                        formik.setFieldTouched(e.target.name, true, true)
                      }
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
                    {formik.touched.password && (
                      <FormHelperText error>
                        {formik.errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(formik.errors.confirmPassword)}
                      id="confirm-password"
                      name="confirmPassword"
                      label="Confirm password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formik.values.confirmPassword}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldTouched(e.target.name, true, true);
                      }}
                      onBlur={(e) =>
                        formik.setFieldTouched(e.target.name, true, true)
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error>
                      {formik.errors.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    disabled={signUpProcessing}
                  >
                    Register
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
            Already have account?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            <Button component={RouterLink} to="/login" color="secondary">
              Login
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
