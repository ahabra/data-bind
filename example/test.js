

Tester.it('test1', ()=> {
	Tester.createInput('t1')
	const obj = bind({prop:'age', sel:'#t1'})
	obj.age = 11
	Tester.isEqual(obj.age, '11', 'age')
})

