import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { auth } from '../../lib/db'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isLogin, setIsLogin] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && Router.push('/')
    })
  }, [])

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      Router.push('/login')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
<Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={styles.signup_image} />
      <Grid item xs={12} sm={8} md={5}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Signup' : ''}
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
              onClick={createUser}
              color="primary"
              fullWidth
              variant="contained"
            >
              <PersonAddIcon />&nbsp;Signup
            </Button>
          </form>
          <Link href="/login">
            <a className="auth-link">LOGIN</a>
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignUp