/*
COMPLETE THE FOLLOWING TASKS WITHOUT MODIFYING ANY OF THE CODE IN THE HTML OR CSS FILE.

You should only write code in the JavaScript functions below, as well as the object with your student information.

Each function is annotated with a comment explaining what it should do.

By the end of the lab, there shouldn't be any question marks left on the report card.
*/

const studentInformation = {
  name: "Student McStudent",
  grade: "13",
  advisor: "LeBron James",
  major: "Computer Science",
  graduationYear: "2023",
  imageUrl: "https://media.giphy.com/media/jkSvCVEXWlOla/giphy.gif",
}

let semester = "Spring Semester"

const studentData = {
  "Spring Semester": [
    { code: "LIT 101", name: "English Literature 101", semester: "Spring 2021", credits: 5, grade: "B+" },
    { code: "CS 50", name: "Intro to Computer Science", semester: "Spring 2021", credits: 5, grade: "A-" },
    { code: "WD 140", name: "Modern Web Development", semester: "Spring 2021", credits: 5, grade: "A+" },
    { code: "JS 2.0", name: "Serverside JavaScript", semester: "Spring 2021", credits: 10, grade: "A-" },
  ],
  "Fall Semester": [
    { code: "Math 600", name: "Differential Equations", semester: "Fall 2020", credits: 5, grade: "A-" },
    { code: "CS 10", name: "Python Programming", semester: "Fall 2020", credits: 5, grade: "A" },
    { code: "History 99", name: "History of Computers", semester: "Fall 2020", credits: 5, grade: "A-" },
    { code: "MD 00", name: "Meditation and Mindfullness", semester: "Fall 2020", credits: 5, grade: "A+" },
  ],
  "Winter Term": [
    { code: "PHYS ED", name: "Physical Activity", semester: "Winter 2020", credits: 5, grade: "A-" },
    { code: "GEN ED", name: "General Education Requirement", semester: "Winter 2020", credits: 5, grade: "A+" },
  ],
}

const gpaPointsLookup = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
}

/**
 * QUERY SELECTORS VARIABLES GO HERE
 */
const studentNameEl = document.querySelector("#student-name")
const studentAdvisorEl = document.querySelector("#student-advisor")
const studentMajorEl = document.querySelector("#student-major")
const studentGradeLevelEl = document.querySelector("#student-grade-level")
const studentGradYearEl = document.querySelector("#student-graduation-year")
const studentImageEl = document.querySelector("#student-image")
const dropdownEl = document.querySelector(".dropdown")
const dropdownButtonEl = document.querySelector(".dropdown-button")
const dropdownLabelEl = document.querySelector(".dropdown-label")
const fallSemesterEl = document.querySelector("#fall-semester")
const springSemesterEl = document.querySelector("#spring-semester")
const winterTermEl = document.querySelector("#winter-term")
const reportCardTableEl = document.querySelector("#report-card-table")

/**
 * SOLUTIONS FOR STUDENT INFO DOM UPDATES
 */

/**
 * Modify the report card to display the correct grade level from the lookup table above.
 *
 * @param {String} studentName - the name of the student
 */
function updateStudentName(studentName) {
  // code goes here
  studentNameEl.innerHTML = studentName
}

/**
 * Modify the report card to display the correct grade level from the lookup table above.
 *
 * @param {String|Number} studentGradeLevel - the grade level of the student
 */
function updateStudentGradeLevel(studentGradeLevel) {
  // code goes here
  studentGradeLevelEl.innerHTML = studentGradeLevel
}

/**
 * Modify the report card to display the correct advisor from the lookup table above.
 *
 * @param {String} studentAdvisor - the advisor of the student
 */
function updateStudentAdvisor(studentAdvisor) {
  // code goes here
  studentAdvisorEl.innerHTML = studentAdvisor
}

/**
 * Modify the report card to display the correct major from the lookup table above.
 *
 * @param {String} studentMajor - the major of the student
 */
function updateMajor(studentMajor) {
  // code goes here
  studentMajorEl.innerHTML = studentMajor
}

/**
 * Modify the report card to display the correct graduation year from the lookup table above
 *
 * @param {Number} graduationyear - the year the student graduates
 */
function updateStudentGraduationYear(graduationYear) {
  // code goes here
  studentGradYearEl.innerHTML = graduationYear
}

/**
 * Modify the img element using `setAttribute` so that that the src attribute
 * stores the link to your image.
 *
 * @param {String} url - a link to an image
 */
function updateStudentImage(imageUrl) {
  // code goes here
  studentImageEl.setAttribute("src", imageUrl)
}

/**
 * This function should run as soon as the page loads and update the correct student info
 */
function populateStudentInfo({ name, grade, advisor, major, graduationYear, imageUrl }) {
  updateStudentName(name)
  updateStudentGradeLevel(grade)
  updateStudentAdvisor(advisor)
  updateMajor(major)
  updateStudentGraduationYear(graduationYear)
  updateStudentImage(imageUrl)
}

/**
 * SOLUTION FOR INNER HTML DOM UPDATES
 */

/**
 * This function should add a headers row to the report card table
 */
function addReportCardHeaders() {
  // update the code here
  reportCardTableEl.innerHTML += `
    <div class="table-row table-header">
      <h4 class="code-col">Code</h4>
      <h4 class="name-col">Name</h4>
      <h4 class="sem-col">Semester</h4>
      <h4 class="cred-col">Credits</h4>
      <h4 class="lett-col">Letter</h4>
      <h4 class="pts-col">Points</h4>               
    </div>  
  `
}

/**
 * This function should take in a single course and create a row with the
 * course code, course name, course semester, course credits, course letter grade, and course points columns.
 *
 * @param {Object} course
 * @param {Number} rowNum
 */
function addCourseRowToReportCard(course, rowNum) {
  // update the code here with information about the course passed to this function
  reportCardTableEl.innerHTML += `
    <div class="table-row ${rowNum % 2 === 1 ? "odd" : ""}">
      <h4 class="code-col">${course.code}</h4>
      <h4 class="name-col">${course.name}</h4>
      <h4 class="sem-col">${course.semester}</h4>
      <h4 class="cred-col"><span class="credit">${course.credits}</span> credits</h4>
      <h4 class="lett-col gpa">${course.grade}</h4>
      <h4 id="gpa-${rowNum + 1}" class="pts-col">?</h4>
    </div>
  `
}

/**
 * This function should add HTML for the totals row in the report card.
 */
function addTotalsRow() {
  reportCardTableEl.innerHTML += `
    <div class="table-row totals">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">Totals:</h4>
      <h4 id="total-credits" class="cred-col"> ? credits </h4>
      <h4 class="lett-col"></h4>
      <h4 id="total-pts" class="pts-col">?</h4>
    </div>
  `
}

/**
 * This function should add HTML for the final row in the report card.
 */
function addGpaRow() {
  reportCardTableEl.innerHTML += `
    <div class="table-row gpa odd">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">GPA:</h4>
      <h4 class="cred-col"></h4>
      <h4 class="lett-col"></h4>
      <h4 id="gpa" class="pts-col"> ?</h4>               
    </div>
  `
}

/**
 * This is the primary function used to update the report card when the semester changes
 *
 * It should call the other functions responsible for creating the necessary HTML
 *
 */
function updateReportCard() {
  updateDropdownLabel()

  reportCardTableEl.innerHTML = ``
  addReportCardHeaders()
  const courses = studentData[semester]
  courses.forEach((course, i) => addCourseRowToReportCard(course, i))
  addTotalsRow()
  addGpaRow()
  addUpStudentCredits()
  calculateSemesterGpa()
}

/**
 * SOLUTION FOR DROPDOWN EVENT HANDLERS
 */

/**
 * This function should toggle the dropdown.
 *
 * If the dropdown classList contains the "closed" class, it should remove it.
 * If the dropdown classList doesn't contain the "closed" class, it should add it.
 */
function toggleDropdown() {
  if (dropdownEl.classList.contains("closed")) {
    dropdownEl.classList.remove("closed")
  } else {
    dropdownEl.classList.add("closed")
  }
}

/**
 * This function should update the inner html of the dropdown label to be the current
 * value stored in the `semester` variable.
 *
 */
function updateDropdownLabel() {
  dropdownLabelEl.innerHTML = semester
}

// Add an event listener for the dropdown button that calls the toggleDropdown button
dropdownButtonEl.addEventListener("click", (e) => {
  toggleDropdown()
})

// Add 3 event listeners - one for the fall semester option, the spring semester option, and the winter term option
// Each callback function one should update the `semester` variable,
// call the `updateReportCard` function and toggle the dropdown

fallSemesterEl.addEventListener("click", (e) => {
  semester = "Fall Semester"
  updateReportCard()
  toggleDropdown()
})
springSemesterEl.addEventListener("click", (e) => {
  semester = "Spring Semester"
  updateReportCard()
  toggleDropdown()
})
winterTermEl.addEventListener("click", (e) => {
  semester = "Winter Term"
  updateReportCard()
  toggleDropdown()
})

/***************
   CALCULATIONS
****************/

/**
 * Use query selectors to access the credits the student has earned for each course.
 * Add them up and display the total in the proper location.
 *
 */
function addUpStudentCredits() {
  // code goes here
  const creditElements = document.querySelectorAll(".credit")

  let total = 0
  creditElements.forEach((el) => {
    const amount = Number(el.innerHTML)
    total += amount
  })

  document.querySelector("#total-credits").innerHTML = `${total} credits`
}

/**
 * Use query selectors to access the letter grades for each course and convert them to GPA points using
 * the `pointsLookup` object.
 *
 * That English Literature grade is keeping us from all A's! Let's see if we can't update that to an A-
 * since we definitely deserve it after a hard semester of work.
 *
 * Then perform a quick calculation and update the report card with the total points and
 * cumulative grade point average for the semester.
 *
 */
function calculateSemesterGpa() {
  // code goes here
  const gpaElements = document.querySelectorAll(".gpa")
  let totalCourses = 0
  let totalGpa = 0

  gpaElements.forEach((el, i) => {
    const grade = el.innerHTML
    const points = gpaPointsLookup[grade]
    if (points) {
      totalCourses += 1
      totalGpa += points
      document.querySelector(`#gpa-${i + 1}`).innerHTML = points
    }
  })

  document.querySelector("#total-pts").innerHTML = totalGpa
  document.querySelector("#gpa").innerHTML = Number(totalGpa / totalCourses).toFixed(2)
}

window.onload = function () {
  // run your function here to make it execute as soon as the page loads
  populateStudentInfo(studentInformation)
  updateReportCard()
}
