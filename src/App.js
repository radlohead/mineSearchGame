import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        //input radio status
        this.state = {
            selectOption: null
        };
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
    selectInputLine(){
        const targetValue = this.state.selectOption;
        if(targetValue == 81) this.inputLine = 9;
        if(targetValue == 256) this.inputLine = 16;
        if(targetValue == 480) this.inputLine = 30;
    }
    //form submit
    handleFormSubmit(formSubmitEvent){
        formSubmitEvent.preventDefault();
        this.init();
        this.selectInputLine();
        //create tag
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
                this.gameover();
            }
            else this.handleClick(td);
        });
        //right click event
        td.addEventListener('contextmenu', e => {
            e.preventDefault();
            this.handleRightClick(td);
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
        const dataItem = parseInt(td.getAttribute('data-item'));

        this.doc.querySelectorAll('.box').forEach((v, i) => {
            if(dataItem == i){
                this.doc.querySelectorAll('.box').forEach((v, i) => {
                    this.handleClickBoxTest(dataItem, td, v, i);
                });
            }
        })
    }
    //.box is match test
    handleClickBoxTest(dataItem, td, v, i){
        dataItem === i+1 && this.flagMineMatch(v) ? this.leftRightCompare(td, v) : null;
        dataItem === i-1 && this.flagMineMatch(v) ? this.leftRightCompare(td, v) : null;
        dataItem === this.inputLine + i && this.flagMineMatch(v) ? this.onClassAdd(v) : null;
        dataItem === i - this.inputLine && this.flagMineMatch(v) ? this.onClassAdd(v) : null;
    }
    //left right is compare
    leftRightCompare(td, v){
        return td.parentElement === v.parentElement ? this.onClassAdd(v) : null;
    }
    //on class add
    onClassAdd(v){
        return v.classList += ' on';
    }
    //flag search function
    flagMatch(v){
        return /flag/.test(v.className.match(/flag/g));
    }
    //flagMineMatch
    flagMineMatch(v){
        return !this.flagMatch(v) && v.innerHTML != '0';
    }
    //right click event
    handleRightClick(td){
        if(this.flagMatch(td)) return td.classList.remove('flag');
        td.classList += ' flag';
    }
    render() {
        return (
            <div>
                <h1>지뢰찾기 게임</h1>
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