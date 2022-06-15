import React from 'react';
import Layout from '../components/Layout.server';
import Welcome from '../components/welcome.server';
export default function Index() {
  return (
    <Layout>
      <div>
        <Welcome />
      </div>
    </Layout>
  );
}
