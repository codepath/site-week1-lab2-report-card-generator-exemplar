const expect = chai.expect
const assert = chai.assert

// UTILITIES

const isDefined = (item) => typeof item !== undefined && item !== null

const stringIsNumericalDigitsOnly = (item) => /^\d+$/.test(item?.trim())

const stripWhitespaceFromString = (str) => (isDefined(str) ? str.replace(/\s+/g, "") : str)

function createTableElement(idSuffix = "test") {
  const tableDivElement = document.createElement("div")
  tableDivElement.id = `report-card-table-${idSuffix}`
  tableDivElement.classList.add("report-card-table")
  return tableDivElement
}

function getDropdownElementNodes(suffix = "test") {
  const dropdownElement = document.querySelector(".dropdown-" + suffix)
  const dropdownButtonElement = document.querySelector(".dropdown-button-" + suffix)
  const dropdownLabelElement = document.querySelector(".dropdown-label-" + suffix)
  const dropdownIconElement = document.querySelector(".dropdown-icon-" + suffix)
  const dropdownMenuElement = document.querySelector(".dropdown-menu-" + suffix)
  const fallSemesterElement = document.querySelector("#fall-semester-" + suffix)
  const springSemesterElement = document.querySelector("#spring-semester-" + suffix)
  const winterTermElement = document.querySelector("#winter-term-" + suffix)

  return {
    dropdownElement,
    dropdownButtonElement,
    dropdownLabelElement,
    dropdownIconElement,
    dropdownMenuElement,
    fallSemesterElement,
    springSemesterElement,
    winterTermElement,
  }
}

function createDropdownElement(suffix = "test") {
  const dropdownHtmlContent = `
      <div class="row">
        <p>Select Semester</p>          
      </div>

      <div class="row">
        <div class="semester-dropdown">
          <div class="dropdown-${suffix} closed">
            <h2 class="dropdown-button-${suffix}" role="button">
              <span class="dropdown-label-${suffix}">Spring Semester</span>
              <span class="dropdown-icon-${suffix}">∆</span>   
            </h2>
            <ul class="dropdown-menu-${suffix}">
              <li id="fall-semester-${suffix}">Fall Semester</li>
              <li id="spring-semester-${suffix}">Spring Semester</li>
              <li id="winter-term-${suffix}">Winter Term</li>
            </ul>  
          </div>          
        </div>
        <div class="actions">
          <button class="btn">
            Filter Results
          </button>
        </div>          
      </div>   
  `

  const optionsCardDropdownWrapperDiv = document.createElement("div")
  optionsCardDropdownWrapperDiv.classList = "options card col"
  document.body.appendChild(optionsCardDropdownWrapperDiv)
  optionsCardDropdownWrapperDiv.innerHTML = dropdownHtmlContent
  return optionsCardDropdownWrapperDiv
}

// DATA

const originalData = {
  studentData: {
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
  },
  gpaPointsLookup: {
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
  },
}

const getUserInfoFields = () => {
  return [
    {
      attr: "name",
      fieldName: "name",
      originalText: "FILL_IN_YOUR_NAME_HERE",
      label: "name",
      fn: window?.updateStudentName,
      fnLabel: "updateStudentName",
    },
    {
      attr: "grade",
      fieldName: "grade_level",
      originalText: "FILL_IN_YOUR_GRADE_LEVEL_HERE",
      label: "grade level",
      fn: window?.updateStudentGradeLevel,
      fnLabel: "updateStudentGradeLevel",
    },
    {
      attr: "advisor",
      fieldName: "advisor",
      originalText: "FILL_IN_YOUR_ADVISOR_HERE",
      label: "advisor",
      fn: window?.updateStudentAdvisor,
      fnLabel: "updateStudentAdvisor",
    },
    {
      attr: "major",
      fieldName: "major",
      originalText: "FILL_IN_YOUR_MAJOR_HERE",
      label: "major",
      fn: window?.updateMajor,
      fnLabel: "updateMajor",
    },
    {
      attr: "graduationYear",
      fieldName: "graduation_year",
      originalText: "FILL_IN_YOUR_GRADUATION_YEAR_HERE",
      label: "graduation year",
      fn: window?.updateStudentGraduationYear,
      fnLabel: "updateStudentGraduationYear",
    },
    {
      attr: "imageUrl",
      fieldName: "image",
      originalText: "ADD_A_URL_TO_ANY_IMAGE_HERE",
      label: "image url",
      fn: window?.updateStudentImage,
      fnLabel: "updateStudentImage",
    },
  ]
}

const getExpectedReportCardTableHtml = () => {
  return {
    addReportCardHeaders: `
      <div class="table-row table-header">
        <h4 class="code-col">Code</h4>
        <h4 class="name-col">Name</h4>
        <h4 class="sem-col">Semester</h4>
        <h4 class="cred-col">Credits</h4>
        <h4 class="lett-col">Letter</h4>
        <h4 class="pts-col">Points</h4>
      </div>        
    `,
    addCourseRowToReportCard: (course, rowNum) => `
      <div class="table-row row-${rowNum + 1} ${rowNum % 2 === 1 ? "odd" : "even"}">
        <h4 class="code-col">${course.code}</h4>
        <h4 class="name-col">${course.name}</h4>
        <h4 class="sem-col">${course.semester}</h4>
        <h4 class="cred-col"><span class="credit">${course.credits}</span> credits</h4>
        <h4 class="lett-col gpa">${course.grade}</h4>
        <h4 id="gpa-${rowNum + 1}" class="pts-col">?</h4>
      </div>
    `,
    addTotalsRow: `
      <div class="table-row totals">
        <h4 class="code-col"></h4>
        <h4 class="name-col"></h4>
        <h4 class="sem-col">Totals:</h4>
        <h4 id="total-credits" class="cred-col"> ? credits </h4>
        <h4 class="lett-col"></h4>
        <h4 id="total-pts" class="pts-col">?</h4>
      </div>
    `,
    addGpaRow: `
      <div class="table-row gpa odd">
        <h4 class="code-col"></h4>
        <h4 class="name-col"></h4>
        <h4 class="sem-col">GPA:</h4>
        <h4 class="cred-col"></h4>
        <h4 class="lett-col"></h4>
        <h4 id="gpa" class="pts-col"> ?</h4>
      </div>
    `,
  }
}

const availableSemesters = Object.keys(originalData.studentData)

const dynamicallyConstructedMarkupResults = {
  "Spring Semester": `
  <div id="report-card-table" class="report-card-table">
    <div class="table-row table-header">
      <h4 class="code-col">Code</h4>
      <h4 class="name-col">Name</h4>
      <h4 class="sem-col">Semester</h4>
      <h4 class="cred-col">Credits</h4>
      <h4 class="lett-col">Letter</h4>
      <h4 class="pts-col">Points</h4>
    </div>  

    <div class="table-row even">
      <h4 class="code-col">LIT 101</h4>
      <h4 class="name-col">English Literature 101</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">B+</h4>
      <h4 id="gpa-1" class="pts-col">3.3</h4>
    </div>

    <div class="table-row odd">
      <h4 class="code-col">CS 50</h4>
      <h4 class="name-col">Intro to Computer Science</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">A-</h4>
      <h4 id="gpa-2" class="pts-col">3.7</h4>
    </div>

    <div class="table-row even">
      <h4 class="code-col">WD 140</h4>
      <h4 class="name-col">Modern Web Development</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">A+</h4>
      <h4 id="gpa-3" class="pts-col">4</h4>
    </div>

    <div class="table-row odd">
      <h4 class="code-col">JS 2.0</h4>
      <h4 class="name-col">Serverside JavaScript</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">10</span> credits</h4>
      <h4 class="lett-col gpa">A-</h4>
      <h4 id="gpa-4" class="pts-col">3.7</h4>
    </div>

    <div class="table-row totals">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">Totals:</h4>
      <h4 id="total-credits" class="cred-col">25 credits</h4>
      <h4 class="lett-col"></h4>
      <h4 id="total-pts" class="pts-col">14.7</h4>
    </div>

    <div class="table-row gpa odd">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">GPA:</h4>
      <h4 class="cred-col"></h4>
      <h4 class="lett-col"></h4>
      <h4 id="gpa" class="pts-col">3.67</h4>               
    </div>
  </div>
  `,
  "Fall Semester": `
  <div id="report-card-table" class="report-card-table">
    <div class="table-row table-header">
      <h4 class="code-col">Code</h4>
      <h4 class="name-col">Name</h4>
      <h4 class="sem-col">Semester</h4>
      <h4 class="cred-col">Credits</h4>
      <h4 class="lett-col">Letter</h4>
      <h4 class="pts-col">Points</h4>               
    </div>  

    <div class="table-row even">
      <h4 class="code-col">LIT 101</h4>
      <h4 class="name-col">English Literature 101</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">B+</h4>
      <h4 id="gpa-1" class="pts-col">3.3</h4>
    </div>

    <div class="table-row odd">
      <h4 class="code-col">CS 50</h4>
      <h4 class="name-col">Intro to Computer Science</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">A-</h4>
      <h4 id="gpa-2" class="pts-col">3.7</h4>
    </div>

    <div class="table-row even">
      <h4 class="code-col">WD 140</h4>
      <h4 class="name-col">Modern Web Development</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">A+</h4>
      <h4 id="gpa-3" class="pts-col">4</h4>
    </div>

    <div class="table-row odd">
      <h4 class="code-col">JS 2.0</h4>
      <h4 class="name-col">Serverside JavaScript</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">10</span> credits</h4>
      <h4 class="lett-col gpa">A-</h4>
      <h4 id="gpa-4" class="pts-col">3.7</h4>
    </div>

    <div class="table-row totals">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">Totals:</h4>
      <h4 id="total-credits" class="cred-col">25 credits</h4>
      <h4 class="lett-col"></h4>
      <h4 id="total-pts" class="pts-col">14.7</h4>
    </div>

    <div class="table-row gpa odd">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">GPA:</h4>
      <h4 class="cred-col"></h4>
      <h4 class="lett-col"></h4>
      <h4 id="gpa" class="pts-col">3.67</h4>               
    </div>
  </div>  
  `,
  "Winter Term": `
  <div id="report-card-table" class="report-card-table">
    <div class="table-row table-header">
      <h4 class="code-col">Code</h4>
      <h4 class="name-col">Name</h4>
      <h4 class="sem-col">Semester</h4>
      <h4 class="cred-col">Credits</h4>
      <h4 class="lett-col">Letter</h4>
      <h4 class="pts-col">Points</h4>               
    </div>  

    <div class="table-row even">
      <h4 class="code-col">LIT 101</h4>
      <h4 class="name-col">English Literature 101</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">B+</h4>
      <h4 id="gpa-1" class="pts-col">3.3</h4>
    </div>

    <div class="table-row odd">
      <h4 class="code-col">CS 50</h4>
      <h4 class="name-col">Intro to Computer Science</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">A-</h4>
      <h4 id="gpa-2" class="pts-col">3.7</h4>
    </div>

    <div class="table-row even">
      <h4 class="code-col">WD 140</h4>
      <h4 class="name-col">Modern Web Development</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">5</span> credits</h4>
      <h4 class="lett-col gpa">A+</h4>
      <h4 id="gpa-3" class="pts-col">4</h4>
    </div>

    <div class="table-row odd">
      <h4 class="code-col">JS 2.0</h4>
      <h4 class="name-col">Serverside JavaScript</h4>
      <h4 class="sem-col">Spring 2021</h4>
      <h4 class="cred-col"><span class="credit">10</span> credits</h4>
      <h4 class="lett-col gpa">A-</h4>
      <h4 id="gpa-4" class="pts-col">3.7</h4>
    </div>

    <div class="table-row totals">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">Totals:</h4>
      <h4 id="total-credits" class="cred-col">25 credits</h4>
      <h4 class="lett-col"></h4>
      <h4 id="total-pts" class="pts-col">14.7</h4>
    </div>

    <div class="table-row gpa odd">
      <h4 class="code-col"></h4>
      <h4 class="name-col"></h4>
      <h4 class="sem-col">GPA:</h4>
      <h4 class="cred-col"></h4>
      <h4 class="lett-col"></h4>
      <h4 id="gpa" class="pts-col">3.67</h4>               
    </div>
  </div>    
  `,
}

// TESTS

// Feature #1: Report card presents student information: name, grade, advisor, major, graduation year, and image. (User has updated report card)
// Original Data has not been edited
// User has filled out student information
// Run scripts on page load

// Feature #2: Each semester displays corresponding class including: class code, class name, semester, credits, and letter grade. (User has updated report card)
// User has updated report card headers
// The updateReportCard function runs all the other report card creation functions

// Feature #3: Grade dynamically changes and presents at least 3 semester options: fall, winter, and spring. (Drop down)
// Dropdown

describe("Report Card Generator", () => {
  describe("Feature #1: Report card presents student information: name, grade, advisor, major, graduation year, and image.", () => {
    describe("Original data has not been edited", () => {
      // ensure student course data object hasn't been modified
      it("The studentData object has not been modified", () => {
        // const terms = ["Spring Semester", "Fall Semester", "Winter Term"]
        for (const semester of availableSemesters) {
          for (let i = 0; i < originalData.studentData[semester].length; i++) {
            const course = originalData.studentData[semester][i]
            const courseKeys = Object.keys(course)
            courseKeys.forEach((key) => {
              assert(
                course[key] === studentData[semester][i][key],
                `Make sure not to edit the ${key} field for course ${course.code} located in the ${semester} property of the studentData object.`
              )
            })
          }
        }
      })

      it("The gpaPointsLookup object has not been modified", () => {
        const grades = Object.keys(originalData.gpaPointsLookup)
        grades.forEach((grade) => {
          assert(originalData.gpaPointsLookup[grade] === gpaPointsLookup[grade])
        })
      })
    })

    describe("User has filled out student information", () => {
      const infoFields = getUserInfoFields()

      for (const field of infoFields) {
        const { attr, originalText, label, fn, fnLabel, fieldName } = field
        const id = fieldName.replace("_", "-")
        const domElementId = `student-${id}`

        const studentFieldContent = studentInformation[attr]

        it(`The ${attr} property of the studentInformation object has been properly updated`, () => {
          assert(studentFieldContent !== null, `Student ${label} must not be null`)
          assert(typeof studentFieldContent !== "undefined", `Student ${label} must not be undefined`)
          assert(studentFieldContent?.length > 0, `Student ${label} must have length greater than 0`)
          assert(studentFieldContent !== originalText, `The ${originalText} placeholder must be replaced`)
          assert(studentFieldContent?.indexOf("_") === -1, `Student ${label} should not include underscores`)
          // should either be a number or not all caps
          if (stringIsNumericalDigitsOnly(studentFieldContent)) {
            // no test necessary in this case
          } else {
            assert(
              studentFieldContent?.toUpperCase() !== studentFieldContent,
              `Student ${label} should not be in all caps`
            )
          }
        })

        it(`The ${fnLabel} function can be used to update the DOM with the proper values.`, () => {
          const studentFieldEl = document.querySelector(`#${domElementId}`)

          assert(
            isDefined(studentFieldEl),
            `Make sure that the student ${label} dom element with an id of ${domElementId} exists in the 'index.html' file`
          )

          assert(
            typeof fn !== "undefined" && typeof fn === "function",
            `Ensure that the ${fnLabel} function is defined`
          )

          if (fnLabel === "updateStudentImage") {
            // actually test out the function here here
            const currentValue = studentFieldEl?.src
            // test that the function sets the right value
            fn(studentFieldContent)

            let imageHasValidSrc = false
            const srcIsAtLeast35Characters = studentFieldEl?.src?.length > 35
            const srcDoesntEndInTheWordImage = String(studentFieldEl?.src).endsWith("image") === false
            if (srcIsAtLeast35Characters) {
              imageHasValidSrc = true
            } else if (srcDoesntEndInTheWordImage) {
              imageHasValidSrc = true
            }
            assert(
              imageHasValidSrc,
              `The ${fnLabel} function does not currently replace the 'src' attribute of the image element. Got ${studentFieldEl?.src} and expected ${studentFieldContent}.`
            )

            // now set it back to the original value
            fn(currentValue)
          } else {
            // actually test out the function here here
            const currentValue = studentFieldEl?.textContent
            // test that the function sets the right value
            fn(studentFieldContent)

            assert(
              studentFieldEl?.textContent === studentFieldContent,
              `The ${fnLabel} function doesn't update the dom element with the id of ${domElementId}. Got ${studentFieldEl?.textContent} and expected ${studentFieldContent} for element with id of ${domElementId}.`
            )
            // now use a random value and make sure it actually uses its arguments
            const randomString = "something random"
            fn(randomString)
            assert(
              studentFieldEl?.textContent === randomString,
              `The ${fnLabel} function doesn't use its primary argument to update the dom element with the id of ${domElementId}`
            )
            // now set it back to the original value
            fn(currentValue)
          }
        })
      }
    })
  })

  describe("Feature #2: Each semester displays corresponding class including: class code, class name, semester, credits, and letter grade.", () => {
    const expectedHtml = getExpectedReportCardTableHtml()

    let tableDivElement = null

    beforeEach(() => {
      tableDivElement = createTableElement()
      document.body.appendChild(tableDivElement)
      // clear it out
      tableDivElement.innerHTML = ""
    })

    afterEach(() => {
      tableDivElement?.remove()
    })

    it("The `addReportCardHeaders` function correctly creates a row of table headers", () => {
      const tableDivElementId = tableDivElement.id

      // call function
      addReportCardHeaders(tableDivElement)
      // ensure that some HTML was created inside the correct element
      assert(
        isDefined(tableDivElement.innerHTML) && String(tableDivElement.innerHTML).trim() !== "",
        `No HTML was added to the 'reportCardTableElement' passed into the 'addReportCardHeaders' function`
      )
      // ensure that the wrapper row div is properly created
      const tableHeadersRowElement = document.querySelector(`#${tableDivElementId} .table-row`)
      assert(
        isDefined(tableHeadersRowElement) && tableHeadersRowElement.classList.contains("table-header"),
        `The HTML created inside of the 'reportCardTableElement' is missing a valid wrapper row div with classes of 'table-row' and 'table-header'`
      )
      // ensure that the results for each column is accurate
      const columns = [
        { className: "code-col", content: "Code" },
        { className: "name-col", content: "Name" },
        { className: "sem-col", content: "Semester" },
        { className: "cred-col", content: "Credits" },
        { className: "lett-col", content: "Letter" },
        { className: "pts-col", content: "Points" },
      ]
      for (const col of columns) {
        const { className, content } = col
        const columnElement = document.querySelector(`#${tableDivElementId} .table-header.table-row .${className}`)
        assert(
          isDefined(columnElement) && columnElement?.innerHTML === content,
          `The table header column for ${content} is either not created, has an incorrect class, or has incorrect innerHTML content.`
        )
      }
      // compare results to expected results
      assert(
        stripWhitespaceFromString(String(tableDivElement.innerHTML)) ===
          stripWhitespaceFromString(expectedHtml.addReportCardHeaders),
        `The HTML added by the 'addReportCardHeaders' function is incorrect or improperly formatted. Got ${String(
          tableDivElement.innerHTML
        ).trim()} and expected ${expectedHtml.addReportCardHeaders.trim()}`
      )
    })

    describe("Each of the table row DOM manipulation functions correctly modifies the report card table", () => {
      it("The `addCourseRowToReportCard` function adds the correct course row HTML to the report card table for a given course and row number", () => {
        const tableDivElementId = tableDivElement.id

        // for each semester
        for (const semester of availableSemesters) {
          // get the courses
          const courses = originalData.studentData[semester]
          // create a course row for each course
          courses.forEach((course, rowNum) => addCourseRowToReportCard(tableDivElement, course, rowNum))
          // check to ensure that a row for each course is there
          const rowNodeList = document.querySelectorAll(`#${tableDivElementId} .table-row.course-row`)
          assert(
            isDefined(rowNodeList) && rowNodeList?.length === courses.length,
            `The 'addCourseRowToReportCard' function did not add the correct number course rows to the table div element, or the rows did not have the correct class names, or they were improperly formatted. Expected ${
              courses.length
            } rows and found ${rowNodeList?.length ?? 0}.`
          )
          // check that each row has some content in it
          for (const node of [...rowNodeList]) {
            assert(
              isDefined(node.innerHTML) && String(node.innerHTML).trim() !== "",
              `One or more of the rows generated by the 'addCourseRowToReportCard' function contained no HTML content.`
            )
          }
          // check to ensure that at least one row is odd
          let oddRowFound = false
          for (const node of [...rowNodeList]) {
            if (node.classList.contains("odd")) {
              oddRowFound = true
            }
          }
          assert(
            oddRowFound,
            `No row with the 'odd' class name was found in the row elements added to the table div element.`
          )

          // check to ensure that the row numbers are correct
          for (let rowNum = 0; rowNum < rowNodeList.length; rowNum++) {
            const rowNode = rowNodeList[rowNum]
            let rowNumberWord = "first"
            if (rowNum > 0) rowNumberWord = "second"
            if (rowNum > 1) rowNumberWord = "third"
            if (rowNum > 2) rowNumberWord = "fourth"
            if (rowNum > 3) rowNumberWord = "fifth"
            if (rowNum > 4) rowNumberWord = "sixth"
            assert(
              rowNode.classList.contains(`row-${rowNum + 1}`),
              `The ${rowNumberWord} row down had an incorrect class name representing its row number. Expected 'row-${
                rowNum + 1
              }' to exist in classList of [${[...rowNode.classList].join(", ")}].`
            )
          }

          // check to ensure that code, name, grade, and semester columns have the correct content
          courses.forEach((course, rowNum) => {
            const columns = [
              { className: "code-col", content: course.code, label: "Code" },
              { className: "name-col", content: course.name, label: "Name" },
              { className: "sem-col", content: course.semester, label: "Semester" },
              { className: "lett-col", content: course.grade, label: "Grade" },
            ]

            for (const col of columns) {
              const { className, content, label } = col
              const columnElements = document.querySelectorAll(
                `#${tableDivElementId} .table-row.course-row .${className}`
              )
              const columnElement = columnElements[rowNum]
              assert(
                isDefined(columnElement) && columnElement?.innerHTML?.trim() === content,
                `The table column for ${label} in the ${semester} semester is either not created, uses an incorrect class, or has incorrect innerHTML content. Got ${
                  columnElement?.innerHTML?.trim() ?? "null"
                } and expected ${content}.`
              )
            }

            // check to ensure that the credit column has
            //      - an additional element inside it with the className of "credit"
            //      - and that it contains the correct number of credits with a space and then the word credits
            const creditsColumnElements = document.querySelectorAll(
              `#${tableDivElementId} .table-row.course-row .cred-col`
            )
            const creditsColumnElement = creditsColumnElements[rowNum]
            assert(
              isDefined(creditsColumnElement),
              `The credits table column in the ${semester} semester could not be located. It is either not created or uses an incorrect class.`
            )
            assert(
              creditsColumnElement?.innerHTML.includes(" credits"),
              `The credits table column in the ${semester} semester did not label the number of credits correctly. For example, it should be formatted like this: '10 credits' but without the quotations.`
            )
            const creditsColumnInnerElements = document.querySelectorAll(
              `#${tableDivElementId} .table-row.course-row .cred-col .credit`
            )
            const creditsColumnInnerElement = creditsColumnInnerElements[rowNum]
            assert(
              isDefined(creditsColumnInnerElement) &&
                String(creditsColumnInnerElement.innerHTML).trim() === String(course.credits).trim(),
              `The credits table column in the ${semester} semester does not include a child element with class="credits" or the innerHTML content for that element is incorrect. Got content ${
                creditsColumnInnerElement?.innerHTML ?? "null"
              } and expected ${course.credits}.`
            )
            // check that the `pts` column has a '?' for content (actually NO, don't do that. Just check that it exists)
            const ptsColumnElements = document.querySelectorAll(`#${tableDivElementId} .table-row.course-row .pts-col`)
            const ptsColumnElement = ptsColumnElements[rowNum]
            assert(
              isDefined(ptsColumnElement),
              `The points table column in the ${semester} semester could not be located. It is either not created or uses an incorrect class.`
            )
            // check to ensure that the gpa id matches the rowNum + 1
            assert(
              ptsColumnElement.id === `gpa-${rowNum + 1}`,
              `The points table column in the ${semester} semester did not have the correct id. It should be equal to the row number plus 1.`
            )
          })

          // clear the inner html before going to the next semester
          tableDivElement.innerHTML = ""
        }
      })

      it("The `addTotalsRow` function adds the correct HTML to construct the total row inside the report card table element.", () => {
        const tableDivElementId = tableDivElement.id

        // call function
        addTotalsRow(tableDivElement)
        // ensure that some HTML was created inside the correct element
        assert(
          isDefined(tableDivElement.innerHTML) && String(tableDivElement.innerHTML).trim() !== "",
          `No HTML was added to the 'reportCardTableElement' passed into the 'addTotalsRow' function`
        )
        // ensure that the wrapper row div is properly created
        const tableTotalsRowElement = document.querySelector(`#${tableDivElementId} .table-row.totals`)
        assert(
          isDefined(tableTotalsRowElement) && tableTotalsRowElement.classList.contains("totals"),
          `The HTML created inside of the 'reportCardTableElement' is missing a valid wrapper row div with classes of 'table-row' and 'totals'`
        )
        // ensure that the results for each column is accurate
        const columns = [
          { className: "code-col", content: "", label: "Code" },
          { className: "name-col", content: "", label: "Name" },
          { className: "sem-col", content: "Totals:", label: "Semester" },
          { className: "lett-col", content: "", label: "Grade" },
        ]
        for (const col of columns) {
          const { className, content, label } = col
          const columnElement = document.querySelector(`#${tableDivElementId} .table-row.totals .${className}`)
          assert(
            isDefined(columnElement) && columnElement?.innerHTML?.trim() === content,
            label === "Semester"
              ? `The table column for Semester is either not created, has an incorrect class, or does not contain the content 'Totals:'.`
              : `The table column for ${label} is either not created, has an incorrect class, or has content when it should contain nothing.`
          )
        }
      })

      it("The `addGpaRow` function adds the correct HTML to construct the GPA row inside the report card table element.", () => {
        const tableDivElementId = tableDivElement.id

        // call function
        addGpaRow(tableDivElement)
        // ensure that some HTML was created inside the correct element
        assert(
          isDefined(tableDivElement.innerHTML) && String(tableDivElement.innerHTML).trim() !== "",
          `No HTML was added to the 'reportCardTableElement' passed into the 'addGpaRow' function`
        )
        // ensure that the wrapper row div is properly created
        const tableGpaRowElement = document.querySelector(`#${tableDivElementId} .table-row.gpa`)
        assert(
          isDefined(tableGpaRowElement) && tableGpaRowElement.classList.contains("gpa"),
          `The HTML created inside of the 'reportCardTableElement' is missing a valid wrapper row div with classes of 'table-row' and 'gpa'`
        )
        // ensure that the results for each column is accurate
        const columns = [
          { className: "code-col", content: "", label: "Code" },
          { className: "name-col", content: "", label: "Name" },
          { className: "sem-col", content: "GPA:", label: "Semester" },
          { className: "lett-col", content: "", label: "Grade" },
        ]
        for (const col of columns) {
          const { className, content, label } = col
          const columnElement = document.querySelector(`#${tableDivElementId} .table-row.gpa .${className}`)
          assert(
            isDefined(columnElement) && columnElement?.innerHTML?.trim() === content,
            label === "Semester"
              ? `The table column for Semester is either not created, has an incorrect class, or does not contain the content 'GPA:'.`
              : `The table column for ${label} is either not created, has an incorrect class, or has content when it should contain nothing.`
          )
        }
      })
    })

    describe("The `updateReportCard` function runs all the other report card creation functions", () => {
      const sandbox = chai.spy.sandbox()

      let addReportCardHeadersSpy = null
      let addCourseRowToReportCardSpy = null
      let addTotalsRowSpy = null
      let addGpaRowSpy = null

      beforeEach(() => {
        // spy on functions
        addReportCardHeadersSpy = sandbox.on(window, "addReportCardHeaders")
        addCourseRowToReportCardSpy = sandbox.on(window, "addCourseRowToReportCard")
        addTotalsRowSpy = sandbox.on(window, "addTotalsRow")
        addGpaRowSpy = sandbox.on(window, "addGpaRow")
      })

      afterEach(() => {
        sandbox.restore()
      })

      it("Calls the 'addReportCardHeadersSpy' function with the proper arguments", () => {
        //
        for (const semester of availableSemesters) {
          tableDivElement.innerHTML = ""
          updateReportCard(tableDivElement, semester)

          assert(
            addReportCardHeadersSpy.__spy.calls[0][0] === tableDivElement,
            `The 'updateReportCard' function did not call the 'addReportCardHeadersSpy' function with the table div element.`
          )
        }
      })

      it("Calls the 'addCourseRowToReportCard' function with the proper arguments", () => {
        //
        for (let i = 0; i < availableSemesters.length; i++) {
          const semester = availableSemesters[i]
          tableDivElement.innerHTML = ""
          updateReportCard(tableDivElement, semester)

          assert(
            addCourseRowToReportCardSpy.__spy.called,
            `The 'updateReportCard' function did not call the 'addCourseRowToReportCard' function.`
          )

          for (let j = 0; j < originalData.studentData[semester]; j++) {
            const course = originalData.studentData[semester][j]
            assert(
              addCourseRowToReportCardSpy.__spy.calls[i][0] === tableDivElement &&
                addCourseRowToReportCardSpy.__spy.calls[i][1] === course &&
                addCourseRowToReportCardSpy.__spy.calls[i][2] === j,
              `The 'updateReportCard' function did not call the 'addCourseRowToReportCard' function with the table div element, course, and row number.`
            )
          }
        }
      })

      it("Calls the 'addTotalsRow' function with the proper arguments", () => {
        //
        for (const semester of availableSemesters) {
          tableDivElement.innerHTML = ""
          updateReportCard(tableDivElement, semester)

          assert(
            addTotalsRowSpy.__spy.calls[0][0] === tableDivElement,
            `The 'updateReportCard' function did not call the 'addTotalsRow' function with the table div element.`
          )
        }
      })

      it("Calls the 'addGpaRow' function with the proper arguments", () => {
        //
        for (const semester of availableSemesters) {
          tableDivElement.innerHTML = ""
          updateReportCard(tableDivElement, semester)

          assert(
            addGpaRowSpy.__spy.calls[0][0] === tableDivElement,
            `The 'updateReportCard' function did not call the 'addGpaRow' function with the table div element.`
          )
        }
      })
    })
  })

  describe("Feature #3: Grade dynamically changes and presents at least 3 semester options: fall, winter, and spring.", () => {
    describe("Dropdown", () => {
      const sandbox = chai.spy.sandbox()

      let dropdownWrapperDivElement = null
      let dropdownNodeReferences = null
      let openDropdownSpy = null
      let closeDropdownSpy = null
      let updateReportCardSpy = null
      let tableDivElement = null

      beforeEach(() => {
        tableDivElement = createTableElement()
        document.body.appendChild(tableDivElement)
        // clear it out
        tableDivElement.innerHTML = ""

        dropdownWrapperDivElement = createDropdownElement()
        dropdownNodeReferences = getDropdownElementNodes()
        openDropdownSpy = sandbox.on(window, "openDropdown")
        closeDropdownSpy = sandbox.on(window, "closeDropdown")
        updateReportCardSpy = sandbox.on(window, "updateReportCard")
      })

      afterEach(() => {
        tableDivElement?.remove()
        dropdownWrapperDivElement?.remove()
        dropdownNodeReferences = null
        sandbox.restore()
      })

      it("A click event handler is attached to the dropdown button that opens the dropdown when first clicked using the `openDropdown` function.", () => {
        const {
          dropdownElement,
          dropdownButtonElement,
          fallSemesterElement,
          springSemesterElement,
          winterTermElement,
        } = dropdownNodeReferences ?? {}

        // attach event listeners
        try {
          addEventListeners(
            dropdownElement,
            dropdownButtonElement,
            tableDivElement,
            fallSemesterElement,
            springSemesterElement,
            winterTermElement
          )
        } catch (e) {}

        // should be closed
        dropdownElement.classList.add("closed")
        const dropdownElementIsClosedBefore = dropdownElement.classList.contains("closed")
        // click
        const clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
        dropdownButtonElement.dispatchEvent(clickEvent)

        const openDropdownWasCalled = Boolean(openDropdownSpy.__spy.called)
        const firstOpenDropdownCallArguments = openDropdownSpy.__spy.calls[0]

        assert(
          openDropdownWasCalled && firstOpenDropdownCallArguments[0] === dropdownElement,
          "The `openDropdown` function was not called when the dropdown button element was clicked on. Make sure to add an event listener to the button that handles clicks."
        )

        const dropdownElementIsClosedAfter = dropdownElement.classList.contains("closed")

        assert(
          dropdownElementIsClosedBefore !== dropdownElementIsClosedAfter,
          "The `firstOpenDropdownCallArguments` is not correctly opening the dropdown. Make sure to remove the 'closed' class from the element."
        )
      })

      it("Click event handlers are attached to the dropdown spans associated with each semester. When any of the dropdown menu items are clicked the event listener callback should change the `semester` variable to the correct semester, call the `updateReportCard` function, and finally close the dropdown by calling the `closeDropdown` function.", () => {
        const {
          dropdownElement,
          dropdownButtonElement,
          fallSemesterElement,
          springSemesterElement,
          winterTermElement,
        } = dropdownNodeReferences ?? {}

        try {
          addEventListeners(
            dropdownElement,
            dropdownButtonElement,
            tableDivElement,
            fallSemesterElement,
            springSemesterElement,
            winterTermElement
          )
        } catch (e) {}

        // open menu
        dropdownElement.classList.remove("closed")

        const semesterElementInfo = [
          { dropdownValue: "Winter Term", elementLabel: "winterTermElement", element: winterTermElement },
          { dropdownValue: "Spring Semester", elementLabel: "springSemesterElement", element: springSemesterElement },
          { dropdownValue: "Fall Semester", elementLabel: "fallSemesterElement", element: fallSemesterElement },
        ]
        for (let i = 0; i < semesterElementInfo.length; i++) {
          const info = semesterElementInfo[i]
          const { dropdownValue, element, elementLabel } = info
          element.click()
          assert(
            semester === dropdownValue,
            "The event listener on the `" +
              elementLabel +
              "` needs to update the semester variable to '" +
              dropdownValue +
              "'"
          )

          assert(
            updateReportCardSpy.__spy.calls[i][1] === dropdownValue,
            "The event listener on the `" + elementLabel + "` needs to call the `updateReportCard` function"
          )

          const allArgs = closeDropdownSpy.__spy.calls.flat().flat()
          const uniqArgs = [...new Set(allArgs)]
          assert(
            uniqArgs[0] === dropdownElement,
            "The event listener on the `" +
              elementLabel +
              "` needs to close the dropdown when it is finished executing."
          )
          dropdownElement.classList.remove("closed")
        }
      })
    })
  })

  describe("Run Scripts on Page Load", () => {
    const sandbox = chai.spy.sandbox()
    // - Inside the `window.onload = function ()` block,
    //   add whatever functions should be run on page load to complete your report card generator!

    afterEach(() => {
      sandbox.restore()
    })

    it("Calls the correct functions to start up the application", () => {
      const populateStudentInfoSpy = sandbox.on(window, "populateStudentInfo")
      const updateReportCardSpy = sandbox.on(window, "updateReportCard")
      const addEventListenersSpy = sandbox.on(window, "addEventListeners")
      // make sure populate student info is called with the studentInformation object
      // make sure update report card is called with the report card table element
      window.onload()

      assert(
        addEventListenersSpy.__spy.called,
        "The `window.onload` callback function isn't executing the 'addEventListeners' function."
      )
      assert(
        populateStudentInfoSpy.__spy.called,
        "The `window.onload` callback function isn't executing the 'populateStudentInfoSpy' function."
      )
      assert(
        updateReportCardSpy.__spy.called,
        "The `window.onload` callback function isn't executing the 'updateReportCardSpy' function."
      )
    })
  })

  describe("Stretch Features", () => {
    //   Stretch Features
    //   Report card calculates GPA automatically. (GPA Calculations)

    describe("Report card calculates GPA automatically from values in the DOM", () => {
      const sandbox = chai.spy.sandbox()
      // - Use additional query selectors to access the credits the student has earned for each course. Add them up and display the total in the proper location.
      // - Use query selectors to access the letter grades for each course and convert them to GPA points using the `pointsLookup` object.
      // - Then perform a quick calculation and update the report card with the total points and cumulative grade point average for the semester.
      // - Update the `addUpStudentCredits` and `calculateSemesterGpa` functions to store procedures for these updates. Then make sure to call them at the end of the `updateReportCard` function. Also ensure that the `updateReportCard` function is called as soon as the page loads.

      let tableDivElement = null

      beforeEach(() => {
        tableDivElement = createTableElement()
        document.body.appendChild(tableDivElement)
        // clear it out
        tableDivElement.innerHTML = ""
        updateReportCard(tableDivElement, semester)
      })

      afterEach(() => {
        tableDivElement?.remove()
        sandbox.restore()
      })

      it("The `addUpStudentCredits` function extracts the credit values from the raw DOM elements, converts them to numbers, adds them up, and inserts the total value in the correct spot", () => {
        // make sure it works normally
        // modify a few DOM credit values and make sure they're extracting the values from the DOM and not hardcoding them in

        const totalCreditsEmbeddedInDomEl = tableDivElement.querySelector("#total-credits")
        const originalValue = totalCreditsEmbeddedInDomEl.innerHTML

        // call the function
        addUpStudentCredits(tableDivElement)
        let expectedTotal = null
        if (semester === "Spring Semester") {
          expectedTotal = 25
        } else if (semester === "Fall Semester") {
          expectedTotal = 20
        } else {
          expectedTotal = 15
        }

        assert(
          totalCreditsEmbeddedInDomEl.innerHTML?.trim() === `${expectedTotal} credits`,
          "The `addUpStudentCredits` function did not correctly tally up the total number of student credits, or it did not update the DOM correctly with the calculated information. Expected to see `" +
            expectedTotal +
            " credits` and instead saw " +
            String(totalCreditsEmbeddedInDomEl.innerHTML)
        )

        // NOW WE MODIFY THE DOM AND MAKE SURE THE CALCULATIONS STILL WORK, OTHERWISE THEY"RE HARDCODING

        // now reset
        totalCreditsEmbeddedInDomEl.innerHTML = originalValue
      })

      it("The `calculateSemesterGpa` function extracts the letter grades value from the raw DOM elements, converts them to numbers using the `pointsLookup` object, and inserts the total value in the correct spot", () => {
        // make sure it works normally
        // modify a few DOM credit values and make sure they're extracting the values from the DOM and not hardcoding them in
        const totalPointsDomContentElement = tableDivElement.querySelector("#total-pts")
        const originalTotalPoints = totalPointsDomContentElement.innerHTML
        const cumulativeGpaDomContentElement = tableDivElement.querySelector("#gpa")
        const originalCumulativeGpa = cumulativeGpaDomContentElement.innerHTML

        calculateSemesterGpa(tableDivElement)

        let totalPoints = null
        let expectedGpa = null
        if (semester === "Spring Semester") {
          totalPoints = 14.7
          expectedGpa = Number(totalPoints / 4).toFixed(2)
        } else if (semester === "Fall Semester") {
          totalPoints = 15.4
          expectedGpa = Number(totalPoints / 4).toFixed(2)
        } else {
          expectedTotal = 7.7
          expectedGpa = Number(totalPoints / 2).toFixed(2)
        }

        const totalPointsDomContent = totalPointsDomContentElement.innerHTML
        assert(
          totalPointsDomContent === `${totalPoints}`,
          "The `calculateSemesterGpa` function did not correctly tally up the total number of student points, or it did not update the DOM correctly with the calculated information. Expected to see `" +
            totalPoints +
            "` and instead saw " +
            String(totalPointsDomContent)
        )
        const cumulativeGpaDomContent = cumulativeGpaDomContentElement.innerHTML
        assert(
          cumulativeGpaDomContent === `${expectedGpa}`,
          "The `calculateSemesterGpa` function did not correctly calculate the cumulative GPA, or it did not update the DOM correctly with the calculated information. Expected to see `" +
            expectedGpa +
            "` and instead saw " +
            String(cumulativeGpaDomContent)
        )

        // NOW WE MODIFY THE DOM AND MAKE SURE THE CALCULATIONS STILL WORK, OTHERWISE THEY"RE HARDCODING

        // now reset
        totalPointsDomContentElement.innerHTML = originalTotalPoints
        cumulativeGpaDomContentElement.innerHTML = originalCumulativeGpa
      })

      it("The `updateReportCard` calls both the  `addUpStudentCredits` and `calculateSemesterGpa` functions at the end of the function body.", () => {
        // spy on both functions and make sure they're called
        const addUpStudentCreditsSpy = sandbox.on(window, "addUpStudentCredits")
        const calculateSemesterGpaSpy = sandbox.on(window, "calculateSemesterGpa")

        updateReportCard(tableDivElement, semester)

        assert(
          addUpStudentCreditsSpy.__spy.called,
          "The `updateReportCard` did not call the `addUpStudentCredits` function"
        )
        assert(
          calculateSemesterGpaSpy.__spy.called,
          "The `updateReportCard` did not call the `calculateSemesterGpa` function"
        )
      })
    })
  })
})
