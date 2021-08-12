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
import { Modal } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MoodBadIcon from '@material-ui/icons/MoodBad';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflow: 'scroll',
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '200vh',
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

  //もだもだもーだる
  modal: {
    outline: 'none',
    position: 'absolute',
    width: 500,
    borderRadius: 10,
    backgroundColor: 'White',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const auth = firebase.auth();
  const [isLogin, setIsLogin] = useState(true);
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false); // 最初は閉じておく
  const [resetEmail, setResetEmail] = useState('');

  const sendResetEmail = async () => {
    //メール送信ロジック
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false); //送ったら閉じる
        setResetEmail(''); //書いたら消す
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail('');
      });
  };

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
            <Button className={classes.submit} type="submit" onClick={logIn} color="primary" fullWidth variant="contained">
              <LockOpenSharpIcon />
              &nbsp;Login
            </Button>
          </form>
          <Link href="/signup">
            <a className="auth-link">SIGNUP</a>
          </Link>
          <hr></hr>
          <Button
            className={styles.password_reset}
            onClick={() => {
              setOpenModal(true);
            }}
            variant="outlined"
            color="secondary"
          >
            <MoodBadIcon />
            &nbsp;Reset password??
          </Button>
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <div style={getModalStyle()} className={classes.modal}>
              <div className="{styles.login_modal}">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  type="email"
                  name="email"
                  label="メールアドレスを入力して送信ボタンをクリックしてくださいね！（みーたん）"
                  value={resetEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setResetEmail(e.target.value);
                  }}
                />
                <div className={styles.reset}>
                <Button
                  onClick={sendResetEmail}
                >
                  <SendIcon />
                  &nbsp;送信
                </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
