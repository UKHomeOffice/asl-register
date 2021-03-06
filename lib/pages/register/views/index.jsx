import React from 'react';
import { connect } from 'react-redux';
import FormLayout from '@asl/pages/pages/common/views/layouts/form';
import Snippet from '@asl/pages/pages/common/views/containers/snippet';

const Page = ({
  establishmentName,
  model: {
    email
  }
}) => (
  <FormLayout>
    <header>
      <h2>{establishmentName}</h2>
      <h1><Snippet>createAccount</Snippet></h1>
    </header>
    <div className="panel panel-wide">
      <Snippet email={email}>account.setup</Snippet>
    </div>
  </FormLayout>
);

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Page);
