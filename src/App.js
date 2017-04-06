import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        //input radio status
        this.state = {
            selectOption: null
        }
        //total row
        this.inputLine = null;
        this.doc = document;
        //td data-item count
        this.count = 0;
    }
    //first value
    componentWillMount(){
        this.setState({
            selectOption: 81
        });
    }
    //input radio checked value status
    handleOptionChange(changeEvent){
        this.setState({
            selectOption: changeEvent.target.value
        });
    }
    //initial setting
    init(){
        this.count = 0;
        this.doc.querySelectorAll('.box').forEach(v => {
            v.removeAttribute('data-item');
            v.classList = '';
        })
    }
    //form submit
    handleFormSubmit(formSubmitEvent){
        formSubmitEvent.preventDefault();
        this.init();
        const targetValue = this.state.selectOption;

        const inputLine = () => {
            if(targetValue == 81) this.inputLine = 9;
            if(targetValue == 256) this.inputLine = 16;
            if(targetValue == 480) this.inputLine = 30;
        };
        inputLine();

        this.createTable();
    }
    //form submit is createTable
    createTable(){
        let table = this.doc.querySelector('#table');
        table.innerHTML = '';

        for (let i = 0; i < this.inputLine; i++) {
            let tr = this.doc.createElement('TR');
            tr.classList = 'line';
            tr.setAttribute('data-item', i);

            for (let j = 0; j < this.inputLine; j++) {
                let td = this.doc.createElement('TD');
                td.classList = 'box';
                td.setAttribute('data-item', this.count++);
                td.innerHTML = Math.floor(Math.random() * 11) !== 0 ? 1 : 0;
                tr.appendChild(td);
                table.appendChild(tr);

                this.handleBoxClick(td);
            }
        }
    }
    //td each click
    handleBoxClick(td){
        td.addEventListener('click', () => {
            td.classList += ' on';

            if(td.innerHTML === '0'){
                td.classList += ' mine';
                //td .mine click
                this.gameover();
            }
            else{
                //td each click
                this.handleClick(td);
            }
        });
    }
    //end function
    gameover(){
        this.doc.querySelectorAll('.box').forEach(v => {
            v.innerHTML === '0' ? v.classList += ' mine' : v.classList += ' on';
        });
    }
    //progress function
    handleClick(td){
        let dataItem = parseInt(td.getAttribute('data-item'));

        this.doc.querySelectorAll('.box').forEach((v, i) => {
            if(dataItem == i){
                this.doc.querySelectorAll('.box').forEach((v, i) => {
                    if(dataItem === i+1) td.parentElement === v.parentElement ? v.classList += ' on' : null;
                    if(dataItem === i-1) td.parentElement === v.parentElement ? v.classList += ' on' : null;
                    if(dataItem === this.inputLine + i || dataItem === i - this.inputLine) v.classList += ' on';
                    if(dataItem === i+1 || dataItem === i-1 || dataItem === this.inputLine + i || dataItem === i - this.inputLine){
                        v.innerHTML == '0' ? this.gameover() : null;
                    }
                })
            }
        })
    }
    render() {
        return (
            <div>
                <h1>초간단 지뢰찾기</h1>
                <form onSubmit={formSubmitEvent => this.handleFormSubmit(formSubmitEvent)}>
                    <label>
                        <input type="radio" name="mineRadio" value="81"
                               checked={this.state.selectOption == '81'}
                               onChange={changeEvent => this.handleOptionChange(changeEvent)}
                        />
                        easy
                    </label>
                    <label>
                        <input type="radio" name="mineRadio" value="256"
                               checked={this.state.selectOption == '256'}
                               onChange={changeEvent => this.handleOptionChange(changeEvent)}
                        />
                        middle
                    </label>
                    <label>
                        <input type="radio" name="mineRadio" value="480"
                               checked={this.state.selectOption == '480'}
                               onChange={changeEvent => this.handleOptionChange(changeEvent)}
                        />
                        hard
                    </label>
                    <button type="submit">click</button>
                </form>
                <table id="table"></table>
            </div>
        )
    }
}

export default App;