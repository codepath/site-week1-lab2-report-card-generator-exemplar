# Report Card Generator Lab - Simple Bugs

## Bug #1
BUG: Report card is not displaying the student image
<br>
<details><summary>SOLUTION</summary>
<p>The JS selector is not picking up the correct HTML element. Update line 67 to select the `img` element, not the container `div`</p>
</details>

## Bug #2
Checkout branch `bug_2`
<br>
<br>
<b>Bug</b>: Report card doesn't load properly; the console reads `Uncaught ReferenceError: i is not defined`
<br>
<b>Solution</b>: Update the forEach to include the argument `i` (index)

## Bug #3
Checkout branch `bug_3`
<br>
<br>
<b>Bug</b>: Report card doesn't load properly; the console reads `Uncaught ReferenceError: code is not defined`
<br>
<b>Solution</b>: Update the template literals in the `addCourseRowToReportCard()` function (change from class names to expressions)

## Bug #4
Checkout branch `bug_4`
<br>
<br>
<b>Bug</b>: Student needs help implementing the stretch feature
<br>
<b>Solution</b>: Refer to exemplar code if needed
