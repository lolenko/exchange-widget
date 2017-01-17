import React, { Component } from 'react';
import './styles.css';
import CurrencyInput from 'currency-input';
import * as money from 'constants/money';

class ExchangeWidget extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      input: 0,
      output: 0,
      inputCurrency: money.CURRENCIES.GBP,
      outputCurrency: money.CURRENCIES.EUR,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onOutputChange = this.onOutputChange.bind(this);
    this.onInputCurrencyChange = this.onInputCurrencyChange.bind(this);
    this.onOutputCurrencyChange = this.onOutputCurrencyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.input === 0 && nextState.input !== 0) {
      this.props.onFullfiled();
    } else if (this.state.input !== 0 && nextState.input === 0) {
      this.props.onEmpty();
    }
  }

  onInputChange(val) {
    this.setState({
      input: val,
      output: val * this.getRate()
    });
  }
  
  onOutputChange(val) {
    this.setState({
      input: val / this.getRate(),
      output: val
    });
  }

  onInputCurrencyChange(val) {
    this.setState({
      inputCurrency: val, 
      output: this.state.input * this.props.currencies[val].rates[this.state.outputCurrency]
    });
  }

  onOutputCurrencyChange(val) {
    this.setState({
      outputCurrency: val,
      output: this.state.input * this.props.currencies[this.state.inputCurrency].rates[val]
    });
  }

  getRate() {
    return this.props.currencies[this.state.inputCurrency].rates[this.state.outputCurrency];
  }

  onSubmit(ev) {
    ev.preventDefault();
    if (this.state.input > this.props.wallet[this.state.outputCurrency]) {
      return;
    }
    this.props.onExchange({
      from: {
        currency: this.state.inputCurrency,
        amount: this.state.input
      },
      to: {
        currency: this.state.outputCurrency,
        amount: this.state.output
      }
    });
    this.setState({
      input: 0,
      output: 0,
    })
  }

  render() {
    const rate = this.getRate(); 
    const inputChar = money.CHARS[this.state.inputCurrency];
    const outputChar = money.CHARS[this.state.outputCurrency];
    return (
      <form className="exchange-widget" onSubmit={this.onSubmit}>
        <div className="exchange-widget__input-box">
          <CurrencyInput 
            className="exchange-widget__input" 
            value={this.state.input}
            name="input"
            onChange={this.onInputChange}
            currency={this.state.inputCurrency}
            currencies={Object.keys(this.props.currencies).filter(currency => currency !== this.state.outputCurrency)}
            onCurrencyChange={this.onInputCurrencyChange}
            char={inputChar}
            amount={this.props.wallet[this.state.inputCurrency]} />
        </div>
        <div className="exchange-widget__output-box">
          <CurrencyInput 
            className="exchange-widget__input"
            value={this.state.output}
            name="output"
            onChange={this.onOutputChange}
            currency={this.state.outputCurrency}
            currencies={Object.keys(this.props.currencies).filter(currency => currency !== this.state.inputCurrency)}
            onCurrencyChange={this.onOutputCurrencyChange}
            char={outputChar}
            isOutput={true}
            rate={`${inputChar}1 = ${outputChar}${rate}`}
            amount={this.props.wallet[this.state.outputCurrency]} />
        </div>
        <button type="submit">Exchange</button>
      </form>
    );
  }
}

export default ExchangeWidget;
