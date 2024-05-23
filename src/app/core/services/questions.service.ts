import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { Observable, map } from 'rxjs';
import { QuestionResponse } from '../interfaces/question-response';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(environment.apiUrl).pipe(
      map(res => ({
        response_code: res.response_code,
        results: res.results.map(question => ({
          ...question,
          answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
        }))
      }))
    );
  }
}
