import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { QuestionsService } from '@app/core/services/questions.service';
import { Question } from '@app/core/interfaces/question';

type QuizState = {
    questions: Question[];
    question: Question | null;
    index: number;
    correctAnswers: number;
    isLastQuestion: boolean;
    score: number;
    loading: boolean;
};

const initialState: QuizState = {
    questions: [],
    question: null,
    index: 0,
    correctAnswers: 0,
    isLastQuestion: false,
    score: 0,
    loading: false,
};

export const QuizStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        loading: computed(() => store.questions()),
        isLastQuestion: computed(() => store.index() === store.questions().length),
        score: computed(() => store.correctAnswers() / store.questions().length * 100)
    })),
    withMethods((store, questionService = inject(QuestionsService)) => ({
        async loadQuestions(): Promise<void> {
            const questions = await lastValueFrom(questionService.getQuestions());
            patchState(store, { questions: questions.results, question: questions.results[0] });
        },
        check(answer: string): void {
            patchState(store, { correctAnswers: store.question()?.correct_answer === answer ? store.correctAnswers() + 1 : store.correctAnswers() });
        },
        next(): void {
            patchState(store, { question: store.questions()[store.index() + 1], index: store.index() + 1 });
        },
        reset(): void {
            patchState(store, initialState);
            this.loadQuestions();
        }
    })),
    withHooks({
        onInit(store) {
            store.loadQuestions();
        },
    }),
);