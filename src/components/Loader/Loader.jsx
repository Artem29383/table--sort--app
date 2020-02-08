import React from 'react';
import './Loader.css'

const Loader = () => (
  <div className='center'>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;