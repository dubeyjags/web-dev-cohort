// You just need to implement the removeStudent function
function removeStudent(bus) {
    // Remove the first student and return the updated bus list
    bus.shift()
    return bus
}

console.log(removeStudent(['a','b','c']));
