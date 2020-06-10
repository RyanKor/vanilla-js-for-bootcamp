// 1.Budget Controller
let budgetController = (function () {
  let expense = function (id, description, value) {
    // function constructor
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = (this.value / totalIncome) * 100;
    } else {
      this.percentage = -1;
    }
  };
  expense.prototype.getPercentage = function () {
    return this.percentage;
  };
  let income = function (id, description, value) {
    // function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };
  let calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum = sum + cur.value;
      /*
      0
      [200, 400, 100]
      sum = 0 + 200
      */
    });
    data.totals[type] = sum;
  };
  // all data management parts
  let data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    // -1 means not to exist
    percentage: -1,
  };
  return {
    addItem: function (type, des, val) {
      let newItem, ID;

      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === "exp") {
        new expense(ID, des, val);
      } else if (type === "inc") {
        new income(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    deleteItem: function (type, id) {
      let ids, index;
      // designating ID
      data.allItems[type][id];
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function () {
      // calculate total income and expense
      calculateTotal("exp");
      calculateTotal("inc");
      // Calculate the budget: income - expense
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that  we spent
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      // Expense = 100 and income 200, spent 50% = 100/200 = .5 * 100
    },
    calculatePercentages: function () {
      data.allItems.exp.forEach(function (cur) {
        current.calcPercentage();
      });
    },
    getPercentages: function () {
      let allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.totals.percentage,
      };
    },
    testing: function () {
      console.log(data);
    },
  };
})();

// 2.UI Controller
let UIController = (function () {
  //Some Codes
  let DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
  };
  return {
    getinput: function () {
      return {
        type: (type = document.querySelector(DOMStrings.inputType).value), //will be either income or expense
        description: (description = document.querySelector(
          DOMStrings.inputDescription
        ).value),
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      let html, newHTML, element;
      //1. Create HTML String with place holder text.
      if (type === "inc") {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i> </button> </div></div></div>';
      } else if (type === "exp") {
        element = DOMStrings.expenseContainer;
        html = `<div class="item clearfix" id="exp-%id%">
<div class="item__description">%description%</div>
<div class="right clearfix">
    <div class="item__value">%value%</div>
    <div class="item__percentage">21%</div>
    <div class="item__delete">
        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div>
</div> </div>`;
      }

      // 2. replace the placeholder text with some actual data
      newHTML = html.replace("%id%", obj.id);
      newHTML = newHTML.replace("%description%", obj.description);
      newHTML = newHTML.replace("%value%", obj.value);
      // 3. Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
    },
    deleteListItem: function (selectorID) {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild();
    },
    clearField: function () {
      let fields, fieldArr;
      fields = document.querySelectorAll(
        DOMStrings.inputDescription + ", " + DOMStrings.inputValue
      );
      fieldArr = Array.prototype.slice.call(fields);
      fieldArr.forEach(function (current, index, array) {
        current.value = "";
      });
      fieldArr[0].focus();
    },
    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = "---";
      }
    },
    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

// 3.Global App Controller
let controller = (function (budgetCtrl, UICtrl) {
  let setupEventListeners = function () {
    let DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      //   여기서 event 매개변수는 키보드 내에서 입력된 any key를 받는다.
      if ((event.keyCode === 13) | (event.which === 13)) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  let updateBudget = function () {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. return budget
    let budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };
  let updatePercentage = function () {
    // 1. Calculate percentage
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from the budget controller
    let percentages = budgetCtrl.getPercentages();
    // 3. Update the UI with the new percentage
    console.log(percentages);
  };
  let ctrlAddItem = function () {
    let input, newItem;
    // 1. Get the filled input data
    input = UICtrl.getinput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      newItem = budgetController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 2. Add the item to the budget controller
      UICtrl.addListItem(newItem, input.type);
      // 3. Clear Field
      UICtrl.clearField();
      // 4. Calculate and Update Budget
      updateBudget();
      // 5. Calculate and Update Percentages
      updatePercentage();
    }
  };
  let ctrlDeleteItem = function (event) {
    let itemId, splitID, type, ID;
    // 매개변수의 target을 찍을 경우, 해당 매개변수의 tag값이 나온다.
    itemId = event.target.parentNode;
    if (itemId) {
      // inc-1
      splitID = itemId.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. Delete the item from the UI
      UICtrl.deleteListItem(itemId);
      // 3. Update and show the new budget
      updateBudget();
    }
  };
  return {
    init: function () {
      console.log("Application has started.");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
