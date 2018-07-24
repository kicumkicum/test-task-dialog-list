import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withDialogsLoad = (WrappedComponent) => {
  return class extends Component {
    handleScrollInDown = ({ itemsLength, bufferSize }) => {
      this.props.fetchDialogs({ from: itemsLength, to: bufferSize });
    }

    componentDidMount() {
      const { fetchDialogs, from, to } = this.props;
      fetchDialogs({ from, to });
    }

    render() {
      const { dialogs: dialogIds = [], markAsRead, dialogsByIds } = this.props;
      const dialogs = dialogIds.map((id) => dialogsByIds[id]);

      return <WrappedComponent
        dialogs={dialogs}
        onScrollInDown={this.handleScrollInDown}
        markAsRead={markAsRead}
      />
    }
  };
};

withDialogsLoad.propTypes = {
  fetchDialogs: PropTypes.func.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  dialogs: PropTypes.object,
  dialogsByIds: PropTypes.array,
};

export default withDialogsLoad;
