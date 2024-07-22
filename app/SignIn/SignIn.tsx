"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Swika {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs" className="pt-16 mx-auto">
      <CssBaseline />
      <Box
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className="bg-blue-500">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className="text-blue-500 text-xl">
          Connectez-vous
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className="mt-4 w-full">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            className="mb-4"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            className="mb-4"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 mb-2"
          >
            Se connecter
          </Button>
          <Grid container className="text-sm mt-4">
            <Grid item xs>
              <Link href="/Forgot" passHref className="text-blue-500 hover:underline">
                  Mot de passe oublié?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" passHref className="text-blue-500 hover:underline">
                  {"Pas de compte? S'inscrire"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright className="mt-8 mb-4" />
    </Container>
  );
}
