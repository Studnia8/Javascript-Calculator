import React from 'react';
import './JSCalc.scss';

let limitMessage="Digit limit reached! Press AC button";

// display and logic
class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentValue:0,
            currentSign:'',
            formula:"",
            lastClicked:"",
            display:"0"
        }
        // binds
        this.addSign = this.addSign.bind(this);
        this.addNumber = this.addNumber.bind(this);
        this.initialize = this.initialize.bind(this);
        this.showResult = this.showResult.bind(this);
        this.decimal = this.decimal.bind(this);
    }
    // methods
    initialize(){
        this.setState({
            currentValue:0,
            currentSign:'',
            formula:"",
            lastClicked:"",
            display:"0",
        })
    }
    addSign(e){
        if((this.state.formula.length+this.state.display.length)<20){
            if(/[0-9]/.test(this.state.lastClicked)&&!(/[0-9][+-/x]$/).test(this.state.formula)){
                this.setState({
                    currentValue:"",
                    currentSign: e.target.value,
                    formula: this.state.formula + this.state.display,
                    lastClicked:e.target.value,
                    display:e.target.value
                });
            }
            else if(!(/[0-9][+-/x]$/).test(this.state.formula)){
                this.setState({
                    currentSign: e.target.value,
                    lastClicked:e.target.value,
                    display:e.target.value
                })
            }
        }
        else{
            this.setState({
                formula: limitMessage,
                display:""
            })
        }
    }
    addNumber(e){
        if((this.state.formula.length+this.state.display.length)<20){
            if(/[+-x/]/.test(this.state.lastClicked)&&!(/[0-9][+-/x]$/).test(this.state.formula)){
                this.setState({
                    currentValue: e.target.value,
                    formula: this.state.formula,
                    lastClicked:e.target.value,
                    display:this.state.display+e.target.value
                });
                if(this.state.display.length>14){
                    this.setState({
                        formula: limitMessage,
                        display:""
                    })
                }
            }
            else if(!(/[0-9][+-/x]$/).test(this.state.formula)){
                this.setState({
                    currentValue: e.target.value,
                    lastClicked:e.target.value,
                    display: e.target.value
                })
            }
        }
        else{
            this.setState({
                formula: limitMessage,
                display:""
            })
        }
    }
    decimal(e){
        if(this.state.formula.length<20){
            if(/[0-9]/.test(this.state.lastClicked)&&(/[+-x/]/).test(this.state.lastClicked)){
                this.setState({
                    currentValue: this.state.currentValue + e.target.value,
                    lastClicked:e.target.value,
                    display:this.state.display + e.target.value
                })
            }
        }
        else{
            this.setState({
                formula: limitMessage,
                display:""
            })
        }
    }
    showResult(){
        if(this.state.formula!==limitMessage){
            this.setState({
                formula: this.state.formula + this.state.display
            })
            let result = 0;
            setTimeout(()=>{
                if((/[0-9]$/).test(this.state.formula)){
                    result = this.state.formula;
                    if((/^[x/]/).test(result)){
                        result = result.slice(1,this.state.formula.length);
                    }
                    result = eval(result.replace(/x/g,"*"));
                    result = Math.round(result*10000);
                    result = result/10000;
                }
                else{
                    result = this.state.formula;
                    if((/^[x/]/).test(result)){
                        result = result.slice(1,this.state.formula.length-1);
                    }
                    result = eval(result.replace(/x/g,"*"));
                    result = Math.round(result*10000);
                    result = result/10000;
                }
            },10)
            
            setTimeout(()=>{
                this.setState({
                    currentValue:0,
                    currentSign:'',
                    formula:"",
                    lastClicked:"",
                    display:result.toString(),
            })
            },15)
        }
    }
    render(){
        return(
            <div>
                <div id="calculator">
                    <Formula formula={this.state.formula}/>
                    <Display display={this.state.display}/>
                    <Buttons
                    decimal={this.decimal}
                    addNumber={this.addNumber}
                    addSign={this.addSign}
                    showResult={this.showResult}
                    initialize={this.initialize}
                    />
                </div>
            <div className="madeby">Made by <a className="madeLink" title="Go to Github!" target="_blank" rel="noopener noreferrer" href="https://github.com/Studnia8">Studnia8</a></div>
            </div>
        )
    }
}

// buttons
class Buttons extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="buttonBox" id="buttonBox">
                <button
                className="clear"
                id="cleardisplay"
                onClick={this.props.initialize}
                value="AC"
                >AC</button>
                <button
                className="sign"
                id="divide"
                onClick={this.props.addSign}
                value="/"
                >/</button>
                <button
                className="sign"
                id="multiply"
                onClick={this.props.addSign}
                value="x"
                >x</button>
                <button
                className="number"
                id="7"
                onClick={this.props.addNumber}
                value="7"
                >7</button>
                <button
                className="number"
                id="8"
                onClick={this.props.addNumber}
                value="8"
                >8</button>
                <button
                className="number"
                id="9"
                onClick={this.props.addNumber}
                value="9"
                >9</button>
                <button
                className="sign"
                id="sum"
                onClick={this.props.addSign}
                value="+"
                >+</button>
                <button
                className="number"
                id="4"
                onClick={this.props.addNumber}
                value="4"
                >4</button>
                <button
                className="number"
                id="5"
                onClick={this.props.addNumber}
                value="5"
                >5</button>
                <button
                className="number"
                id="6"
                onClick={this.props.addNumber}
                value="6"
                >6</button>
                <button
                className="sign"
                id="substract"
                onClick={this.props.addSign}
                value="-"
                >-</button>
                <button
                className="number"
                id="1"
                onClick={this.props.addNumber}
                value="1"
                >1</button>
                <button
                className="number"
                id="2"
                onClick={this.props.addNumber}
                value="2"
                >2</button>
                <button
                className="number"
                id="3"
                onClick={this.props.addNumber}
                value="3"
                >3</button>
                <button
                className="result"
                id="result"
                onClick={this.props.showResult}
                >=</button>
                <button
                className="number"
                id="0"
                onClick={this.props.addNumber}
                value="0"
                >0</button>
                <button
                className="decimal"
                id="dot"
                onClick={this.props.decimal}
                value="."
                >.</button>
            </div>
        )
    }
}

class Formula extends React.Component{
    render(){
        return(
            <div className='formula'>{this.props.formula}</div>
        )
    }
}

class Display extends React.Component{
    render(){
        return(
            <div className='display'>{this.props.display}</div>
        )
    }
}

export default Calculator;