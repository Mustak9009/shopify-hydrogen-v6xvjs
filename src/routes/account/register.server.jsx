import React from 'react'
import Layout from '../../components/Layout.server';
import AccountCreateForm from '../../components/account/AccountCreateForm.client';
const Register = () => {
  return (
    <Layout>
      <AccountCreateForm/>
    </Layout>
  )
}

export default Register;