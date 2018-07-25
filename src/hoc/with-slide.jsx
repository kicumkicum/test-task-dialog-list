import React, { PureComponent } from 'react';
import { throttle } from 'lodash';

const withSlide = (WrappedComponent) => {
  return class extends PureComponent {
    constructor(props, context) {
      super(props, context);

      this.state = {
        from: props.from,
        to: props.to,
      };

      this.handleWheel = throttle(this.handleWheel.bind(this), 100);
      this.handleWheel = this.handleWheel.bind(this);
    }
    componentDidMount() {
      document.body.addEventListener('wheel', this.handleWheel);
    }

    componentWillUnmount() {
      document.body.removeEventListener('wheel', this.handleWheel);
    }

    handleWheel(e) {
      console.log('e', e);
      const { from, to } = this.state;
      let step = 0;

      if (e.deltaY > 0) {
        step += 1;
      } else {
        step -= 1;
      }

      const { dialogs } = this.props;
      const length = to - from;

      this.setState({
        from: Math.min(dialogs.length - 1 - length, Math.max(0, from + step)),
        to: Math.max(length, Math.min(dialogs.length - 1, to + step)),
        // style: {
        //   transform: `translateY(${e.deltaY}px)`,
          // transition: 'transform 0.1s',
        // },
      });
    }

    render() {
      const { dialogs } = this.props;
      const { from, to } = this.state;

      return <WrappedComponent
        dialogs={(dialogs || []).slice(from, to)}
        // style={this.state.style}
      />
    }
  };
};


export default withSlide;
