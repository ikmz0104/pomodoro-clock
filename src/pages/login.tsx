import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import firebase from 'firebase';
import Router, { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import styles from '../styles/auth.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width : '200vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const auth = firebase.auth();
  const [isLogin, setIsLogin] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && Router.push('/');
    });
  }, []);

  const logIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Router.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={styles.login_image} />
      <Grid item xs={12} sm={8} md={5}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              className={classes.submit}
              type="submit"
              onClick={logIn}
              color="primary"
              fullWidth
              variant="contained"
            >
              <LockOpenSharpIcon />&nbsp;Login
            </Button>
          </form>
          <Link href="/signup">
            <a className="auth-link">SIGNUP</a>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;