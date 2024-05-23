import { Component, inject, signal } from '@angular/core';
import { QuizStore } from '@app/quiz/store/quiz.store';
import { QuestionsComponent } from '@app/quiz/ui/questions/questions.component';
import { ResultsComponent } from '@app/quiz/ui/results/results.component';

@Component({
  selector: 'app-quiz-container',
  standalone: true,
  imports: [QuestionsComponent, ResultsComponent],
  templateUrl: './quiz-container.component.html',
  styleUrl: './quiz-container.component.scss'
})
export class QuizContainerComponent {
  store = inject(QuizStore);

  check(answer: string): void {
    this.store.check(answer);
  }

  next(): void {
    this.store.next();
  }

  reset(): void {
    this.store.reset();
  }
}
