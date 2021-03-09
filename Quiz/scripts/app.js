const questionNumber = document.querySelector('.question-number')
const questionText = document.querySelector('.question-text')
const optionContainer = document.querySelector('.option-container')
const answerIndicatorContainer = document.querySelector('.ansewrs-indicator')
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")

let questionCounter = 0;
let currentQuestion ;
let availableQuestion = [];
let availableOptions = [];
let correctAnswers = []
let attempt = 0;



//push the question into available question array
function setAvalaibleQuestions(){
const totalQuestion = quiz.length;
for(let i=0;i<totalQuestion;i++){
    availableQuestion.push(quiz[i]);
}

}

//set question number anda question and option
function getNewquestion(){

    questionNumber.innerHTML=" Question " + (questionCounter+1) + ' of ' + quiz.length
 
    //set question text
    //get random question 

    const questionIndex = availableQuestion[Math.floor(Math.random()* availableQuestion.length)]
    currentQuestion = questionIndex
    questionText.innerHTML= currentQuestion.q


    //get the position of questionIndex from the availableQuestion 
    const index1 = availableQuestion.indexOf(questionIndex)

    //remove the 'questionindex from the available Array,so that que question does not repeat
    availableQuestion.splice(index1,1)
 
    //set opotions 
    //sset the length of options

    const optionLen = currentQuestion.options.length

    for(let i=0;i<optionLen;i++){
        availableOptions.push(i)
    }

    optionContainer.innerHTML=''
    let animationDelay =0.15

    //create options in html

    for(let i = 0; i<optionLen; i++){
        //random options

        const optionIndex= availableOptions[Math.floor(Math.random()* availableOptions.length)]
        // get theposition of prototype from tje available question
        const index2 = availableOptions.indexOf(optionIndex)
        //remove the 'option index from the abaiçable 
        availableOptions.splice(index2,1)
       
        const option = document.createElement('div')
        option.innerHTML= currentQuestion.options[optionIndex]
        option.id= optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay =animationDelay + 0.15
        option.className="option"
        optionContainer.appendChild(option)
        option.setAttribute('onclick',"getResult(this)")

    }
    
    questionCounter++
}
//set on result of current attempt question
function getResult(element){
   const id= parseInt(element.id);
   console.log(typeof id)
   // get the answer by somparring the id of clicked option
   if(id==currentQuestion.answer){
       //set the green color to the correct option
     element.style.backgroundColor='green'
      element.classList.add("correct")
     
      
      /*const indicartors = answerIndicatorContainer.children.length
      console.log(indicartors)
    
      for(let i=0;i<indicartors;i++){
        if(parseInt(optionContainer.children[i]) === currentQuestion.answer){

            answerIndicatorContainer.children[i].style.backgroundColor="green"    
        }
         // answerIndicatorContainer.children[i].style.backgroundColor="green"    
         }*/
         correctAnswers++
       
   }else{
       //set the red color to the wrong
       element.style.backgroundColor='red'
       element.classList.add("incorrect")
       
       /*const indicartorsOne = answerIndicatorContainer.children.length

       for(let i=0;i<indicartorsOne;i++){
        if(parseInt(optionContainer.children[i]) === currentQuestion.answer){

            answerIndicatorContainer.children[i].style.backgroundColor="red"    
        }else{
            answerIndicatorContainer.children[i].style.backgroundColor="red"
        }
          }*/
      

       //if the answer is incorrect the showthe correct option by adding gren color the correct option
       
       const optionLen = optionContainer.children.length
       for(let i= 0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].style.backgroundColor="green"
            }
        }
        attempt++
      
   }
   unclickableOptions();

}
//make all the option unclicklabe once the user select option (retrsic the user to change)
function unclickableOptions(){
    const optionsLen= optionContainer.children.length
    for(let i=0;i<optionsLen;i++){
        optionContainer.children[i].classList.add('already-answered');
    }
}



/*function answerIndicator(){
    //answerIndicatorContainer.innerHTML=
    const totalQuestion = quiz.length

    for(let i = 0; i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator)



    }

}*/
function next(){
    if(questionCounter == quiz.length){
        console.log('Quiz over')
        quizOver()
        
    }else{
        getNewquestion()
    }
}
function quizOver(){
//quiz box hide

quizBox.classList.add("hide")

resultBox.classList.remove("hide")
quizResult()
}
function quizResult(){
    resultBox.querySelector('.total-question').innerHTML=quiz.length
    resultBox.querySelector(".total-attempt").innerHTML=attempt;
    resultBox.querySelector(".total-correct").innerHTML=correctAnswers
    resultBox.querySelector(".total-wrong").innerHTML=correctAnswers - attempt;
    const porcentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".total-procentage").innerHTML=porcentage.toFixed()+ "%"
    resultBox.querySelector(".total-score").innerHTML=correctAnswers + "/" + quiz.length
}
function resetQuiz(){
     questionCounter = 0;
     correctAnswers = []
     attempt = 0;
}
function toGoHome(){
    //hide result box

    resultBox.classList.add('hide')

    //show home box 
    homeBox.classList.remove('hide')
    resetQuiz()

}
function tryAgainQuiz(){
    resultBox.classList.add("hide")
    quizBox.classList.remove('hide')

    resetQuiz()
    startQuiz()
}
 function startQuiz(){

    //hide home box

    homeBox.classList.add('hide')
    quizBox.classList.remove('hide')
    //first we will set all question in availableQuestion array
setAvalaibleQuestions()

//second we will call getNewQuestion() function
getNewquestion()

// to create indicator of questions
//answerIndicator();
}
window.onload=function (){
    homeBox.querySelector('.total-question').innerHTML='5'
}
