import { Component, OnInit } from '@angular/core';
import { Answers } from '../answers';
import { ExamService } from '../exam.service';
import { Questions } from '../questions';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  questions:Array<Questions>=[];
  answers:Array<Answers>=[];
  myAns:Array<any> = [];
  showQuestionsAnswers:boolean = true;
  showRetakeReviewButtons:boolean = false;
  showReviewResults:boolean = false;
  
  msg:string ="";
 
  constructor(public ex:ExamService) { }  // DI for Exam Service 
 
  ngOnInit(): void {
    
    this.ex.loadAllQuestions().subscribe({
      next:(data:any)=>this.questions=data.questions,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("questions loaded...")
    });

    this.ex.loadAllAnswers().subscribe({
      
      next:(data:any)=>this.answers=data.answers,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("answers loaded...:")
    });

  }
  ansSelected(qid:any,ans:any){
    
    console.log(qid+" "+ans);
   
    this.myAns.push({
      "qid": qid,
      "ans": ans
    });
    console.log(this.myAns);
  }

  submitExam() {
    
    let count =0;
    console.log("count::::::::"+count);
    this.answers.forEach((ansItem:any,index:any)=> {
          this.myAns.forEach((v:any,k:any)=> {           
                  // if(k==value.qid && v==value.ans){
                  //   console.log("If condition true value.qid:::"+value.qid+"Value.ans::::"+value.ans)
                  //     count++;
                  // }
                  if(v.ans==ansItem.ans && v.qid == ansItem.qid){
                    console.log("If condition true value.qid:::"+ansItem.qid+"Value.ans::::"+ansItem.ans)
                      count++;
                  }
                  
          }); 
          console.log(" mAns ", this.myAns);
    })
    //console.log(count);
    this.msg="Your total score is "+count+" marks";
    this.showQuestionsAnswers = false;
    this.showRetakeReviewButtons = true;
    
  }
  retakeExam() {
    
    this.showQuestionsAnswers=true;
    this.showReviewResults=false;

    this.showRetakeReviewButtons=false;
  }
  reviewExam() {
    this.showQuestionsAnswers=false;
    this.showRetakeReviewButtons =false;
    this.showReviewResults=true;
    
    
  }
  
}