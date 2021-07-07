import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Credentials } from '../src/common/types';
import axios from 'axios';
import { ROBINHOOD_TOKEN_COOKIE, ROBINHOOD_CHALLENGE_ID_HEADER } from '../src/common/constants';
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
        backgroundImage: 'url(/images/login-background.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#bbf9ff',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
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
    copyright: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const Home: React.FC = () => {
    const router = useRouter();
    const classes = useStyles();
    const [credentials, setCredentials] = useState<Credentials>();
    const [showMFA, setShowMFA] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [challengeTypes, setChallengeTypes] = useState<{ [key: string]: string }>();
    const [showChallenge, setShowChallenge] = useState(false);
    const [challenge, setChallenge] = useState<any>();
    const [challengeResponse, setChallengeResponse] = useState<string>();
    const [deviceToken, setDeviceToken] = useState<string>();

    useEffect(() => {
        if (credentials?.challenge_type) {
            handleLogin();
        }
    }, [credentials]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCredentials(c => ({ ...c, [event.target.name]: event.target.value }));
    }

    const storeToken = (token: string, maxAge: number) => {
        if (token && maxAge) {
            document.cookie = `${ROBINHOOD_TOKEN_COOKIE}=${token}; max-age=${maxAge}; path=/`;
        }
    }

    const handleLogin = async (event?: React.FormEvent, headers?: any) => {
        event?.preventDefault();
        setLoginFailed(false);
        setShowProgress(true);
        let loginRes;
        try {
            loginRes = await axios.post('/api/login', { ...credentials, device_token: deviceToken }, { headers });
        } catch (e) {
            setLoginFailed(true);
        }
        setShowProgress(false);
        if (loginRes?.status === 200) {
            setDeviceToken(loginRes.data.device_token);
            if (loginRes.data.access_token) {
                storeToken(loginRes.data.access_token, loginRes.data.expires_in);
                router.push('/');
            } else if (loginRes.data.mfa_required) {
                switch (loginRes.data.mfa_type) {
                    case 'app': {
                        setShowMFA(true);
                    }
                }
            } else if (loginRes.data.accept_challenge_types) {
                setChallengeTypes(loginRes.data.accept_challenge_types);
            } else if (loginRes.data.challenge) {
                setChallengeTypes(undefined);
                setShowChallenge(true);
                setChallenge(loginRes.data.challenge);
            }
        } else {
            setLoginFailed(true);
        }
    }

    const sendChallenge = (challengeType: string) => {
        setCredentials(c => ({ ...c, challenge_type: challengeType }));
    }

    const handleChallengeResponseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setChallengeResponse(event.target.value);
    }

    const respondToChallenge = async () => {
        if (challenge) {
            const body = {
                response: challengeResponse,
                challengeId: challenge.id,
            }
            axios.post('/api/respond', body)
                .then(res => {
                    handleLogin(undefined, { [ROBINHOOD_CHALLENGE_ID_HEADER]: res.data.id });
                });
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>Login | RobinTax</title>
            </Head>
            <Grid container component="main" className={classes.root}>
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
                            Login with Robinhood
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={e => handleLogin(e)}>
                            {challengeTypes ?
                                <Fragment>
                                    <Typography component="h1" variant="h5">
                                        Verify Your Identity
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        Robinhood is sending you a code to verify your identity. What is the best way to reach you?
                                    </Typography>
                                    {Object.keys(challengeTypes).map(typeKey =>
                                        <Button key={typeKey} type="button" onClick={() => sendChallenge(typeKey)}>{challengeTypes[typeKey]}</Button>
                                    )}
                                </Fragment>
                                : showChallenge ?
                                <Fragment>
                                    <Typography component="p" variant="body1">
                                        Enter your verification code:
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="challenge_code"
                                        label="Code"
                                        name="code"
                                        autoComplete="off"
                                        autoFocus
                                        onChange={e => handleChallengeResponseChange(e)}
                                    />
                                    <Button type="button" onClick={respondToChallenge}>Send</Button>
                                </Fragment>
                                :
                                <Fragment>
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
                                </Fragment>
                            }
                            <Box mt={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant="subtitle1">
                                    <Copyright/> | RobinTax {(new Date()).getFullYear()}
                                </Typography>
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
