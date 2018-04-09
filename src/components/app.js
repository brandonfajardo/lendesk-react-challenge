import React, { Component } from 'react';
import { connect } from 'react-redux'
import { findStock } from '../actions'
import _ from 'lodash'

const mapState = ({ stock: { stocks, error, mostRecentStockFound }}) => ({ stocks, error, mostRecentStockFound })
const mapDispatch = { findStock }

export default connect(mapState, mapDispatch)(
  class App extends Component {
    constructor(props){
      super(props)

      this.findStock = _.debounce(this.findStock.bind(this), 300)
    }

    findStock(inputVal) {
      this.props.findStock(inputVal)
    }

    render() {
      const { error, mostRecentStockFound, stocks } = this.props
      const price = _.get(stocks[mostRecentStockFound], 'price')
      const description = _.get(stocks[mostRecentStockFound], 'description')
      const symbol = _.get(stocks[mostRecentStockFound], 'symbol')
      return (
        <div style={{padding: '10px'}}>
          <input
            type="text"
            className="form-control"
            style={{width: '200px', marginBottom: '15px'}}
            placeholder="Enter a stock symbol"
            onChange={(e) => this.findStock(e.target.value.toUpperCase())}
          />
          <h3>Symbol</h3>
          <p>{symbol && !error ? symbol : null}</p>
          <h3>Current Stock Price</h3>
          <p>{price && !error ? price : null}</p>
          <h3>Description</h3>
          <p>{description && !error ? description : null}</p>
        </div>
      );
    }
  }
)
