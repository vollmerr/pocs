import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

function Example() {
  const intl = useIntl();

  return (
    <div>
      in example...

      <FormattedMessage id={'Example.title'} tagName={'h1'} />

      <h2>This is {intl.formatMessage({ id: 'Example.content' }, { v1: 'v-1', v2: 'v-2' })}...</h2>
    </div>
  );
}

export default Example;
