import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import VX from '../components/vx'

const Basic = () => (
  <div>
    <Head>
      <title>VX</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <VX width={2000} height={1800}/>
  </div>
)

export default Basic
