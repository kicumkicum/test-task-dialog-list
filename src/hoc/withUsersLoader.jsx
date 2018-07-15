import React, { Component } from 'react';

const withUsersLoader = (WrappedComponent) => {
  return class extends Component {
    componentDidMount() {
      this.props.fetchAllUsers();
    }

    render() {
      return <WrappedComponent
        users={this.props.users || []}
      />
    }
  };
};



export default withUsersLoader;

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps)(withUsersLoader)
// )(withUsersLoader);

// export default () => connect(mapStateToProps, mapDispatchToProps)(withUsersLoader);
