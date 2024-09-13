import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-btn',
  standalone: true,
  imports: [],
  templateUrl: './calculator-btn.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-btn.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export class CalculatorBtnComponent {

  public isCommand = input(false);
  public isDoubleSize = input(false);

  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  @HostBinding('class.w-2/4') get isDoubleSizeClass() {
    return this.isDoubleSize();
  }

  public handleClick() {
    if( !this.contentValue()?.nativeElement ) { return; }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keyboardPressed(key: string) {
    if( !this.contentValue()?.nativeElement ) { return; }
    const value = this.contentValue()!.nativeElement.innerText;

    if( key !== value.trim() ) { return; }

    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }

}
