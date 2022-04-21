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

// ADD more query selectors here
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
function populateStudentInfo(studentInformationObject) {
  updateStudentName(studentInformationObject.name)
  updateStudentGradeLevel(studentInformationObject.grade)
  updateStudentAdvisor(studentInformationObject.advisor)
  updateMajor(studentInformationObject.major)
  updateStudentGraduationYear(studentInformationObject.graduationYear)
  updateStudentImage(studentInformationObject.imageUrl)
}

/**
 * SOLUTION FOR INNER HTML DOM UPDATES
 */

/**
 * This function should add a headers row to the report card table
 */
function addReportCardHeaders(reportCardTableElement) {
  // update the code here
  reportCardTableElement.innerHTML += `
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
function addCourseRowToReportCard(reportCardTableElement, course, rowNum) {
  // update the code here with information about the course passed to this function
  reportCardTableElement.innerHTML += `
  <div class="table-row course-row row-${rowNum + 1} ${rowNum % 2 === 1 ? "odd" : "even"}">
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
function addTotalsRow(reportCardTableElement) {
  reportCardTableElement.innerHTML += `
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
function addGpaRow(reportCardTableElement) {
  reportCardTableElement.innerHTML += `
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
function updateReportCard(reportCardTableElement, currentSemester) {
  // add your code here

  // update the dropdown label
  updateDropdownLabel()
  // reset all inner html to an empty string
  reportCardTableElement.innerHTML = ``
  // create and insert new HTML
  addReportCardHeaders(reportCardTableElement)
  const courses = studentData[currentSemester]
  courses.forEach((course, i) => addCourseRowToReportCard(reportCardTableElement, course, i))
  addTotalsRow(reportCardTableElement)
  addGpaRow(reportCardTableElement)
  // handle any additional calculations
  addUpStudentCredits(reportCardTableElement)
  calculateSemesterGpa(reportCardTableElement)
}

/**
 * SOLUTION FOR DROPDOWN EVENT HANDLERS
 */

/**
 * These two functions should be used to toggle the dropdown.
 *
 * If the dropdown classList contains the "closed" class, the 'openDropdown' function should remove it.
 * If the dropdown classList doesn't contain the "closed" class, 'closeDropdown' function should add it.
 */
function closeDropdown(dropdownElement) {
  dropdownElement.classList.add("closed")
}

function openDropdown(dropdownElement) {
  dropdownElement.classList.remove("closed")
}

/**
 * This function should update the inner html of the dropdown label to be the current
 * value stored in the `semester` variable.
 *
 */
function updateDropdownLabel() {
  // code goes here
  dropdownLabelEl.innerHTML = semester
}

/**
 * This function should add the proper event listeners to the correct DOM elements
 *
 */
function addEventListeners(
  dropdownElement,
  dropdownButtonElement,
  reportCardTableElement,
  fallSemesterElement,
  springSemesterElement,
  winterTermElement
) {
  // Add an event listener for the dropdown button that calls the toggleDropdown button
  dropdownButtonElement.addEventListener("click", (e) => {
    openDropdown(dropdownElement)
  })

  // Add 3 event listeners - one for the fall semester option, the spring semester option, and the winter term option
  // Each callback function one should update the `semester` variable,
  // call the `updateReportCard` function and toggle the dropdown
  fallSemesterElement.addEventListener("click", (e) => {
    semester = "Fall Semester"
    updateReportCard(reportCardTableElement, semester)
    closeDropdown(dropdownElement)
  })
  springSemesterElement.addEventListener("click", (e) => {
    semester = "Spring Semester"
    updateReportCard(reportCardTableElement, semester)
    closeDropdown(dropdownElement)
  })
  winterTermElement.addEventListener("click", (e) => {
    semester = "Winter Term"
    updateReportCard(reportCardTableElement, semester)
    closeDropdown(dropdownElement)
  })
}

/***************
   CALCULATIONS
****************/

/**
 * Use query selectors to access the credits the student has earned for each course.
 * Add them up and display the total in the proper location.
 *
 */
function addUpStudentCredits(reportCardTableElement) {
  // code goes here
  const allCreditElements = reportCardTableElement.querySelectorAll(".credit")

  let total = 0
  allCreditElements.forEach((el) => {
    const amount = Number(el.innerHTML)
    total += amount
  })

  const totalCreditsElement = reportCardTableElement.querySelector("#total-credits")
  if (totalCreditsElement) totalCreditsElement.innerHTML = `${total} credits`
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

function calculateSemesterGpa(reportCardTableElement) {
  // code goes here
  const gpaElements = reportCardTableElement.querySelectorAll(".gpa")
  let totalCourses = 0
  let totalGpaPoints = 0

  gpaElements.forEach((el, i) => {
    const grade = el.innerHTML
    const points = gpaPointsLookup[grade]
    if (points) {
      totalCourses += 1
      totalGpaPoints += points
      const gpaElement = reportCardTableElement.querySelector(`#gpa-${i + 1}`)
      if (gpaElement) gpaElement.innerHTML = points
    }
  })

  const totalPtsElement = reportCardTableElement.querySelector("#total-pts")
  if (totalPtsElement) totalPtsElement.innerHTML = totalGpaPoints
  const cumulativeGpaElement = reportCardTableElement.querySelector("#gpa")
  if (cumulativeGpaElement) cumulativeGpaElement.innerHTML = Number(totalGpaPoints / totalCourses).toFixed(2)
}

window.onload = function () {
  // run your function here to make it execute as soon as the page loads
  addEventListeners(dropdownEl, dropdownButtonEl, reportCardTableEl, fallSemesterEl, springSemesterEl, winterTermEl)
  populateStudentInfo(studentInformation)
  updateReportCard(reportCardTableEl, semester)
}
