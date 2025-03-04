

// function filterHealthy(foodList) {
//     // Remove unhealthy food and return updated list
//     healtyFood = foodList.filter(item => item != 'b')
//     return healtyFood
// }

function filterHealthy(foodList) {
    return foodList.filter(item => item !== 'b')
}


foodList = ["t","b","c"]

console.log(filterHealthy(foodList));
