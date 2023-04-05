import "./App.css";
import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import { ALL_PERSONS } from "./queries";
import PersonForm from "./components/PersonForm";
import { useState } from "react";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <Persons persons={result.data.allPersons} />
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App;
