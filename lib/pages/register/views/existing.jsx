import React from 'react';
import FormLayout from '@asl/pages/pages/common/views/layouts/form';
import Inset from '@asl/pages/pages/common/views/components/inset';
import Snippet from '@asl/pages/pages/common/views/containers/snippet';

const Page = ({ establishmentName }) => (
  <FormLayout>
    <header>
      <h2>{establishmentName}</h2>
      <h1><Snippet>existingUser</Snippet></h1>
    </header>
    <Inset>
      <Snippet>acceptInvitation</Snippet>
    </Inset>
  </FormLayout>
)

export default Page;
