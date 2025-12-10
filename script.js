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
    { text: "Which symbol starts a CSS class selector?", options: ["#", ".", "/", "*"], correct: 1 },
    { text: "Which CSS property adds space inside an element?", options: ["padding", "margin", "border", "gap"], correct: 0 },
   /* { text: "Which JavaScript method parses a JSON string?", options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "parseJSON()"], correct: 0 },
    { text: "Which git command initializes a new repository?", options: ["git init", "git clone", "git add", "git commit"], correct: 0 },
    { text: "Which HTML element defines the document's title shown in the browser tab?", options: ["head", "title", "h1", "meta"], correct: 1 },
    { text: "Which loop is typically used when the number of iterations is unknown?", options: ["for", "while", "do-while", "foreach"], correct: 1 },
    { text: "Which HTTP status code means 'Not Found'?", options: ["200", "301", "404", "500"], correct: 2 },
    { text: "In CSS, which unit is relative to the root (html) font-size?", options: ["em", "rem", "px", "%"], correct: 1 },
    { text: "Which HTML5 element is intended for navigation links?", options: ["nav", "section", "header", "aside"], correct: 0 },
    { text: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Interface", "App Programming Interface", "Advanced Program Integration"], correct: 0 },
    { text: "Which array method adds an element to the end in JavaScript?", options: ["push", "pop", "shift", "unshift"], correct: 0 }
     */
];
// ai helped format ^

//quiz start
let currentQuestion = 0;
let score = 0;
const answers = new Array(quizQuestions.length);

/*
function fetchElements(id) {
    return document.getElementById(id);
}
*/

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

    for (let i = 0; i < currentQ.options.length; i++) {
        const opt = currentQ.options[i];

        const listItem = document.createElement("li");

        const optionButton = document.createElement("button");

        optionButton.type = "button";
        optionButton.className = "option";
        optionButton.textContent = opt;
        optionButton.dataset.index = i;

        if (answers[currentQuestion] == i) {
            optionButton.classList.add("selected");
        }

        optionButton.addEventListener("click", () => {
            selectOption(i);
        });

        listItem.appendChild(optionButton);
        optionsList.appendChild(listItem);
    }

    /*
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
    */
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

    const optionButtons = optionsContainer.querySelectorAll(".option");

    for (let i = 0; i < optionButtons.length; i++) {
        const button = optionButtons[i];

        const buttonIndex = Number(button.dataset.index);

        const isSelected = buttonIndex == optionIndex;
        button.classList.toggle("selected", isSelected);
    }

    /*
    allOptionButtons.forEach(button => {
        const buttonIndex = Number(button.dataset.index);

        const isSelected = buttonIndex === optionIndex;

        button.classList.toggle("selected", isSelected);
    });
    */
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
    //ai assisted
    quizQuestions.forEach((q, i) => {
        const buttonElement = document.createElement("button");
        buttonElement.className = "map-item";
        buttonElement.textContent = i + 1;

        if (answers[i] !== null) {
            buttonElement.style.background = "rgba(53, 194, 178, 0.2)";
        } else {
            buttonElement.style.background = "rgba(0, 0, 0, 0.6)";
        }

        if (i == currentQuestion) {
            buttonElement.style.outline = "2px solid #35c2b2";
        }

        buttonElement.addEventListener("click", () => {
            currentQuestion = i;
            renderQuestion();
        });

        mapContainer.appendChild(buttonElement);
    });
}

/* function updateSidebarCounts(){
    const answered = answers.filter(a => a !== null).length;
    fetchElements("answered-count").textContent = answered;
    fetchElements("correct-count").textContent = 0;
}
*/

function updateSidebarCounts() {
    const answeredCount = answers.filter(a => a !== null).length;

    const answeredElement = document.getElementById("answered-count");
    answeredElement.textContent = answeredCount;

    const correctElement = document.getElementById("correct-count");
    correctElement.textContent = 0;
}

/*
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
*/

function onSubmit() {
    let correctCount = 0;
    //ai assissted

    for (let i = 0; i < answers.length; i++) {
        const userAnswerIndex = answers[i];
        const correctAnswerIndex = quizQuestions[i].correct;
        if (userAnswerIndex == correctAnswerIndex) {
            correctCount++;
        /*answers.forEach((userAnswerIndex, questionIndex) => {
        const correctAnswerIndex = quizQuestions[questionIndex].correct;
        */
        
        }
    };

    const correctScoreElement = document.getElementById("correct-count");
    correctScoreElement.textContent = correctCount;

    const mapContainer = document.getElementById("question-map");
    //ai helped
    const mapButtons = mapContainer.querySelectorAll(".map-item");

    for (let i = 0; i < mapButtons.length; i++) {
        const button = mapButtons[i];
        const userAnswerIndex = answers[i];
        const correctAnswerIndex = quizQuestions[i].correct;

        if (userAnswerIndex == null) {
            button.style.background = "rgba(0, 0, 0, 0.6)";
        }
        else {
            const isCorrect = userAnswerIndex == correctAnswerIndex;
            button.style.background = isCorrect ? "rgba(53, 194, 178, 0.3)" : "rgba(255, 123, 123, 0.3)";
        }
    }

    /*mapButtons.forEach((button, i) => {
        if (answers[i] === null) {
            button.style.background = "rgba(255,255,255,0.02)";
        } else {
            const isCorrect = answers[i] === quizQuestions[i].correct;

            button.style.background = isCorrect ? "rgba(53, 194, 178, 0.3)" : "rgba(255, 123, 123, 0.3)";
        }
    });
    */
    alert(`You scored ${correctCount} out of ${quizQuestions.length}`);
    //  con cat n nate
}

/*
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
*/

//load everything, AI assisted
document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
    updateSidebarCounts();

    const nextButton = document.getElementById("next-btn");
    nextButton.addEventListener("click", goForward);

    const prevButton = document.getElementById("prev-btn");
    prevButton.addEventListener("click", goBack);

    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", onSubmit);

    //ai helped me with this part
    document.addEventListener("keydown", (event) => {

        // Check if the pressed key is the Right Arrow key.
        if (event.key === "ArrowRight") {
            // If it is, move to the next question.
            goForward();
        }

        // Check if the pressed key is the Left Arrow key.
        if (event.key === "ArrowLeft") {
            // If it is, move to the previous question.
            goBack();
        }
    });
});