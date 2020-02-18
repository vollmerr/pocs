import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import { D3Basic } from '../components/D3'

const Basic = () => (
  <div>
    <Head>
      <title>D3 Basic</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <D3Basic />
  </div>
)

export default Basic
