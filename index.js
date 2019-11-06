
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
        renderQuestion();
    });

    $('form').submit(function(event){
        event.preventDefault(); // prevents page from refreshing
        STORE.currentView = "review";
        $('button').hide();
        generateResponse();
    });
}

function generateResponse() {
    // get the selected answer
    let selectedRadio = $(“input:checked”);
    let selected = selectedRadio.val(); // grabs the selected/submitted answer
    

    // check if answer is correct
    let index = STORE.currentQuestion-1;
    let correct = selected == quizQuestions[index].correctAnswer;
    // write response to page
    let content = '';
    if(correct) {
        content += 'Yay! You go girl!';
    } else {
        content += "Let's review! What we were looking for is highlighted";
        selectedRadio.addClass(“rightAnswer”);// lets the person know the correct answer
    };
    


    $('.js-response').html()
    // create next button

    
}


function renderQuestion() {
    let generateHTML = getHTML();
    $('form').html(generateHTML); // selecting form and replacing the HTML with the passed in value.

}

function getHTML () {
    let content = `<div>Question ${STORE.currentQuestion} of 5</div>`;

    // add question element
    let index = STORE.currentQuestion-1; // this var stores the current question index
    content += `<h2>${quizQuestions[index].question}</h2>`;// adds the question in h2 to content
    // add radio buttons
    for(let ind in quizQuestions[index].answers) {
        let answer = quizQuestions[index].answers[ind]; // returning the string of each answer
        content += `<input type="radio" name="answer" value="${answer}"> ${answer} <br>`; // this loops throw the answers and creats a radio button
    }
    // add submit button
    content += "<button type='submit'>Submit</button>";
    return content;
}

$(function(){
    listeners();
});