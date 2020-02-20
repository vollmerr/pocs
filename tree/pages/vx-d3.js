import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import VXD3 from '../components/vx-d3'

const Basic = () => (
  <div>
    <Head>
      <title>D3 Tree</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <VXD3 />
  </div>
)

export default Basic
