//Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ10Choices();

//functions
function displayQ4Choices(){
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);
  for (let i=0; i<q4ChoicesArray.length; i++){
    document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id="${q4ChoicesArray[i]}"
    value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
  }
}//displayQ4Choices

//functions
function displayQ10Choices(){
  let q10ChoicesArray = ["Cuba", "Guam", "Puerto Rico", "Virgin Islands"];
  q10ChoicesArray = _.shuffle(q10ChoicesArray);
  for (let i=0; i<q10ChoicesArray.length; i++){
    document.querySelector("#q10Choices").innerHTML += ` <input type="radio" name="q10" id="${q10ChoicesArray[i]}"
    value="${q10ChoicesArray[i]}"> <label for="${q10ChoicesArray[i]}"> ${q10ChoicesArray[i]}</label>`;
  }
}//displayQ10Choices

function isFormatValid(){
  let isValid = true;
  if(document.querySelector("#q1").value===""){
    isValid = false;
    document.querySelector("#validationFdbk").innerText="Question 1 was not answered";
  }
  return isValid;
}

function rightAnswer(index){
  document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
  document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png'>";
  score += 10;
}

function wrongAnswer(index){
  document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
  document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
  console.log("Grading quiz…");
  document.querySelector("#validationFdbk").innerHTML = ""; // resets validation feedback
  if(!isFormatValid()){
    return;
  }

  //variables
  score = 0;
  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;
  let q4Response = document.querySelector("input[name=q4]:checked").value;
  let q5Response = document.querySelector("#q5").value.toLowerCase();
  let q6Response = document.querySelector("#q6").value;
  let q7Response = document.querySelector("#q7").value.toLowerCase();
  let q10Response = document.querySelector("input[name=q10]:checked").value;
  console.log(q1Response);

  //Grading question 1
  if(q1Response == "sacramento") {
    rightAnswer(1);  
  } else {
    wrongAnswer(1);
  }

  //Grading question 2
  if(q2Response == "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  //Grading question 3
  if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && 
    !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  //Question 4
  if(q4Response == "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  //Question 5
  if(q5Response == "alaska") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  //Grading question 6
  if (q6Response == "Columbia") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  //Question 7
  if(q7Response == "alaska") {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  //Grading question 8
  if (document.querySelector("#Canada").checked && document.querySelector("#Mexico").checked && 
    !document.querySelector("#Panama").checked && !document.querySelector("#Russia").checked) {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  //Grading question 9
  if (document.querySelector("#AtlanticOcean").checked && document.querySelector("#PacificOcean").checked && 
    document.querySelector("#GulfOfMexico").checked && !document.querySelector("#CaribbeanSea").checked) {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  //Grading question 10
  if(q10Response == "Puerto Rico") {
    rightAnswer(10);  
  } else {
    wrongAnswer(10);
  }

  // document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
  // document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;

  // Default color
  // $("#totalScore").html(`Total Score: ${score}`);

  if (score < 80) {
    $("#totalScore").html(`Total Score: ${score}`).removeClass("text-info text-success").addClass("text-danger");
  } else {
    $("#totalScore").html(`Total Score: ${score}`).removeClass("text-info text-danger").addClass("text-success");
  }
  
  $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
  localStorage.setItem("total_attempts", attempts);

  if (score > 80) {
    alert("Excellent score! Yakko is impressed!");
  }

} //gradeQuiz
