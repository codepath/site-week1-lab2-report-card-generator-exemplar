# Report Card Generator Lab

Your college has realized their report card generating system is broken! They've reached out to Site to see if interns would be willing to help them fix it.

At the moment they have the styling and general layout fixed, but they're missing valid JavaScript. Your job is to modify the `script.js` file with code that produces a working report card generator. They've sent over your grades for the year to use as a model.

## Goals

Here are the goals they've outlined for their report card generator:

### Query Selectors

- Fill in the `studentInformation` with all of your student information.
- Use `document.querySelector` to save references to various HTML elements on the page. Those elements should include:
  - The student name `span`
  - The student advisor `span`
  - The student major `span`
  - The student grade `span`
  - The student graduation year `span`
  - The student-image `img`
  - The semester dropdown `div`
  - The semester dropdown `h2` button
  - The semester dropdown label `span`
  - The "fall-semester" `span` in the dropdown menu
  - The "spring-semester" `span` in the dropdown menu
  - The "winter-term" `span` in the dropdown menu
  - The "report-card-table" `div`
  - A few others...

Example:

```js
const dropdown = document.querySelector(".dropdown")
```

### Enter Student Info

- Use the `studentInformation` object and update the inner html of student info section with your user data. Use the following functions to complete this section:
  - `updateStudentName`
  - `updateStudentGradeLevel`
  - `updateStudentAdvisor`
  - `updateMajor`
  - `updateStudentGraduationYear`
  - `updateStudentImage`

Example:

```js
function updateStudentName(studentName) {
  studentNameElement.innerHTML = studentName
}
```

### Update Report Card

- Fill in the functions for updating the report card table with the proper html. Each function should add to the inner HTML of the `report-card-table` element.
- It might be useful to start by looking at the functions that will be used to recreate the table:
  - `addReportCardHeaders`
  - `addCourseRowToReportCard`
  - `addTotalsRow`
  - `addGpaRow`
- Each of these will be responsible for creating the HTML for different sections of the table, and then inserting them into the `#report-card-table` div. Make sure to use the already existing HTML as a guide (in some cases you'll barely need to change anything!).
- Once you've finished writing those functions, make sure to call them from within the `updateReportCard` function with the appropriate course for the current semester. Remember that the current semester is stored in the `semester` variable!

### Dropdown

- Add a `click` event listener to the dropdown button that toggles the dropdown using the `toggleDropdown` function. This should open or close the dropdown menu.
- Add `click` event listeners to each of these three items:
  - fall-semester span
  - spring-semester span
  - winter-term span
- When any of the dropdown menu items are clicked the event listener callback should change the `semester` variable to the correct semester, call the `updateReportCard` function, and finally call the `toggleDrodpown` function.
- Modify the `updateDropdownLabel` function so that the inner HTML of the dropdown label is set to the value of the `semester` variable.

When this section is complete, you should be able to click on a new semester in the dropdown and see an entirely different set of courses, grades, and info in the report card table.

### GPA Calculations

- Use additional query selectors to access the credits the student has earned for each course. Add them up and display the total in the proper location.
- Use query selectors to access the letter grades for each course and convert them to GPA points using the `pointsLookup` object.
- Then perform a quick calculation and update the report card with the total points and cumulative grade point average for the semester.
- Update the `addUpStudentCredits` and `calculateSemesterGpa` functions to store procedures for these updates. Then make sure to call them at the end of the `updateReportCard` function. Also ensure that the `updateReportCard` function is called as soon as the page loads.

### Sneaky Extras

- That English Literature grade is keeping us from all A's! Let's see if we can't update that to an A- since we definitely deserve it after a hard semester of work. Use query selectors and inner HTML to update that after all other updates have been run. DONT CHANGE THE GRADES OBJECT ITSELF!

### Run Scripts on Page Load

- Inside the `window.onload = function ()` block, add whatever functions should be run on page load to complete your report card generator!

## Tests

Automated tests will run each time you save your work. Update the `script.js` file until all the tests are passing and you have 30 green checkmarks!

## Resources

- MDN query selector [docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- MDN query selector all [docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
- MDN classList [docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- MDN event listener [docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- MDN innerHTML [docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- MDN setAttribute [docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- MDN window onload [docs](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
