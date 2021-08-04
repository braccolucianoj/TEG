import React from 'react';
import App from 'next/app';
import { Global, css } from '@emotion/react';

import '../mixins/css/global.scss';
import NextI18Next from '../i18n.js';

const globalStyles = css`
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #__text-sizer {
    height: auto;
    position: absolute;
    visibility: hidden;
    width: auto;
    white-space: nowrap;
  }

  div {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default NextI18Next.appWithTranslation(MyApp);
