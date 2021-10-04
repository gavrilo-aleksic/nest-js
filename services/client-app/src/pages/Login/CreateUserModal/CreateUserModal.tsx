import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

interface CreateUserModalProps {
  onSubmit: (username: string, password: string) => void;
  onCancel: () => void;
}
const CreateUserModal = React.forwardRef(
  ({ onSubmit, onCancel }: CreateUserModalProps, ref: any) => {
    const [newUser, setNewUser] = useState({
      username: '',
      password: '',
      passwordConfirm: '',
    });
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
          padding: '15px',
          gap: '20px',
          backgroundColor: 'white',
        }}
        ref={ref}
        component="form"
        onSubmit={(values: any) => {
          if (newUser.password === newUser.passwordConfirm) {
            onSubmit(newUser.username, newUser.password);
          }
        }}
        noValidate
      >
        <TextField
          margin="normal"
          required
          label="Username"
          name="newUsername"
          autoFocus
          value={newUser.username}
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              username: e.target.value,
            }))
          }
        />
        <TextField
          margin="normal"
          required
          name="newPassword"
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              password: e.target.value,
            }))
          }
        />
        <TextField
          margin="normal"
          required
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={newUser.passwordConfirm}
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              passwordConfirm: e.target.value,
            }))
          }
        />
        <Button type="submit" variant="contained">
          Create Account
        </Button>
        <Button onClick={onCancel} type="button" variant="contained">
          Cancel
        </Button>
      </Box>
    );
  },
);

export default CreateUserModal;
