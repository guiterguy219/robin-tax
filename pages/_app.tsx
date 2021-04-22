import React from 'react';
import '../styles/globals.scss';

interface Props {
  Component: typeof React.Component | React.FC;
  pageProps: Object;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
