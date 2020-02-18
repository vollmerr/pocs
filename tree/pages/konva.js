import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import WithKonva from '../components/Konva'

const Basic = () => (
  <div>
    <Head>
      <title>With Konva</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <WithKonva />

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
        background: #000;
      `}
    </style>
  </div>
)

export default Basic
