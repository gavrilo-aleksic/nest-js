import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router-dom';
import { fetchUserProfile, loginUser } from '../../services/auth.service';
import { Modal } from '@material-ui/core';
import api from '../../services/api';
import CreateUserModal from './CreateUserModal/CreateUserModal';
import { getFormData } from '../../services/form.utils';
import { UserContext } from '../../contexts/User.context';

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const LoginPage = () => {
  const { push } = useHistory();
  const { user, setUser } = React.useContext(UserContext);
  const [registerModal, setRegisterModal] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = getFormData<{
      username: string;
      password: string;
    }>(event.currentTarget);

    if (username && password) {
      loginUser(username, password).then((token) => {
        fetchUserProfile().then((res) => {
          setUser(res);
          push('/home');
        });
      });
    }
  };

  const handleRegister = (username: string, password: string) => {
    api.registerUser(username, password);
    setRegisterModal(false);
  };

  const openRegisterModal = () => setRegisterModal(true);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={openRegisterModal}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Modal open={registerModal} onClose={() => setRegisterModal(false)}>
        <CreateUserModal
          onSubmit={handleRegister}
          onCancel={() => setRegisterModal(false)}
        />
      </Modal>
    </Container>
  );
};

export default LoginPage;
