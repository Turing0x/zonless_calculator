import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorBtnComponent } from '../calculator-btn/calculator-btn.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorBtnComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyUp($event)'
  }


})
export class CalculatorComponent {

  private calService = inject(CalculatorService);
  public allBtns = viewChildren(CalculatorBtnComponent);

  public handleClick(value: string) {
    this.calService.construcValue(value);
  }

  public resultText = computed( () => this.calService.resultText() );
  public subResultText = computed( () => this.calService.subResultText() );
  public lastOperator = computed( () => this.calService.lastOperator() );

  public handleKeyUp({key}: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Backspace: 'C',
      '/': '÷',
      '*': '⨉',
      Enter: '=',
    };
    
    this.handleClick(key);

    this.allBtns().forEach(btn => {
      btn.keyboardPressed( keyEquivalents[key] ?? key );
    });

  }

}
