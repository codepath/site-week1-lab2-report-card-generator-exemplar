# Report Card Generator Lab - Simple Bugs

## Bug #1
<b>Bug</b>: Report card is not displaying the student image
<br>
<details><summary>SOLUTION</summary>
<br>
<p>The JS selector is not picking up the correct HTML element. Update line 67 to select the `img` element, not the container `div`</p>
</details>

## Bug #2
<b>Bug</b>: Report card doesn't load properly; the console reads `Uncaught ReferenceError: i is not defined`
<br>
<details><summary>SOLUTION</summary>
<br>
<p>Update the forEach to include the argument `i` (index)</p>
</details>

## Bug #3
<b>Bug</b>: Report card doesn't load properly; the console reads `Uncaught ReferenceError: code is not defined`
<br>
<details><summary>SOLUTION</summary>
<br>
<p>Update the template literals in the `addCourseRowToReportCard()` function (change from class names to expressions)</p>
</details>

## Bug #4
<b>Bug</b>: Student needs help implementing the stretch feature
<br>
<details><summary>SOLUTION</summary>
<br>
<p>Refer to exemplar code if needed</p>
</details>
