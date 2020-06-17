const Redux = require("redux");

//Action Creater
const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

const createClaim = (name, claimAmount) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      claimAmount: claimAmount
    }
  };
};

//Reducers

const claimHistory = (listOfClaim = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    return [...listOfClaim, action.payload];
  }
  return listOfClaim;
};

const accounting = (totalMoney = 5000, action) => {
  if (action.type === "CREATE_CLAIM") {
    return totalMoney - action.payload.claimAmount;
  } else if (action.type === "CREATE_POLICY") {
    return totalMoney + action.payload.amount;
  }
  return totalMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const departments = combineReducers({
  claimHistory: claimHistory,
  accounting: accounting,
  policies: policies
});

const store = createStore(departments);

store.dispatch(createPolicy("Mohit", 2000));
store.dispatch(createPolicy("Ankita", 1000));
store.dispatch(createPolicy("Shyam", 1000));
store.dispatch(createClaim("Ankita", 2000));
store.dispatch(deletePolicy("Mohit"));
console.log(store.getState());
