
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
        $('.js-questions').show(); // shows questions
        $('.startQuiz').hide(); // hides start quiz page
        $('.js-response').hide(); // hides reponse page
        $('.js-final').hide(); // hides final page
        renderQuestion();
    });

    $('form').submit(function(event){
        event.preventDefault(); // prevents page from refreshing
        STORE.currentView = "review"; // changes current view to review
        $('.js-response').show(); // shows reponse page
        $('.js-questions').hide(); // hides questions page
        $('.js-final').hide(); // hides final page
        generateResponse();
    });
    
    $('.js-response').on('click', '.nextButton', function (event) {
        STORE.currentView = "quiz"; // changes view back to quiz after review page
        $('.js-response').hide(); // hides response page
        $('.js-questions').show(); // shows questions page 
        $('.js-final').hide(); // hides final page
        questionUpdate();
        renderQuestion();
    });
}

function renderQuestion() {
    let generateHTML = getHTML(); 
    $('.questionBox').html(generateHTML); // selecting form and replacing the HTML with the passed in value.
    quizTrack();
}

function quizTrack() {
  $('header').html(`<h1>Natural Hair Quiz</h1>
  <h4>Testing your natural hair knowledge on maintenance and care.</h4>
  <ul class='scores'>
  <li>Question ${STORE.currentQuestion} of 5</li>
  <li>Score: ${STORE.score}</li>
  </ul>`);
}

function getHTML () {
    let content = '';
    let index = STORE.currentQuestion-1; // this var stores the current question index
    content += `<h2 class ="question">${quizQuestions[index].question}</h2>`;// adds the question in h2 to content
    // add radio buttons
    for(let ind in quizQuestions[index].answers) {
        let answer = quizQuestions[index].answers[ind]; // returning the string of each answer
        content += `<input type="radio" name="answer" value="${answer}" required> ${answer} <br>`; // this loops throw the answers and creats a radio button
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
      <img src="images/correct-answer.gif"/ class= "form-pic correctPic">
      <button type="button" class="nextButton js-nextButton">Next</button>`
    );
    STORE.score++;
}


function wrongAnswer() {
    let index = STORE.currentQuestion-1;
    $('.js-response').html(
      `<img src="images/wrong-answer.gif"/ class= "form-pic">
      <h3>Not quite! Let's review! What we were looking for was ...</h3>
      <h2>${quizQuestions[index].correctAnswer}</h2>
        <button type="button" class="nextButton js-nextButton">Next</button>`
    );
}
  
function questionUpdate() {
  let index = STORE.currentQuestion;
  let quizLength = `${quizQuestions.length}`;
  console.log(index);
  console.log(quizLength);
  if(index < quizLength) {
  STORE.currentQuestion++;
  } else {
      $('.startQuiz').hide();
      $('.js-questions').hide();
      $('.scores').remove();
      $('.js-response').hide();
      $('.js-final').show();
      finalScore();
  }
}


function finalScore() {
    $('.startQuiz').hide();
    $('.js-questions').hide();
    $('.js-final').show();
    $('.js-final').html(
        `<h3>Your score is ${STORE.score}/${STORE.currentQuestion}</h3>
        <h3>How did you do? Are you a natural hair expert?</h3>
        <img src= "images/end-of-quiz.gif"/ alt="woman fluffing hair" class= "quiz-end form-pic">
        <h3>Test your skills again!</h3>
        <button type="submit" class="restartButton button">Restart</button>`
    );
    $('.js-final').on('click', '.restartButton', function (event) {
      // event.preventDefault();
      // $('.js-final').hide();
      // $('.js-questions').show();
      // renderQuestion();
      // STORE.currentQuestion = 1;
      window.location.reload();
    });
    STORE.score = 0;
    STORE.currentQuestion = 0;
}


function renderQuiz(){
    listeners();
}

$(renderQuiz);

