function createStudentProfile(name, age, grade) {
    if(
        typeof(name)!=="string" || 
        typeof(age)!=="number" || 
        typeof(grade)!=="string" || 
        age <= 5 ||
        name === ""
    ){
        return "Invalid input"
    } else {
        return {name,age,grade}
    }
  }