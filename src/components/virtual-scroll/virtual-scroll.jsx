import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { throttle } from '../../lib/utils';
import styles from './virtual-scroll.css';

const VirtualScroll = class extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      startItem: 0,
      finishItem: props.bufferSize,
      scrollTopItems: 0,
    };

    this.handleScroll = throttle(this.handleScroll, 100);
  }

  handleScroll = (e) => {
    const { scrollTop } = e.target;
    const { itemHeight } = this.props;
    const scrollTopItems = Math.floor(scrollTop / itemHeight);

    const { children: items, bufferSize, viewItemsCount } = this.props;
    const { startItem, finishItem } = this.calculateStartFinish({ items, scrollTopItems, bufferSize, viewItemsCount });

    this.setState({ scrollTopItems, startItem, finishItem });

    e.preventDefault && e.preventDefault();
  }

  calculateStartFinish({ items, scrollTopItems, bufferSize, viewItemsCount }) {
    const startItem = Math.max(0, scrollTopItems - (bufferSize - viewItemsCount) / 2);
    const finishItem = Math.min(items.length, startItem + bufferSize);

    return { startItem, finishItem };
  }

  renderItems({ items, startItem, finishItem }) {
    const normalizedStartItem = startItem - startItem % 20;
    const normalizedFinishItem = finishItem - finishItem % 20;

    const slicedItems = items.slice(normalizedStartItem, normalizedFinishItem);

    return slicedItems.map((item, i) => {
      const { userName } = item.props;
      const { itemHeight } = this.props;

      return (
        <div
          key={ userName }
          className={ userName }
          style={{
            position: 'absolute',
            top: (normalizedStartItem + i) * itemHeight + 'px',
          }}
        >
          { item }
        </div>
      );
    });
  }

  render() {
    const { itemHeight, viewItemsCount, children: items } = this.props;
    const { startItem, finishItem } = this.state;

    const renderedItems = this.renderItems({ items, startItem, finishItem });

    return (
      <div
        className={styles.dataContainer}
        onScroll={ this.handleScroll }
        onWheel={ this.handleWheel }
        style={{
          height: `${itemHeight * viewItemsCount}px`
        }}
      >
        <div
          className={styles.scrollContainer}
          style={{
            height: `${itemHeight * renderedItems.length}px`
          }}
        >
          { renderedItems }
        </div>
      </div>
    );
  }

  static propTypes = {
    children: PropTypes.array.isRequired,
    viewItemsCount: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    bufferSize: PropTypes.number.isRequired,
  };
};

export default VirtualScroll;
