import React, { Component } from 'react';
import compose from 'redux';

import DialogsList from './dialogs-list';
import withMessagesLoader from '../hoc/withMessagesLoader'
import withUsersLoader from '../hoc/withUsersLoader'


const WrappedDialogsList = compose(
  withMessagesLoader,
)(DialogsList);


class Main extends Component {
  render() {
    return (
      <div>
        <WrappedDialogsList
          users
          onClick
          onMessage
        />
        <DevInstrumenst/>
      </div>
    );
  }
}

export default Main;
