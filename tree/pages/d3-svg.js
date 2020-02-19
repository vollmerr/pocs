import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import {D3SVG} from '../components/D3'

const Basic = () => (
  <div>
    <Head>
      <title>D3TreeSvg</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <D3SVG />
  </div>
)

export default Basic
