function cleanObject(obj) {
    // Remove all properties with null or undefined values
    let cleanObj ={}
    for (const key in obj) {
        if (obj[key] !== null || obj[key] !== undefined) {
            cleanObj[key] = obj[key]
        }
    }
    return cleanObj;
  }