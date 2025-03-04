function addCarColor(car, color) {
    // if(color){
    //     car.color = color
    //     return {...car} 
    // } else {
    //     return "Invalid color"
    // }

    if(
        typeof(car) !== "object" || 
        typeof(color) !== 'string' || 
        color.length === 0)
        {
            return "Invalid color"
        } 
        car.color = color
        return car;

  }