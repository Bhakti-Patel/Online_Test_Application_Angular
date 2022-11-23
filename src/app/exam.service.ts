import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answers } from './answers';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(public http:HttpClient) { }

  loadAllQuestions():Observable<Questions[]> {
    //alert("Inside loadAllQuestions");
    return this.http.get<Questions[]>("../assets/questions.json");
  }

  loadAllAnswers():Observable<Answers[]> {
    //alert("Inside loadAllAnswers");

    return this.http.get<Answers[]>("../assets/answers.json");
  }
}