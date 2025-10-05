const loginpage=document.getElementById('login');
const username=document.getElementById('username');
const startButton=document.getElementById('start-button');

const quizPage=document.getElementById('quiz-page');
const userInfo=document.getElementById('user-info');
const questionText=document.querySelector('#question-container h2');
const option=document.getElementById('option-container');
const prevButton=document.getElementById('prev');
const nextButton=document.getElementById('next');
const submitButton=document.getElementById('submit');

const scorePage=document.getElementById('scorecard');
const scoreDisplay=document.getElementById('score');
const reattemptButton=document.getElementById('re-attempt');

let questions=[];
let currentquesIndex=0;
let totalScore=0;

startButton.addEventListener('click',startQuiz);
prevButton.addEventListener('click',()=>{
    if (currentquesIndex >0){
        currentquesIndex--;
        showQuestion();
    }
});
nextButton.addEventListener('click',()=>{
    
    if (currentquesIndex<questions.length-1)
    {
        currentquesIndex++;
        showQuestion();
    }
    else
    {
        showScore();
    }

});
submitButton.addEventListener('click',showScore);
reattemptButton.addEventListener('click',()=>{
    scorePage.style.display='none';
    loginpage.style.display='block';
    username.value='';
    currentquesIndex=0;
    totalScore=0;
    questions=[];
});


async function startQuiz() {
    option.innerHTML='';
    currentquesIndex=0;
    totalScore=0;
    const userName=username.value;
    if (userName.trim()===''){
        alert('Please enter your USERNAME!!!');
        return;
    }
    userInfo.textContent= `Welcome, ${userName}!`;
    loginpage.style.display='none';
    quizPage.style.display='block';
    
    try{
        const response=await fetch('questions.json');
        questions=await response.json();
        showQuestion();
    } 
    catch(error){
        console.error("Could not fetch the Questions:",error);
        questionText.textContent="FAILED TO LOAD QUESTIONS!!!";
    }
}

function showQuestion() {
    option.innerHTML='';
    const DispQues=questions[currentquesIndex];
    questionText.textContent=DispQues.question;
    DispQues.options.forEach(OPTION => {
        const li=document.createElement('li');
        li.textContent=OPTION;
        li.addEventListener('click',()=>selectAnswer(li,DispQues.answer));
        option.appendChild(li);
    });
    prevButton.disabled=(currentquesIndex===0);
    nextButton.disabled=(currentquesIndex===questions.length-1);
}

function selectAnswer(selectedLi,correctAns)
{
    const alloptions=option.querySelectorAll('li');
    alloptions.forEach(li=>li.style.pointerEvents='none');
    if (selectedLi.textContent===correctAns){
        selectedLi.classList.add('correct');
        totalScore+=4;
    }
    else{
        selectedLi.classList.add('incorrect');
        totalScore-=1;
    }
}

function showScore() {
    quizPage.style.display='none';
    scorePage.style.display='block';
    scoreDisplay.textContent=totalScore;
}

quizPage.style.display='none';
scorePage.style.display='none';