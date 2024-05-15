import './calculater.css';
import React from 'react';
import { AiFillSun, AiFillMoon } from "react-icons/ai";
import { FaBackspace } from "react-icons/fa";
class Calculater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      expression: '',
      colorMode: 'light',
    };
  }
  inputNum = (num) => {
    const {expression } = this.state;
    if(expression==='0'){
        this.setState({
            displayValue: num,
            expression: num,
          });
    }else{
        this.setState({
            displayValue: expression + num,
            expression: expression + num,
        });
    }
  };

  inputDecimal = () => {
   console.log("working")
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      expression: '',
    });
  };

  clearLastDigit = () => {
    const { expression } = this.state;
    if (expression.length > 1) {
      const removeLastDigit = expression.slice(0, -1);
      this.setState({
        displayValue: removeLastDigit,
        expression: removeLastDigit,
      });
    } else {
        this.setState({
            displayValue: '0',
            expression: '',
          });
    }
  };

  performOperation = (operator) => {
    const { expression } = this.state;
    const lastChar = expression.slice(-1);
    if (lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/') {
      const numAndOperater = expression + operator;
      this.setState({
        displayValue: numAndOperater,
        expression: numAndOperater,
      });
    }
  };

calculate = () => {
  const { expression } = this.state;
  let result;
  const key = expression.match(/[+\-*/%]|(?:\d+(?:\.\d*)?|\.\d+)/g);   //match function return a array ["10" "+" "20" "-" "10"] like this
    // const key = expression.match(/^(?:\s*\d+(?:\s*[+*/-]\s*\d+)*\s*)$/g) || [];  //not working properley 
    //match function return a array ["10" "+" "20" "-" "10"] like this
    //match function return a array ["10" "+" "20" "-" "10"] like this
  if(key) {
    result = parseFloat(key.shift());  //remove the first key from the array (key) 10
    console.log(result,'result')
    while (key.length) {
      const operator = key.shift();    //remove the first item from array (key)   //it mean +
      const operand = parseFloat(key.shift());  //remove the first item from array (key) // it mean 20
      switch (operator) {
        case '+':
          result = result + operand;
          break;
        case '-':
            result = result - operand;
          break;
        case '*':
            result = result * operand;
          break;
        case '/':
            result = result / operand;
          break;
        case '%':
            result  = ((result/100)*operand);
          break;
        default:
          console.log('invalid operator');
      }
    }
    this.setState({
      displayValue: String(result),
      expression: String(result),
    });
  } 
};

  toggleMode = () => {
    this.setState(prevState => ({
      colorMode: prevState.colorMode === 'light' ? 'dark' : 'light'
    }));
  };

  render(){
    return(
      <div className='calc-container'>
      <div className={this.state.colorMode==='light'?'calc-wrapper':'calc-wrapper-light'}>
        <div className={this.state.colorMode==='light'?'bg-container':'bg-container-light'}>

        <div className='heading-container'>
        <h1 className='heading'>Calculater</h1>

        <div className='toggle-mode'>
            <button className='toggle-mode-btn' onClick={() =>this.toggleMode()}>{this.state.colorMode === "light" ? <div><AiFillSun /></div> : <div><AiFillMoon /> </div>}</button>
        </div>

        </div>
        <div className="value-container">
        <p>{this.state.arr}</p>
        <p className="calculator-display">{this.state.displayValue}</p>
        </div>
        </div>
        <div className='border'>

        <div className='border-width'></div>
        </div>
        <div className="calculator-keypad">
        <button onClick={() => this.clearDisplay()}>AC</button>
          <button onClick={() => this.performOperation('%')}>%</button>
        <button onClick={() => this.clearLastDigit()} ><FaBackspace className='fabackspace'/></button>
          <button onClick={() => this.performOperation('/')}>/</button>
          <button onClick={() => this.inputNum(7)}>7</button>
          <button onClick={() => this.inputNum(8)}>8</button>
          <button onClick={() => this.inputNum(9)}>9</button>
          <button onClick={() => this.performOperation('*')}>X</button>
          <button onClick={() => this.inputNum(4)}>4</button>
          <button onClick={() => this.inputNum(5)}>5</button>
          <button onClick={() => this.inputNum(6)}>6</button>
          <button onClick={() => this.performOperation('-')}>-</button>
          <button onClick={() => this.inputNum(1)}>1</button>
          <button onClick={() => this.inputNum(2)}>2</button>
          <button onClick={() => this.inputNum(3)}>3</button>
          <button onClick={() => this.performOperation('+')}>+</button>
          <button onClick={() => this.inputNum('00')}>00</button>
          <button onClick={() => this.inputNum(0)}>0</button>
          <button onClick={() => this.inputDecimal(".")}>.</button>         
          <button onClick={() => this.calculate('=')}>=</button>
        </div>
      </div>
      </div>
    )
  }
}
export default Calculater






