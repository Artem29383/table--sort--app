import React from 'react';
import './ModeSelector.css';

const ModeSelector = ({setMode}) => (
  <div className='loading'>
    <button onClick={() => setMode('1000')}>1000 элементов</button>
    <button onClick={() => setMode('32')}>32 элемента</button>
  </div>
);

export default ModeSelector;