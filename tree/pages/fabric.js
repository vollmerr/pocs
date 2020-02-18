import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import WithFabric from '../components/Fabric'

const Basic = () => (
  <div>
    <Head>
      <title>D3 Tree</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <WithFabric />
  </div>
)

export default Basic
