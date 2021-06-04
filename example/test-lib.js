(function(){
	function it(description, test) {
		try {
			test()
			addSuccess(description)
		} catch(er) {
			addError(description, er)
		}
	}

	function skip(description) {
		addSkip(description)
	}

	function isEqual(actual, expected, description) {
		if (actual !== expected) {
			throw `${description} is ${actual}, but should be ${expected}`
		}
	}

	function createInput(id) {
		return createElement(`<input type='text' id='${id}'>`)
	}

	function createElement(html, parent= getContent()) {
		const template = document.createElement('template')
		template.innerHTML = html
		const el = template.content.firstChild

		parent.appendChild(el)
		return el
	}

	function addError(testName, errorMsg) {
		addReportItem(`<li class="error"><b>${testName}</b>: ${errorMsg}</li>`)
	}

	function addSuccess(testName) {
		addReportItem(`<li class="success">${testName}</li>`)
	}

	function addSkip(testName) {
		addReportItem(`<li class="skip"><b>Skipped</b>: ${testName}</li>`)
	}

	function addReportItem(msg) {
		const reportList = document.getElementById('reportList')
		createElement(msg, reportList)
	}

	function getContent() {
		return document.getElementById('content')
	}

	window.Tester = {
		it, skip, isEqual,
		createInput, createElement
	}
})()

