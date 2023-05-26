# Report Card Generator Lab - Simple Bugs

## Bug #1
Checkout branch `bug_1`
<br>
<br>
Bug: Report card is not displaying the student image
<br>
<br>
Solution: The JS selector is not picking up the correct HTML element (update line 67 to select the `img` element, not the container `div`)

## Bug #2
Checkout branch `bug_2`
<br>
<br>
Bug: Report card doesn't load properly; the console reads `Uncaught ReferenceError: i is not defined`
<br>
<br>
Solution: (line 243) Update the forEach to include the argument `i` (index)

## Bug #3
Checkout branch `bug_3`
<br>
<br>
Bug: Report card doesn't load properly; the console reads `Uncaught ReferenceError: code is not defined`
<br>
<br>
Solution: Update the template literals in the `addCourseRowToReportCard()` function (update from class names to expressions)

## Bug #4
Checkout branch `bug_4`<br>
<br>
<br>
Bug: Student needs help implementing the stretch feature<br>
<br>
<br>
Solution: Refer to exemplar code if needed
