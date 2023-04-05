import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FIND_PERSON } from "../queries";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street}, {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);

  //   giving nameToSearch a value causes the component to re-render itself. On render
  //   the query FIND_PERSON that fetches the detailed information of a user is executed
  //   if the variable nameToSearch has a value
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  //   If the state nameToSearch has a value and the query result is ready,
  //   the component Person renders the detailed info of a person
  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        // When a user wants to return to the persons list,
        // the nameToSearch state is set to null.
        onClose={() => setNameToSearch(null)}
      />
    );
  }
  return (
    <div>
      <h2>Phone Book</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} : {person.phone}
          {/* When the button show address of a person is pressed, 
          the name of the person is set to state nameToSearch */}
          <button onClick={() => setNameToSearch(person.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
