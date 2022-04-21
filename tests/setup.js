const testingLibraryPkg = "https://unpkg.com/@testing-library/dom@8.11.3/dist/@testing-library/dom.umd.js"
const chaiPkg = "https://unpkg.com/chai/chai.js"
const chaiSpiesPkg = "https://unpkg.com/chai-spies@1.0.0/chai-spies.js"
const mochaPkg = "https://unpkg.com/mocha/mocha.js"
const mochaCssPkg = "https://unpkg.com/mocha/mocha.css"
const testsScriptName = "test-report-card.js"
const testsScriptPath = `tests/${testsScriptName}`

function createScript(src, content) {
  const scriptEl = document.createElement("script")
  if (src) scriptEl.src = src
  scriptEl.setAttribute("type", "text/javascript")
  if (content) {
    const inlineScript = document.createTextNode(content)
    scriptEl.appendChild(inlineScript)
  }

  return scriptEl
}

function postExecuteMonkeyPatchMocha() {
  const mochaStatsMenu = document.querySelector("#mocha-stats")
  const reportElement = document.querySelector("#mocha-report")
  // reportElement.classList.add("hidden")
  const toggleButton = document.createElement("li")
  toggleButton.setAttribute("role", "button")
  toggleButton.id = "mocha-report-toggle-button"
  toggleButton.innerHTML = `<span>toggle report</span>`
  toggleButton.addEventListener("click", () => {
    reportElement.classList.toggle("hidden")
  })
  mochaStatsMenu.appendChild(toggleButton)
}

function executeTestRunner(inlineTestRunScript = "mocha.run()") {
  const body = document.querySelector("body")
  // execute tests
  const runTestsScriptEl = createScript(null, inlineTestRunScript)
  runTestsScriptEl.classList.add("tests-exec")
  body.append(runTestsScriptEl)

  postExecuteMonkeyPatchMocha()
}

function monkeyPatchMochaCss() {
  const head = document.querySelector("head")

  const styleElement = document.createElement("style")
  styleElement.innerHTML = `
    #mocha-stats {
      border-radius: 4px;
      background: white;
    }
    #mocha-report .suite {
      background: #ababb7;
      border-radius: 4px;
      padding: 0.5rem 1rem;
    }
    #mocha-report.hidden {
      display: none;
    }
    #mocha-report {
      position: absolute;
      left: 0;      
      top: 15px;
      right: 15px;
    }
    #mocha-report-toggle-button {
      cursor: pointer;
    }
    #mocha-report-toggle-button:hover {
      text-decoration: underline
    } 
    #mocha-report-toggle-button:active {
      transform: translateY(1px);
    }        
  `
  head.appendChild(styleElement)
}

function monkeyPatchMocha() {
  /**
   * Adds code toggle functionality for the provided test's list element.
   *
   * @param {HTMLLIElement} el
   * @param {string} contents
   */
  // console.log({ mocha })
  const HTMLReporter = mocha._reporter
  HTMLReporter.prototype.addCodeToggle = function (el, contents) {
    // do nothing so that underlying code
    // var h2 = el.getElementsByTagName('h2')[0];
    // on(h2, 'click', function () {
    //   pre.style.display = pre.style.display === 'none' ? 'block' : 'none';
    // });
    // var pre = fragment('<pre><code>%e</code></pre>', utils.clean(contents));
    // el.appendChild(pre);
    // pre.style.display = 'none';
  }
}

function setupMocha() {
  const body = document.querySelector("body")

  // setup mocha
  const setupScriptEl = createScript()
  body.append(setupScriptEl)

  const inlineMochaSetupScript = `
    mocha.setup("bdd")
    mocha.checkLeaks()
    monkeyPatchMocha()
  `
  const inlineScript = document.createTextNode(inlineMochaSetupScript)
  setupScriptEl.appendChild(inlineScript)

  setupScriptEl.classList.add("mocha-init")
}

function setupAndLoadTests({ onloadCallback = () => {} }) {
  const body = document.querySelector("body")

  // setup mocha
  setupMocha()

  const testsScriptEl = createScript(testsScriptPath)
  body.append(testsScriptEl)
  testsScriptEl.onload = () => {
    onloadCallback()
  }
}

function loadCssFiles({ cssUrlsToLoad = [] }) {
  const head = document.querySelector("head")

  while (cssUrlsToLoad.length) {
    const linkElement = document.createElement("link")
    linkElement.setAttribute("rel", "stylesheet")
    linkElement.setAttribute("href", cssUrlsToLoad.shift())
    head.appendChild(linkElement)
  }

  monkeyPatchMochaCss()
}

function loadScripts({ scriptUrlsToLoad = [], onloadCallback = () => {} }) {
  const body = document.querySelector("body")
  let lastScriptElement = null

  const loadScriptsRecursively = () => {
    const finalOnLoadCallback = () => {
      loadScriptsRecursively()
      onloadCallback()
    }

    const scriptUrl = scriptUrlsToLoad.length ? scriptUrlsToLoad.shift() : null
    if (scriptUrl) {
      lastScriptElement = createScript(scriptUrl)
      body.appendChild(lastScriptElement)
      lastScriptElement.onload = () =>
        Boolean(scriptUrlsToLoad.length) ? loadScriptsRecursively() : finalOnLoadCallback()
    }
  }

  loadScriptsRecursively()
}

function loadTestingLibraries({ onloadCallback = () => {} }) {
  const onloadCallbackWithCss = () => {
    loadCssFiles({ cssUrlsToLoad: [mochaCssPkg] })
    onloadCallback()
  }

  loadScripts({
    scriptUrlsToLoad: [testingLibraryPkg, chaiPkg, chaiSpiesPkg, mochaPkg],
    onloadCallback: () => onloadCallbackWithCss(),
  })
}

function runTestSuite(reportElementId = "mocha") {
  const body = document.querySelector("body")
  // create report div
  const reportDivEl = document.createElement("div")
  // reportDivEl.setAttribute("id", "test-report")
  reportDivEl.setAttribute("id", reportElementId)
  body.appendChild(reportDivEl)

  // we load the testing libraries
  loadTestingLibraries({
    // then we ensure all setup has occured
    onloadCallback: () =>
      setupAndLoadTests({
        // and we run our test suite for this lab
        onloadCallback: () => executeTestRunner(),
      }),
  })
}

// actually run the setup function
runTestSuite()

// function createScript(src, content) {
//   const scriptEl = document.createElement("script")
//   if (src) scriptEl.src = src
//   scriptEl.setAttribute("type", "text/javascript")
//   if (content) {
//     const inlineScript = document.createTextNode(content)
//     scriptEl.appendChild(inlineScript)
//   }

//   return scriptEl
// }

// function executeMochaTestRunner() {
//   const body = document.querySelector("body")
//   // execute mocha
//   const runMochaScriptEl = createScript(null, `mocha.run()`)
//   runMochaScriptEl.classList.add("mocha-exec")
//   body.append(runMochaScriptEl)
// }

// function setupAndLoadTests({ onloadCallback = () => {} }) {
//   const body = document.querySelector("body")

//   // setup mocha
//   const setupMochaScriptEl = createScript()
//   body.append(setupMochaScriptEl)

//   const inlineMochaSetupScript = `
//     mocha.setup("bdd")
//     mocha.checkLeaks()
//   `
//   const inlineScript = document.createTextNode(inlineMochaSetupScript)
//   setupMochaScriptEl.appendChild(inlineScript)

//   setupMochaScriptEl.classList.add("mocha-init")

//   const reportCardTestsScriptEl = createScript("tests/test-report-card.js")
//   body.append(reportCardTestsScriptEl)
//   reportCardTestsScriptEl.onload = () => {
//     onloadCallback()
//   }
// }

// function loadTestingLibraries({ onloadCallback = () => {} }) {
//   // TODO: potentially migrate all assertions to sinon instead of chai
//   const body = document.querySelector("body")

//   // add chai source for expect function
//   const chaiScript = createScript("https://unpkg.com/chai/chai.js")
//   body.appendChild(chaiScript)
//   chaiScript.onload = () => {
//     // add sinon script to manage spies
//     const sinonScript = createScript("https://unpkg.com/sinon@13.0.1/pkg/sinon.js")
//     body.appendChild(sinonScript)
//     sinonScript.onload = () => {
//       // add mocha script
//       const mochaScript = createScript("https://unpkg.com/mocha/mocha.js")
//       mochaScript.onload = () => {
//         // HERE IS WHERE WE ACTUALLY SETUP AND LOAD TESTS
//         onloadCallback()
//       }

//       body.appendChild(mochaScript)
//     }
//   }
// }

// function runTestSuite() {
//   const body = document.querySelector("body")
//   // create mocha div
//   const mochaDivEl = document.createElement("div")
//   mochaDivEl.setAttribute("id", "mocha")
//   body.appendChild(mochaDivEl)

//   // we load the testing libraries
//   loadTestingLibraries({
//     // then we ensure all setup has occured
//     onloadCallback: () =>
//       setupAndLoadTests({
//         // and we run our test suite for this lab
//         onloadCallback: () => executeMochaTestRunner(),
//       }),
//   })
// }

// // actually run the setup function
// runTestSuite()
