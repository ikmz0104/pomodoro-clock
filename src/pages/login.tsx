import { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { auth } from '../../lib/db';
// import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import styles from '../styles/auth.module.css';
import CustomButton from 'components/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
  },
  paper: {
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(8, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('something is missing');
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const auth = firebase.auth();
  const classes = useStyles();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && Router.push('/');
    });
  }, []);

  const logIn = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Router.push('/');
    } catch (err) {
      setLoading(false);
      if (err.code === 'auth/invalid-email' || err.code === 'auth/user-disabled' || err.code === 'auth/user-not-found') {
        console.log('a', err.code);
        setErrorEmail(true);
      } else if (err.code === 'auth/wrong-password') {
        console.log('b', err.code);
        setErrorPassword(true);
      }
      setErrorMessage(err.message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={styles.login_image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} square className={classes.paper}>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <Box component="form" className={classes.form}>
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
            error={errorEmail}
            helperText={errorEmail && errorMessage}
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
            error={errorPassword}
            helperText={errorPassword && errorMessage}
          />
          <CustomButton
            className={classes.submit}
            type="submit"
            onClick={logIn}
            color="primary"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            <LockOpenSharpIcon />
            &nbsp;Login
          </CustomButton>
          <Link href="/signup">
            <a className="auth-link">SIGNUP</a>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
