
  const quizQuestions = [
    {
    question: "How often should you moisturize natural hair?",
    answers: [
      'Weekly',
      'Daily',
      'Once a month',
      'Every 2 weeks'
    ],
    correctAnswer:
      'Daily'
  },
  {
    question:
      'How often should you trim your natural hair?',
    answers: [
      'Once a year',
      'Every month',
      'After styling',
      'Before styling'
    ],
    correctAnswer:
      'Every month'
  },
  {
    question:'Hair is made up of what element?',
    answers: [
      'Protein',
      'Keratin',
      'Folicite',
      'Biotin'
    ],
    correctAnswer: 'Keratin'
  },
  {
    question: 'What material is used to protect your hair?',
    answers: [
      'Cotton',
      'Silk',
      'Satin',
      'Polyester'
    ],
    correctAnswer: 'Satin'
  },
  {
    question:
      'How long does the average human hair grow in a year?',
    answers: [
      '12 inches',
      '3 inches',
      '18 inches',
      '6 inches'
    ],
    correctAnswer:
      '6 inches'
  },
    ];

const STORE = {
    currentView: "home",
    score: 0,
    currentQuestion: 0,
}

function listeners() {
    $('#start').click(function(){
        //this function starts the quiz once 'start quiz' is clicked
        STORE.currentView = "quiz";
        STORE.currentQuestion = 1;
        $('.startQuiz').hide();
        $('.js-final').hide();
        renderQuestion();
    });

    $('form').submit(function(event){
        event.preventDefault(); // prevents page from refreshing
        // get the selected answer
        STORE.currentView = "review";
        $('.js-questions').hide();
        $('#subButton').hide();
        $('.js-response').show();
        generateResponse();
        
    });
    
    $('.js-response').on('click', '.nextButton', function (event) {
        STORE.currentQuestion === quizQuestions.length?
        finalScore() :
        STORE.currentView = "quiz";
        $('.nextButton').hide();
        $('.js-response').hide();
        $('.js-questions').show();
        $('#subButton').show();
        questionUpdate();
        renderQuestion();
    });
}

function renderQuestion() {
    let generateHTML = getHTML();
    $('form').html(generateHTML); // selecting form and replacing the HTML with the passed in value.
}

function getHTML () {
    let content = `<div>Question ${STORE.currentQuestion} of 5</div>
    <div>Score: ${STORE.score}</div>`;
    // add question element
    let index = STORE.currentQuestion-1; // this var stores the current question index
    content += `<h2>${quizQuestions[index].question}</h2>`;// adds the question in h2 to content
    // add radio buttons
    for(let ind in quizQuestions[index].answers) {
        let answer = quizQuestions[index].answers[ind]; // returning the string of each answer
        content += `<input type="radio" name="answer" value="${answer}"> ${answer} <br>`; // this loops throw the answers and creats a radio button
    }
    // add submit button
    content += "<button type='submit' id='subButton'>Submit</button>";
    return content;
}

function generateResponse() {
    let selectedRadio = $('input:checked');
    let selected = selectedRadio.val(); // grabs the selected/submitted answer
    let index = STORE.currentQuestion-1;
    let correct = selected == quizQuestions[index].correctAnswer;
    // write response to page
    if(correct) {
        correctAnswer();
    } else {
       wrongAnswer();
    };
}

function correctAnswer() {
    $('.js-response').html(
      `<h1>Yay! You go naturalista!</h1>
        <button type="button" class="nextButton js-nextButton">Next</button>`
    );
    STORE.score++;
}


function wrongAnswer() {
    let index = STORE.currentQuestion-1;
    $('.js-response').html(
      `<h3>Not quite! Let's review! What we were looking for was ...</h3>
      <h2>${quizQuestions[index].correctAnswer}</h2>
        <button type="button" class="nextButton js-nextButton">Next</button>`
    );
}
  
function questionUpdate() {
    let index = STORE.currentQuestion-1;
    let currentQuestion = `${quizQuestions.length}`;
    if(STORE.currentQuestion <= currentQuestion) {
    STORE.currentQuestion++;
    console.log("this works");
    } else {
        $('.startQuiz').hide();
        $('.js-questions').hide();
        $('.js-repsonse').hide();
        $('.js-final').show();
        finalScore();
    }
}


function finalScore() {
    $('form').hide();
    $('.js-final').show();
    $('.js-final').on('click', '.restartButton', function (event) {
        event.preventDefault();
        $('.js-final').hide();
        $('form').show();
        STORE.currentQuestion = 1
    });
    $('.js-final').html(
        `<h2>Your score is ${STORE.score}/${STORE.currentQuestion}</h2>
        <h1>How did you do? Are you a natural hair expert?</h1>
        <h3>Test your skills again!</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
    STORE.score = 0;
    STORE.currentQuestion = 0;
}


$(function renderQuiz(){
    listeners();
    questionUpdate();
});