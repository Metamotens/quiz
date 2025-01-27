import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizContainerComponent } from './quiz/features/quiz-container/quiz-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
