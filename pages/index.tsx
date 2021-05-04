import React from 'react';
import Authenticate, { getAuthenticationServerSideProps, logout } from '../src/services/auth-services';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spacer: {
    flexGrow: 1,
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Authenticate>
      <React.Fragment>
        <Head>
          <title>Home | RobinTax</title>
        </Head>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">RobinTax</Typography>
            <div className={classes.spacer}></div>
            <Button onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </Authenticate>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return getAuthenticationServerSideProps(context);
}

export default Home;
