import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import './LoginPage.css';

interface LoginPageProps {
  onSubmit: (values: any) => void;
}

const LoginPage = ({ onSubmit }: LoginPageProps) => {
  return (
    <div className="login-page__wrapper">
      <form
        className="login-page__form"
        onSubmit={(values) => onSubmit(values)}
      >
        <TextField label="Username" name="username" type="text" />
        <TextField label="Password" name="password" type="password" />
        <Button type="button" color="primary" className="form__custom-button">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
