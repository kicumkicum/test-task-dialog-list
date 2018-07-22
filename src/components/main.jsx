import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DialogsList from './dialogs-list/dialogs-list';
import DevInstruments from './dev-instruments/dev-instruments';
import withUsersLoader from '../hoc/withUsersLoader'
import {fetchAllUsers, selectUsers} from '../redux/modules/users';

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
});

const mapDispatchToProps = {
  fetchAllUsers,
};

const DIALOGS_BUFFER_SIZE = 100;
const DIALOGS_VIEW_ITEMS_COUNT = 10;

const WrappedDialogsList = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUsersLoader,
  withProps(() => ({ viewItemsCount: DIALOGS_VIEW_ITEMS_COUNT, bufferSize: DIALOGS_BUFFER_SIZE })),
)(DialogsList);

class Main extends Component {
  render() {
    return (
      <div>
        <DevInstruments/>
        <WrappedDialogsList
          users
          onClick
          onMessage
        />
      </div>
    );
  }
}

export default Main;
