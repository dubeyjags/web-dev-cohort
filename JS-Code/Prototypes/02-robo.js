// function Robot(name, batteryLevel) {
//    this.name = name,
//     this.batteryLevel=batteryLevel,
//     this.charge = function () {
//         this.batteryLevel = Math.min(this.batteryLevel + 20, 100)
//     }
// }


function Robot(name, batteryLevel) {
    this.name = name,
     this.batteryLevel=batteryLevel
 }
 Robot.prototype.charge = function () {
    this.batteryLevel = Math.min(this.batteryLevel + 20, 100)
}