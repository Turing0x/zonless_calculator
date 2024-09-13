import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperator = ['+/-', '%', '.', '=', 'C', 'Backspace', 'Escape', 'Enter'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public construcValue(value: string) {

    if( ![...numbers, ...operators, ...specialOperator].includes(value) ){ return; }

    if( value === '=' || value === 'Enter' ) {
      this.evalOperation();
      return;
    }

    if( value === 'C' ) {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if( value === 'Backspace' ) {
      
      if( this.resultText() === '0' ) { return; }

      if( this.resultText().includes('-') && this.resultText().length === 2 ) { 
        this.resultText.set('0'); 
        return;
       }
      if( this.resultText().length === 1 ) { 
        this.resultText.set('0'); 
        return;
      }

      this.resultText.update(v => v.slice(0, -1));
      return;

    }

    if(operators.includes(value)) {

      this.evalOperation();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if(this.resultText.length >= 10) { return; }

    if(value === '.' && !this.resultText().includes('.')) {

      if( this.resultText() === '0' || this.resultText() === '' ) {
        this.resultText.set('0.');
        return;
      }

      this.resultText.update(v => `${v}.`);
      return;

    }

    if( value === '0' && ( this.resultText() === '0' || this.resultText() === '-' ) ) { return; }

    if( value === '+/-' ){
      this.resultText().includes('-')
        ? this.resultText.update(v => `${v.slice(1)}`)
        : this.resultText.update(v => `-${v}`);
      return;
    }

    if(numbers.includes(value)) {

      if(this.resultText() === '0' || this.resultText() === '-0' ) {

        if(this.resultText().includes('-')){
          this.resultText.set(`-${value}`);
          return;
        }

        this.resultText.set(value);
        return;
      }

      this.resultText.update(v => `${v}${value}`);
    }

  }

  public evalOperation() {
    const [ n1, n2 ] = [this.subResultText(), this.resultText()].map(v => parseFloat(v)); 
    const result = eval(`${n1} ${this.lastOperator()} ${n2}`);
    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }

}
