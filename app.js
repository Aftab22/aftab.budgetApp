var budgetController = (function () {})();

//UI controller
var UIcontroller = (function () {
  let DOM_ID = {
    add__type: ".add__type",
    add__description: ".add__description",
    add__value: ".add__value",
    add__btn: ".add__btn",
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
  };
})();

var controller = (function (budgetCtr, UIctr) {
  var initialize = function () {
      console.warn("Initialized..")
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
    //get input field data
    console.warn(UIcontroller.getInput());
    //add item in budget controller
    //add item to ui
    //calculate budget
    //display total budget
    console.warn("Method Called");
  };

  return {
      init :function (){
          console.warn("Init called");
          initialize();
      }
  }
})(budgetController, UIcontroller);


controller.init();