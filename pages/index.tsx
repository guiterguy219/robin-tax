import React, { useState } from 'react';
import Authenticate, { getAuthenticationServerSideProps, getCookie, logout } from '../src/services/auth-services';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import Dashboard from './dashboard';

const useStyles = makeStyles((theme) => ({
  spacer: {
    flexGrow: 1,
  }
}));

const Home = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState<any[]>([]);

  const getOrders = async () => {
    setOrders([]);
    const res = await axios.get('/api/orders');
    let orders = res.data.results;
    orders.forEach(async (order: any) => {
      const instrument = (await axios.get(`/api/proxy?url=${encodeURI(order.instrument)}`)).data;
      order.ticker = instrument.symbol;
      order.ticker_name = instrument.name;
      setOrders(o => ([...o, order]));
    });
  };

  return (
    <Authenticate>
      <React.Fragment>
        <Head>
          <title>Home | Robintax</title>
        </Head>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Robintax</Typography>
            <div className={classes.spacer}></div>
            <Button onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Button style={{marginTop: '100px'}} onClick={getOrders}>Get Orders</Button>
        {Boolean(orders.length) &&
          <pre>
            {JSON.stringify(orders, null, 4)}
          </pre>
        }
        <Dashboard />
      </React.Fragment>
    </Authenticate>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return getAuthenticationServerSideProps(context);
}

export default Home;
