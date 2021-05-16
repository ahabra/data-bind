

Tester.it('binds an element to an input value', ()=> {
	const id = 't1'
	const el = Tester.createInput(id)

	const obj = bind({prop:'age', sel:`#${id}`})
	obj.age = 11
	Tester.isEqual(el.value, '11', 'age')

	el.value = 42
	Tester.isEqual(obj.age, '42', 'age')
})

Tester.it('binds an element to content', ()=> {
	const id = 't2'
	const el = Tester.createElement(`<div id="${id}"></div>`)

	const obj = bind({prop:'age', sel:`#${id}`})
	obj.age = 12
	Tester.isEqual(el.innerHTML, '12', 'age')
})

Tester.it('binds to an element attribute', ()=> {
	const id = 't3'
	const el = Tester.createElement(`<div id="${id}" color=""></div>`)

	const obj = bind({prop:'color', sel:`#${id}`, attr:'color'})

	obj.color = 'red'
	Tester.isEqual(el.getAttribute('color'), 'red', 'color')

	el.setAttribute('color', 'green')
	Tester.isEqual(obj.color, 'green', 'color')
})

Tester.it('listens to changes', ()=> {
	const id = 't4'
	const el = Tester.createElement(`<div id="${id}"></div>`)

	const record = []
	const obj = bind({prop:'color', sel:`#${id}`, onChange: (oldValue, newValue)=> {
		record.push({oldValue, newValue})
	}})

	obj.color = 'red'
	obj.color = 'green'

	Tester.isEqual(record.length, 2, 'record length')
	Tester.isEqual(record[0].oldValue, '', 'initial value')
	Tester.isEqual(record[0].newValue, 'red', 'first value')

	Tester.isEqual(record[1].oldValue, 'red', 'previous value')
	Tester.isEqual(record[1].newValue, 'green', 'second value')
})

Tester.it('uses getter/setter if provided', ()=> {
	const id = 't5'
	const el = Tester.createInput(id)

	const obj = bind({prop: 'age',
		getter: ()=> el.value,
		setter: value=> el.value = value
	})

	obj.age = 1
	Tester.isEqual(el.value, '1', 'age')

	el.value = 2
	Tester.isEqual(obj.age, '2', 'age')
})