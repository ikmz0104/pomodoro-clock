import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { auth, providerTwitter } from '../../lib/db';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styles from '../styles/auth.module.css';
import CustomButton from 'components/Button';
import { TwitterLoginButton } from 'react-social-login-buttons';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
  },
  paper: {
    // margin: theme.spacing(8, 4),
    // display: 'flex',
    // flexDirection: 'column',
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

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('something is missing');
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleTwitterLogin = async () => {
    // ツイッターログイン処理
    await auth.signInWithRedirect(providerTwitter);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await auth.onAuthStateChanged((user) => {
        user ? Router.push('/') : setLoading(false);
      });
    }
    fetchData();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      Router.push('/login');
    } catch (err) {
      if (err.code === 'auth/invalid-email' || err.code === 'auth/email-already-in-use') {
        setErrorEmail(true);
      } else if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/weak-password') {
        setErrorPassword(true);
      }
      setErrorMessage(err.message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={styles.signup_image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} square className={classes.paper}>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        {!loading ? (
          <Box component="form" className={classes.form}>
            <TwitterLoginButton onClick={handleTwitterLogin} align="center" iconSize={'20'}>
              <span style={{ fontSize: 16 }}>Twitterでサインアップ</span>
            </TwitterLoginButton>
            <p>or</p>
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
              onClick={createUser}
              color="primary"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              <PersonAddIcon />
              &nbsp;Signup
            </CustomButton>
            <Link href="/login">
              <a className="auth-link">LOGIN</a>
            </Link>
          </Box>
        ) : (
          <div style={{ height: '100vh', width: '100vw', marginTop: 100, textAlign: 'center' }}>
            <CircularProgress />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default SignUp;
