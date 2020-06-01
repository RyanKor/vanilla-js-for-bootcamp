let john = {
  fullNames: "John Smith",
  bills: [124, 48, 268, 180, 42],
  calTips: function () {
    this.tips = [];
    this.finalValue = [];
    for (let i = 0; i < this.bills.length; i++) {
      let percentage = 0;
      let bill = this.bills[i];
      if (this.bills[i] < 50) {
        percentage = 0.2;
      } else if (this.bills[i] >= 50 && this.bills[i] < 200) {
        percentage = 0.15;
      } else {
        percentage = 0.1;
      }

      this.tips[i] = bill * percentage;
      this.finalValue[i] = bill + bill * percentage;
    }
    return this.tips, this.finalValue;
  },
};

console.log(john.calTips());
