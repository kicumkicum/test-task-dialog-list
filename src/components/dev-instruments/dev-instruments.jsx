import React from 'react';
import Button from '../button/button.jsx';

const DevInstruments = () => (
  <div>
    <Button message={'Msg from new user'} onClick={() => console.log('button pressed', 1)} className={''}/>
    <Button message={'Msg from first 10'} onClick={() => console.log('button pressed', 2)} className={''}/>
    <Button message={'Msg from another'} onClick={() => console.log('button pressed', 3)} className={''}/>
  </div>
);


export default DevInstruments;
