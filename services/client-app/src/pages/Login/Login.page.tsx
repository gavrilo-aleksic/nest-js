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
import { loginUser } from '../../services/auth.service';
import { Modal } from '@material-ui/core';
import api from '../../services/api';

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
  const [registerModal, setRegisterModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ username: '', password: '', passwordConfirm: '' })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (username && password) {
      loginUser(username, password).then(() => {
        push('/');
      });
    }
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
      <Modal open={registerModal} onClose={() => setRegisterModal(false)} >
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
          padding: '15px',
          gap: '20px',
          backgroundColor: 'white'
        }}
          component="form" onSubmit={(values: any) => {
            console.log(values);
            if (newUser.password === newUser.passwordConfirm) {
              api.registerUser(newUser.username, newUser.password);
              setRegisterModal(false);
            }
          }} noValidate>
          <TextField
            margin="normal"
            required
            label="Username"
            name="newUsername"
            autoFocus
            value={newUser.username}
            onChange={(e) => setNewUser((newUser) => ({ ...newUser, username: e.target.value }))}
          />
          <TextField
            margin="normal"
            required
            name="newPassword"
            label="Password"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser((newUser) => ({ ...newUser, password: e.target.value }))}
          />
          <TextField
            margin="normal"
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={newUser.passwordConfirm}
            onChange={(e) => setNewUser((newUser) => ({ ...newUser, passwordConfirm: e.target.value }))}
          />
          <Button
            type="submit"
            variant="contained"
          >
            Create Account
          </Button>
          <Button
            onClick={() => setRegisterModal(false)}
            type="button"
            variant="contained"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container >
  );
};

export default LoginPage;
