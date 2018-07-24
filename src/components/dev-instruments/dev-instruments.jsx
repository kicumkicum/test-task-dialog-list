import React from 'react';
import { connect } from 'react-redux';

import Button from '../button/button.jsx';
import {
  newMessageFromNewUser,
  newMessageFromOther,
  newMessageFromTen
} from '../../lib/stub-transport-request';


const DevInstruments = (props) => (
  <div>
    <Button
      message={'Msg from new user'}
      onClick={props.newMessageFromNewUser}
      className={''}
    />
    <Button
      message={'Msg from first 10'}
      onClick={props.newMessageFromTen}
      className={''}
    />
    <Button
      message={'Msg from other'}
      onClick={props.newMessageFromOther}
      className={''}
    />
  </div>
);

const mapDispatchToProps = {
  newMessageFromNewUser,
  newMessageFromOther,
  newMessageFromTen
};

export default connect(null, mapDispatchToProps)(DevInstruments);
