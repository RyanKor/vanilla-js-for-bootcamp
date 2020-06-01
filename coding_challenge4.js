let mark = {
  fullname: "mark hulk",
  mass: 78,
  height: 178,
  calBMI: function () {
    this.BMI = this.mass / (this.height ^ 2);
    return this.BMI;
  },
};

let john = {
  fullname: "john turner",
  mass: 85,
  height: 195,
  calBMI: function () {
    this.BMI = this.mass / (this.height ^ 2);
    return this.BMI;
  },
};

john.calBMI();
mark.calBMI();

console.log(john.calBMI(), mark.calBMI());
