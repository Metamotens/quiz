import { Question } from "./question";

export interface QuestionResponse {
    response_code: number;
    results: Question[];
}