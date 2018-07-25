import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DialogsList from './dialogs-list/dialogs-list';
import DevInstruments from './dev-instruments/dev-instruments';
import withDialogsLoad from '../hoc/with-dialogs-load'
// import withSlide from '../hoc/with-slide';
import {
  fetchAllUsers,
  selectUsers,
} from '../redux/modules/users';
import {
  fetchDialogs,
  markAsRead,
  selectDialogs,
  selectDialogsByIds,
} from '../redux/modules/dialogs';

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  dialogs: selectDialogs,
  dialogsByIds: selectDialogsByIds,
});

const mapDispatchToProps = {
  fetchAllUsers,
  fetchDialogs,
  markAsRead,
};

const DIALOGS_BUFFER_SIZE = 100;
const DIALOGS_VIEW_ITEMS_COUNT = 10;

const WrappedDialogsList = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(() => ({
    from: 0,
    to: DIALOGS_BUFFER_SIZE,
  })),
  withDialogsLoad,
  withProps(() => ({
    bufferSize: DIALOGS_BUFFER_SIZE,
    viewItemsCount: DIALOGS_VIEW_ITEMS_COUNT,
  })),
  // withProps(() => ({ from: 0, to: 5 })),
  // withSlide,
)(DialogsList);

class Main extends Component {
  render() {
    return (
      <div>
        <DevInstruments/>
        <WrappedDialogsList
          onClick
          onMessage
        />
      </div>
    );
  }
}

export default Main;
