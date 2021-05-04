import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Credentials } from '../src/common/types';
import axios from 'axios';
import { ROBINHOOD_TOKEN_COOKIE } from '../src/common/constants';
import { Avatar, Box, Button, CircularProgress, CssBaseline, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Copyright, LockOutlined } from '@material-ui/icons';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { getCookie } from '../src/services/auth-services';
import { urls } from '../src/common/urls';

const useStyles = makeStyles((theme) => ({
    sessionExpired: {
        border: 'red 1px solid',
        borderRadius: '5px',
        color: 'red',
        padding: '0.6rem',
    },
    loginFailed: {
        color: 'red',
    },
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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

const Home: React.FC = () => {
    const router = useRouter();
    const classes = useStyles();
    const [credentials, setCredentials] = useState<Credentials>();
    const [showMFA, setShowMFA] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCredentials(c => ({ ...c, [event.target.name]: event.target.value }));
    }

    const storeToken = (token: string, maxAge: number) => {
        if (token && maxAge) {
            document.cookie = `${ROBINHOOD_TOKEN_COOKIE}=${token}; max-age=${maxAge}; path=/`;
        }
    }

    const handleLogin = async (event?: React.FormEvent) => {
        event?.preventDefault();
        setLoginFailed(false);
        setShowProgress(true);
        let loginRes;
        try {
            loginRes = await axios.post('/api/login', credentials);
        } catch (e) {
            setLoginFailed(true);
        }
        setShowProgress(false);
        if (loginRes?.status === 200) {
            if (loginRes.data.access_token) {
                storeToken(loginRes.data.access_token, loginRes.data.expires_in);
                router.push('/');
            } else if (loginRes.data.mfa_required) {
                switch (loginRes.data.mfa_type) {
                    case 'app': {
                        setShowMFA(true);
                    }
                }
            }
        } else {
            setLoginFailed(true);
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>Login | RobinTax</title>
            </Head>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} lg={8} xl={3} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} lg={4} xl={9} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        { router.query.session_expired === 'true' &&
                            <p className={classes.sessionExpired}>Session expired. Please login again.</p>
                        }
                        <Avatar className={classes.avatar}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={e => handleLogin(e)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email or username"
                                name="username"
                                autoComplete="off"
                                autoFocus
                                onChange={e => handleInputChange(e)}
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
                                onChange={e => handleInputChange(e)}
                            />
                            {showMFA &&
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="mfa_code"
                                    label="Enter MFA Code"
                                    type="text"
                                    id="mfa_code"
                                    autoComplete="off"
                                    onChange={e => handleInputChange(e)}
                                />
                            }
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {showProgress ? <CircularProgress size={24}/> : 'Login'}
                            </Button>
                            { loginFailed &&
                                <p className={classes.loginFailed}>Login failed.</p>
                            }
                            <Grid container>
                                <Grid item xs>
                                    <Link href={urls.ROBINHOOD_FORGOT_PASSWORD_LINK} target="_blank" variant="body2">
                                        Forgot your username or password?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright /> RobinTax {(new Date()).getFullYear()}
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    if (getCookie('robinhoodToken', context.req?.headers.cookie)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return { props: {} };
}

export default Home;
