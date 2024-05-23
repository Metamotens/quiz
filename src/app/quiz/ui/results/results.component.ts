import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  score = input.required<number>();
  reset = output<void>();

  handleReset(): void {
    this.reset.emit();
  }
}
