const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");


const outputDay = document.getElementById("realDay");
const outputMonth = document.getElementById("realMonth");
const outputYear = document.getElementById("realYear");

let originalOutputDayContent = outputDay.textContent
let originalOutputMonthContent = outputMonth.textContent
let originalOutputYearContent = outputYear.textContent

let d3, m3, y3;
let yError ;
let mError ;
let dError ;

const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('.cont input')
console.log(originalOutputYearContent)

// Errors
const errorDay = document.getElementById("errorDay");
const errorMonth = document.getElementById("errorMonth");
const errorYear = document.getElementById("errorYear");

const submitBtn = document.querySelector(".submit")
submitBtn.addEventListener("click", (event) => {
    deleteOutputs()
    deleteInputs()
    event.preventDefault()
    calculateAge()
    if(yError || mError || dError){
        addClassLabels()
        displayResults()
        deleteOutputs()
    }else{
    removeClasses()
    displayResults()
    }
    // displayResults()
})

inputDay.addEventListener("focus", () => {
    console.log("input day focused")
    errorDay.textContent = "";
});
 
inputDay.addEventListener("blur", () => {
    console.log("input day blured")
    if (inputDay.value.trim() === "") {
        addClassLabels()
        errorDay.textContent = "Field is required";
    }
});

inputMonth.addEventListener("focus", () => {
    errorMonth.textContent = "";
});

inputMonth.addEventListener("blur", () => {
    if (inputMonth.value.trim() === "") {
        addClassLabels()
        errorMonth.textContent = "Field is required";
    }
});

inputYear.addEventListener("focus", () => {
    console.log("input year focused")
    errorYear.textContent = "";
});

inputYear.addEventListener("blur", () => {
    console.log("input year blurred")
    if (inputYear.value.trim() === "") {
        addClassLabels()
        errorYear.textContent = "Field is required";
    }
});
const months = [31,28,31,30,31,30,31,31,30,31,30,31]

function calculateAge(){
    yError = "";
    mError = "";
    dError = "";

    let d1 = inputDay.value
    let m1 = inputMonth.value
    let y1 = inputYear.value

    let today = new Date()

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear(); 

    // error variables


    //get difference year
    if(y2 >= y1){
        y3 = y2 -y1 
    }else{
        yError = "must be in the past"
    }
    console.log("this is actually" ,y3)
if(m1 >= 1 && m1 <= 12){
    if(m2 >= m1){
        m3 = m2 -m1
    }else{
        y3--;
        m3 = 12 + m2 -m1;
    }
}else{
    mError = "must be a valid month"
}
    if(d1 >= 1 && d1 <= 31){
         
        if(d1 <= months[m1 - 1]){
    if(d2 >= d1){
        d3 = d2 - d1;
        console.log(d3)
    }else{
        m3--;
        console.log("this is d2", d2)
        console.log("this is m3", m3)
        console.log(months[m1 -1 ])
        d3 = months[m1 -1] + d2 - d1;
        console.log(d3)
    }
}else{
    dError = "must be valid date"
    // return ""
}
}else{
    dError = "must be valid day"
    // return""
}
    if(m3 < 0){
        m3 = 11;
        y3--;
    }
    console.log(y3, m3, d3)
    console.log("this is the day error ",dError)
    console.log("this is the year error ", yError)
    console.log("tis is the month erro ", mError)
   
}

function displayResults(){
    if(dError){
        errorDay.textContent = dError
    }else{
        errorDay.textContent = ""
        outputDay.textContent = d3
    }
    if(mError){
        errorMonth.textContent = mError
    }else{
        errorMonth.textContent = "";
        outputMonth.textContent = m3;
    }
    if(yError){
        console.log(yError)
        errorYear.textContent = yError
        console.log(y3)
    }else{
        errorYear.textContent = ""
        outputYear.textContent = y3
    }

}   
// resets the outputs
function deleteOutputs(){
    outputDay.textContent = originalOutputDayContent
    outputMonth.textContent = originalOutputMonthContent
    outputYear.textContent = originalOutputYearContent
}
//resets the inputs
function deleteInputs(){
    d3 = null
    m3 = null
    y3 = null
}
// adds the class for errors
function addClassLabels(){
labels.forEach(label => {
    label.classList.add('error-label');
});
console.log("Labels have been updated with the error class.");

inputs.forEach(inpt => {
    inpt.classList.add('error-input');
});

}
//removes the error classes
function removeClasses(){
    labels.forEach(label => {
        label.classList.remove('error-label')
    })
    inputs.forEach(inpt => {
        inpt.classList.remove('error-input');
    })
}
