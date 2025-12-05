const quizQuestions = [
    { text: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], correct: 3 },
    { text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks and Text Markup", "Home Tool Markup Language"], correct: 0 },
    { text: "Which company developed the React library?", options: ["Google", "Facebook", "Microsoft", "Twitter"], correct: 1 },
    { text: "Which tag is used for an unordered list in HTML?", options: ["<ol>", "<li>", "<ul>", "<list>"], correct: 2 },
    { text: "What CSS property controls layout direction?", options: ["flex-direction", "display", "position", "float"], correct: 0 },
    { text: "Which data structure uses FIFO (first-in-first-out)?", options: ["Stack", "Queue", "Tree", "Graph"], correct: 1 },
    { text: "Which HTTP method is typically used to update a resource?", options: ["GET", "POST", "PUT", "DELETE"], correct: 2 },
    { text: "In JavaScript, which keyword declares a constant?", options: ["var", "let", "const", "fixed"], correct: 2 },
    { text: "Which HTML attribute adds alternative text to images?", options: ["title", "alt", "desc", "text"], correct: 1 },
    { text: "Which symbol starts a CSS class selector?", options: ["#", ".", "/", "*"], correct: 1 }
];
// ai helped format ^

//quiz start
let currentQuestion = 0;
let score = 0;
const answers = new Array(quizQuestions.length);

function fetchElements(id) {
    return document.getElementById(id);
}

/*
function renderQuestion(){
    const question = quizQuestions[currentQuestion];
    fetchElements("questionIndex").textContent = currentQuestion + 1;
    fetchElements("questionTotal").textContent = quizQuestions.length;
    fetchElements("questionText").textContent = question.text;

    const ul = fetchElements("options-list");
    ul.innerHTML = "";
    question.options.forEach((opt, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option";
        btn.textContent = opt;
        btn.dataset.index = i;
        if (answers[currentQuestion] === i) btn.classList.add("selected");
        btn.addEventListener("click", () => selectOption(i));
        li.appendChild(btn);
        ul.appendChild(li);
    });

    updateProgressbar();
    renderQuestionMap();
}
*/
function renderQuestion() {
    const currentQ = quizQuestions[currentQuestion];

    document.getElementById("questionIndex").textContent = currentQuestion + 1;
    document.getElementById("questionTotal").textContent = quizQuestions.length;
    document.getElementById("questionText").textContent = currentQ.text;

    const optionsList = document.getElementById("options-list");

    while (optionsList.firstChild) {

        optionsList.removeChild(optionsList.firstChild);
    }
    
    //ai helped format this part
    currentQ.options.forEach((opt, i) => {
        const listItem = document.createElement("li");

        const optionButton = document.createElement("button");

        optionButton.type = "button";
        optionButton.className = "option";
        optionButton.textContent = opt;
        optionButton.dataset.index = i;

        if (answers[currentQuestion] === i) {
            optionButton.classList.add("selected");
        }

        optionButton.addEventListener("click", () => {
            selectOption(i);
        });

        listItem.appendChild(optionButton);
        optionsList.appendChild(listItem);
    });

    updateProgressbar();
    renderQuestionMap();
}


/*
function selectOption(option){
    answers [currentQuestion] = option;
    const buttons = fetchElements("options-list").querySelectorAll(".option");
    buttons.forEach(button => button.classList.toggle("selected", Number(button.dataset.index) === option));

    updateSidebarCounts();
    renderQuestionMap();
}
*/

//it's self explanatory
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;

    const optionsContainer = document.getElementById("options-list");

    const allOptionButtons = optionsContainer.querySelectorAll(".option");

    //ai helped format, ionno how to use forEach; needa learn
    allOptionButtons.forEach(button => {
        const buttonIndex = Number(button.dataset.index);

        const isSelected = buttonIndex === optionIndex;

        button.classList.toggle("selected", isSelected);
    });

    updateSidebarCounts();
    renderQuestionMap();
}

// uptd prog
function updateProgressbar(){
    const fillNum = Math.round(((currentQuestion + 1) / quizQuestions.length) * 100);
    const fill = document.querySelector(".progress-fill");
    if (fill) fill.style.width = fillNum + "%";
}

/*
function goForward(){
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        fetchElements("submit-btn").classList.remove("hidden");
    }
}
*/

//go forward
function goForward() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } 
    else {
        const submitButton = document.getElementById("submit-btn");
        submitButton.classList.remove("hidden");
    }
}

//go back
function goBack(){
  if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

/*
function renderQuestionMap(){
    const map = fetchElements("question-map");
    if (!map) return;
    map.innerHTML = "";
    quizQuestions.forEach((q, i) => {
        const b = document.createElement("button");
        b.className = "map-item";
        b.textContent = i + 1;
        if (answers[i] !== null) b.style.background = "rgba(53, 194, 178, 0.2)";
        if (i === currentQuestion) b.style.outline = "2px solid #35c2b2";
        b.addEventListener("click", () => { currentQuestion = i; renderQuestion(); });
        map.appendChild(b);
    });
}
 */

function renderQuestionMap() {
    const mapContainer = document.getElementById("question-map");

    if (!mapContainer) {
        return;
    }

    mapContainer.innerHTML = "";

    quizQuestions.forEach((q, i) => {
        const buttonElement = document.createElement("button");
        buttonElement.className = "map-item";
        buttonElement.textContent = i + 1;

        if (answers[i] !== null) {
            buttonElement.style.background = "rgba(53, 194, 178, 0.2)";
        }

        if (i === currentQuestion) {
            buttonElement.style.outline = "2px solid #35c2b2";
        }

        buttonElement.addEventListener("click", () => {
            currentQuestion = i;
            renderQuestion();
        });

        // G. Add the newly created button to the map container.
        mapContainer.appendChild(buttonElement);
    });
}

function updateSidebarCounts(){
    const answered = answers.filter(a => a !== null).length;
    fetchElements("answered-count").textContent = answered;
    // correct count is shown only after submit; keep 0 before submit
    fetchElements("correct-count").textContent = 0;
}

function onSubmit(){
    let correct = 0;
    answers.forEach((a, i) => {
        if (a === quizQuestions[i].correct) correct++;
    });
    fetchElements("correct-count").textContent = correct;

    const mapBtns = fetchElements("question-map").querySelectorAll(".map-item");
    mapBtns.forEach((btn, i) => {
        if (answers[i] === null) btn.style.background = "rgba(255,255,255,0.02)";
        else btn.style.background = (answers[i] === quizQuestions[i].correct) ? "rgba(53, 194, 178, 0.3)" : "rgba(255, 123, 123, 0.3)";
    });
    alert(`You scored ${correct} out of ${quizQuestions.length}`);
    // con cat 
}


// load allat stuff
document.addEventListener("DOMContentLoaded", () => {
    // render allat stuff
    renderQuestion();
    updateSidebarCounts();

    // control thing
    fetchElements("next-btn").addEventListener("click", goForward);
    fetchElements("prev-btn").addEventListener("click", goBack);
    fetchElements("submit-btn").addEventListener("click", onSubmit);

    // keyy nav
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") goForward();
        if (event.key === "ArrowLeft") goBack();
    });
});