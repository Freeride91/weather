import React from 'react';
import spinner from '../images/spinner.gif';

export default () => (
  <>
    <img
      src={spinner}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt='Betöltés...'
    />
  </>
);