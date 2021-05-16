

Tester.it('binds an element to a input value', ()=> {
	const id = 't1'
	Tester.createInput(id)
	const el = document.getElementById(id)

	const obj = bind({prop:'age', sel:`#${id}`})
	obj.age = 11
	Tester.isEqual(el.value, '11', 'age')

	el.value = 42
	Tester.isEqual(obj.age, '42', 'age')
})

Tester.it('binds an element to content', ()=> {
	const id = 't2'
	Tester.createElement(`<div id="${id}" ></div>`)
	const el = document.getElementById(id)

	const obj = bind({prop:'age', sel:`#${id}`})
	obj.age = 12
	Tester.isEqual(el.innerHTML, '12', 'age')
	
})
