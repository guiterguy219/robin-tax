import React, { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Home | RobinTax</title>
      </Head>
      <Link href="/login">
        Login to Robinhood
      </Link>
    </Fragment>
  )
}

export default Home;
