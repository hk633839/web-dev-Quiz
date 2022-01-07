document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const main_content = document.getElementById('main_content')
    main_content.style.display = 'none';
    const result = await fetch("https://api.trivia.willfry.co.uk/questions?categories=movies&limit=10");
    const data = await result.json();
    loader.style.display = 'none';
    main_content.style.display = 'block';
    let score = 0;
    let question_number = 0;
    const next_button_container = document.getElementById('next-button');
    const btn = document.getElementById('btn');
    const qtn = document.getElementById('question');
    const selected = document.getElementsByTagName('input');
    const answers_container = document.getElementById('answers');    
    //for first question
    getNextQuestion();

    //for the final result 
    function finalResult(){
        qtn.innerHTML = "<p>Your score is " + score + "</p>";
        next_button_container.style.display = 'none';
        answers_container.innerHTML = 'Please refresh this page to start fresh.';
        
    }

    //function for the button click event listener
    function buttonClick(){
        getAnswerValue();
        clearRadioButtons();
        ++question_number;
        if(question_number == 10){
            finalResult();
            return;
        }
        getNextQuestion(); 
    }

    //adding an eventListener for button clicks
    btn.addEventListener('click', buttonClick);

    //function to clear the radio buttons
    function clearRadioButtons(){
        for(k=0; k<selected.length; k++){
            selected[k].checked = false;
        }
    }

    //function to get the value of the checked radio button
    function getAnswerValue(){
        
        for(j=0; j<selected.length; j++){
            if(selected[j].checked){
                if(data[question_number].correctAnswer == selected[j].value){
                    score++;
                }
            }
        }
    }

    //function to change the question
    function getNextQuestion(){
        qtn.innerHTML = data[question_number].question;
        let answer_array = [];
        answer_array.push(data[question_number].correctAnswer);
        answer_array.push(data[question_number].incorrectAnswers[0]);
        answer_array.push(data[question_number].incorrectAnswers[1]);
        answer_array.push(data[question_number].incorrectAnswers[2]);
        answer_array.sort( () => Math.random() - 0.5);
        document.getElementById('ans1').innerHTML = answer_array[0];
        document.getElementById('ans2').innerHTML = answer_array[1];
        document.getElementById('ans3').innerHTML = answer_array[2];
        document.getElementById('ans4').innerHTML = answer_array[3];
        document.getElementById('answer1').value = answer_array[0];
        document.getElementById('answer2').value = answer_array[1];
        document.getElementById('answer3').value = answer_array[2];
        document.getElementById('answer4').value = answer_array[3];
    }
    

});