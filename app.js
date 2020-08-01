var budgetController = (function () {
  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var data = {
    transactions: {
      exp: [],
      inc: [],
    },
    totals: {
      totalExpense: 0,
      totalIncome: 0,
    },
  };
  return {
    addItem: function (type, desc, value) {
      console.warn(type, desc, value);
      var newItem, ID;
      if (data.transactions[type].length > 0) {
        ID = data.transactions[type][data.transactions[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      if (type === "exp") {
        newItem = new Expense(ID, desc, value);
      } else if (type === "inc") {
        newItem = new Income(ID, desc, value);
      }
      data.transactions[type].push(newItem);
      console.warn(data);
      return newItem;
    },
  };
})();

//UI controller
var UIcontroller = (function () {
  let DOM_ID = {
    add__type: ".add__type",
    add__description: ".add__description",
    add__value: ".add__value",
    add__btn: ".add__btn",
    item__income: ".income__list",
    item__expense: ".expenses__list",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOM_ID.add__type).value, //either inc or exp
        descruption: document.querySelector(DOM_ID.add__description).value,
        addValue: document.querySelector(DOM_ID.add__value).value,
      };
    },
    getDomIds: function () {
      return DOM_ID;
    },
    newItemToUI: function (type,object) {
      var element, html, newHTML;
      if (type == "inc") {
        html =
          '<div class="item clearfix" id="income-%ID%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = document.querySelector(DOM_ID.item__income);
      } else if (type == "exp") {
        html =
          '<div class="item clearfix" id="%expense-%ID%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = document.querySelector(DOM_ID.item__expense);
      }
      newHTML = html.replace("%ID%", object.id);
      newHTML = html.replace("%desc%", object.desc);
      newHTML = newHTML.replace("%value%", object.value);
      element.insertAdjacentHTML('beforeend', newHTML);
    },
  };
})();

var controller = (function (budgetCtr, UIctr) {
  var initialize = function () {
    console.warn("Initialized..");
    let DOM_ID = UIcontroller.getDomIds();
    document
      .querySelector(DOM_ID.add__btn)
      .addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", (keyEvent) => {
      if (keyEvent.keyCode === 13 || keyEvent.which === 13) {
        ctrlAddItem();
      }
    });
  };
  var ctrlAddItem = function () {
    var input, newItem;
    //get input field data
    input = UIcontroller.getInput();
    //add item in budget controller
    newItem = budgetController.addItem(
      input.type,
      input.descruption,
      input.addValue
    );
    UIcontroller.newItemToUI(input.type,newItem);
  };

  return {
    init: function () {
      console.warn("Init called");
      initialize();
    },
  };
})(budgetController, UIcontroller);

controller.init();
