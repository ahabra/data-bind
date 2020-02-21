import bind from '/src/bind.js';


const obj = {
countries: ['mx']
};
bind({obj, prop:'age', sel:'#age'});
bind({obj, prop:'description', sel:'#description'});
bind({obj, prop:'carColor', sel:'#carColor', attr:'style'});
bind({obj, prop:'state', sel:'#states'});
bind({obj, prop:'countries', sel:'#countries'});
bind({obj, prop:'language', sel:'[name="language"]'});
bind({obj, prop:'hobbies', sel:'.hobbies'});

window.obj = obj;