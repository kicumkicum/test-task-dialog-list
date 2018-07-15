import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DialogsList from './dialogs-list/dialogs-list';
import DevInstruments from './dev-instruments/dev-instruments';
import withMessagesLoader from '../hoc/withMessagesLoader'
import withUsersLoader from '../hoc/withUsersLoader'
import {fetchAllUsers, selectUsers} from '../redux/modules/users';

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
});

const mapDispatchToProps = {
  fetchAllUsers,
};


const WrappedDialogsList = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUsersLoader,
)(DialogsList);

// const WrappedDialogsList = withUsersLoader(
//   DialogsList
// );

class Main extends Component {
  render() {
    return (
      <div>
        <WrappedDialogsList
          users
          onClick
          onMessage
        />
        <DevInstruments/>
      </div>
    );
  }
}

export default Main;
