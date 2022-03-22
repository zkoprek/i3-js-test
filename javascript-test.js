const shownArr = [];
const forbidden = [];
var clickedAnswersArr = [];
var clickedAnswersEach = [];
var answeredBtns = [[],[],[],[]];

var cntElements = document.getElementsByClassName("content");
clickedAnswersArr.push = function() { Array.prototype.push.apply(this, arguments);  showResultsBtnCheck();};

function getElemById (name) {
    var elem = document.getElementById(name);
    return elem;
}

function slider () {
    var slidesDiv = getElemById("slides");
    var mobileSlides = getElemById("mobileSlides");

    if (slidesDiv.classList.contains("showSlides")) {
        slidesDiv.classList.remove("showSlides");
        mobileSlides.classList.remove("moveMobileSlides");
    } else {
        slidesDiv.classList.add("showSlides");
        mobileSlides.classList.add("moveMobileSlides");
    }
}

function changeQ (id) {
    document.getElementById("ctnShowResults").classList.remove("showSlides");
    id = id.slice(3);
    elements = document.getElementsByClassName("slide");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor="white";
    }

    document.getElementById("btn"+id).style.backgroundColor = "rgb(150, 255, 150)";
    for (var i = 0; i < cntElements.length; i++) {
        cntElements[i].style.display="none";
    }

    showCtn(id);
}

function showCtn (id){
    var answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    var tag = "ctn" + id;
    var ctnShow = document.getElementById(tag);
    ctnShow.style.display="block";
    var randNum = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    
    if (!shownArr.includes(id)){
        for (var i=0; i<randNum+2; i++) {
            var qst = document.createElement("button");
            qst.classList.add("qst");
            qst.classList.add("slide"+id);
            qst.setAttribute("id", "slide" + id + "Btn" + i);

            qst.onclick = function() { answerBtnClicked(this.id); };
            qst.appendChild(document.createTextNode(i));
            answersDiv.appendChild(qst);
        }
        document.getElementById(tag).appendChild(answersDiv);
        shownArr.push(id);
    }
}

function answerBtnClicked (id) {
    clickedAnswersEach.push(id);
    var idW = id;
    var button = id.slice(9);
    var slideW = idW.slice(0,6);
    var slide = slideW.slice(5);

    if (!forbidden.includes(slide)) {
        var answerBtn = document.getElementById("slide"+slide+"Btn"+button);
        answerBtn.style.backgroundColor="rgb(255, 178, 116)";
        answeredBtns[slide-1].push(button);
        clickedAnswersArr.push(slide);
    } else {
        displayAlertTooMany(slide);
    }
}

function showResultsBtnCheck () {
    var stringI = "";
    const counts = {};

    for (const num of clickedAnswersArr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for (var i = 1; i<5; i++) {
        stringI = i.toString();
        if (counts[i] == i+2) {forbidden.push(stringI);}
        if (counts[i] > i+2) {
            displayAlertTooMany(i);
        }
        if (clickedAnswersArr.includes(stringI)) document.getElementById("btn"+stringI).classList.add("chosenAnswer");
    }

    if (clickedAnswersArr.includes("1") && clickedAnswersArr.includes("2") && clickedAnswersArr.includes("3") && clickedAnswersArr.includes("4")) {
        const button = document.getElementById('showResultsBtn');
        button.disabled = false;
    }
}

function displayAlertTooMany(ctn){
    document.getElementById("alertBox").classList.add("showSlides");
}

function showResults () {
    var resultString = "Results:</br>";
    for (var i=0; i<4; i++) {
        var z = i+1;
        resultString += "Question " + z + ": ";
        for (var y=0; y<answeredBtns[i].length; y++){
            resultString += answeredBtns[i][y] + ", ";
        }

        resultString = resultString.substring(0, resultString.length - 2);
        resultString += "</br>";
    }

    var ctnShowResults = getElemById("ctnShowResults");
    ctnShowResults.innerHTML = resultString;
    ctnShowResults.classList.add("showSlides");
    document.getElementById("ctn4").style.display="none";
}