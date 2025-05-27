import React from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";

function App() {
  return (
    <div className="App">
      <h1>Microsserviços: User e Order</h1>
      <UserForm />
      <hr />
      <UserList />
      <hr />
      <OrderList />
    </div>
  );
}

export default App;


