# Report Card Generator Lab - Simple Bugs

## Bug #1
Checkout branch `bug_1`
Bug: Report card is not displaying the student image
Solution: The JS selector is not picking up the correct HTML element (update line 67 to select the `img` element, not the container `div`)

## Bug #2
Checkout branch `bug_2`
Bug: Report card doesn't load properly; the console reads `Uncaught ReferenceError: i is not defined`
Solution: (line 243) Update the forEach to include the argument `i` (index)

## Bug #3
Checkout branch `bug_3`
Bug: Report card doesn't load properly; the console reads `Uncaught ReferenceError: code is not defined`
Solution: Update the template literals in the `addCourseRowToReportCard()` function (update from class names to expressions)

## Bug #4
Checkout branch `bug_4`
Bug: Student needs help implementing the stretch feature
Solution: Refer to exemplar code if needed
