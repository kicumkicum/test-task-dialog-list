import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withDialogsLoad = (WrappedComponent) => {
  return class extends Component {
    componentDidMount() {
      const { fetchDialogs, from, to } = this.props;
      fetchDialogs({ from, to });
    }

    render() {
      return <WrappedComponent
        dialogs={this.props.dialogs || []}
      />
    }
  };
};

withDialogsLoad.propTypes = {
  fetchDialogs: PropTypes.func.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  dialogs: PropTypes.array,
};

export default withDialogsLoad;
