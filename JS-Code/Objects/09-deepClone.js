function deepClone(obj) {
    // Return a deep copy of obj
    let deepCopy = JSON.stringify(obj)
   return JSON.parse(deepCopy)
    
  }