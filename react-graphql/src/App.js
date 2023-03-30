import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Phone Book</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} : {person.phone}
        </div>
      ))}
    </div>
  );
};

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Persons persons={result.data.allPersons} />
    </div>
  );
}

export default App;
