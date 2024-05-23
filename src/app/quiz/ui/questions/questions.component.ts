import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { Question } from '@app/core/interfaces/question';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [NgClass],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  question = input.required<Question | null>();
  isLastQuestion = input.required<boolean>();
  
  check = output<string>();
  next = output<void>();
  finish = output<void>();

  selectedIndex = signal<number | null>(null);

  handleCheck(answer: string, index: number): void {
    if (this.selectedIndex() !== null) return;
    this.selectedIndex.set(index);
    this.check.emit(answer);
  }

  handleNext(): void {
    this.selectedIndex.set(null);
    this.next.emit();
  }
}
