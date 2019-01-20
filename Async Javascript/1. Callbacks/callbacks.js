const add = (x, y) => x + y

const addNumb = (x, y, addReference) => addReference(x, y)

console.log(addNumb(2,22,add))