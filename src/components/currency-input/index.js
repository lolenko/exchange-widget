import React, { Component } from 'react';
import './styles.css';

class CurrencyInput extends Component {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }

  onChange(ev) {
    this.props.onChange(Math.abs(parseFloat(ev.target.value)) || 0);
  }

  onCurrencyChange(ev) {
    this.props.onCurrencyChange(ev.target.value);
  }
  
  render() {
    let sign = '';
    if (this.props.value) {
      sign = this.props.isOutput ? '+' : '-';
    }
    const value = this.props.value || '';
    const overflow = !this.props.isOutput && this.props.value > this.props.amount ? 'currency-input_overflow' : ''

    return (
      <div className={`currency-input ${this.props.className} ${overflow ? 'currency-input_overflow' : ''}`}>
        <p className="currency-input__row">
          <select className="currency-input__select" value={this.props.currency} onChange={this.onCurrencyChange}>
            {this.props.currencies.map(currency => <option value={currency} key={currency}>{currency}</option>)}
          </select>
          <input 
            className="currency-input__value"
            name={this.props.name}
            autoComplete="off"
            type="text"
            pattern="[-+]?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?"
            maxLength="15"
            value={`${sign}${value}`}
            onChange={this.onChange} />
        </p>
        <p className="currency-input__row">
          <span className="currency-input__amount">You have {this.props.char}{this.props.amount}</span>
          <span className="currency-input__rate">{this.props.rate}</span>
        </p>
      </div>
    );
  }
}

export default CurrencyInput;
