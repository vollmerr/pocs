import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import D3TreeCanvas from '../components/D3'

const Basic = () => (
  <div>
    <Head>
      <title>D3 Tree</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <D3TreeCanvas />
  </div>
)

export default Basic
