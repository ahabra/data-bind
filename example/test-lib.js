(function(){
	function it(description, test) {
		try {
			test()
		} catch(er) {
			addError(description, er)
		}
	}

	function isEqual(actual, expected, description) {
		if (actual !== expected) {
			throw `${description} is ${actual}, but expected to be ${expected}`
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
		const errorList = document.getElementById('errorList')
		createElement(`<li>${testName}: ${errorMsg}</li>`, errorList)
	}

	function getContent() {
		return document.getElementById('content')
	}

	window.Tester = {
		it, isEqual,
		createInput
	}
})()

