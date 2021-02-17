import React from 'react';
import App from 'next/app';
import '../mixins/css/global.scss';
import NextI18Next from '../i18n.js';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default NextI18Next.appWithTranslation(MyApp);
