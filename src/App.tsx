import React, { useState } from "react";
import Select, { SelectOption } from "./Select";
import styles from "./app.module.css";

const options = [
    { country: "Turkey", capital: "Ankara" },
    { country: "Finland", capital: "Helsinki" },
    { country: "Argentina", capital: "Buenos Aires" },
    { country: "Cuba", capital: "Havana" },
    { country: "Denmark", capital: "Copenhagen" },
    { country: "Ethiopia", capital: "Addis Ababa" },
    { country: "France", capital: "Paris" },
    { country: "Germany", capital: "Berlin" },
    { country: "Greece", capital: "Athens" },
    { country: "Hungary", capital: "Budapest" },
    { country: "India", capital: "New Delhi" },
    { country: "Indonesia", capital: "Jakarta" },
    { country: "Ireland", capital: "Dublin" },
    { country: "Italy", capital: "Rome" },
    { country: "Japan", capital: "Tokyo" },
    { country: "Kenya", capital: "Nairobi" },
    { country: "Madagascar", capital: "Antananarivo" },
    { country: "Netherlands", capital: "Amsterdam" },
    { country: "North Macedonia", capital: "Skopje" },
    { country: "Norway", capital: "Oslo" },
    { country: "Philippines", capital: "Manila" },
    { country: "Portugal", capital: "Lisbon" },
    { country: "Qatar", capital: "Doha" },
    { country: "Russia", capital: "Moscow" },
    { country: "Sweden", capital: "Stockholm" },
    { country: "United Kingdom", capital: "London" },
    { country: "United States", capital: "Washington, D.C." },
    { country: "Vietnam", capital: "Hanoi" },
    { country: "Yemen", capital: "Sana'a" },
    { country: "Zimbabwe", capital: "Harare" },
  ];

function App() {
  const [capital1, setCapital1] = useState<SelectOption []>([options[0]]);
  const [capital2, setCapital2] = useState<SelectOption | undefined>(options[0]);

  return (
    <>
     <h1 className={styles.mcc}>mcc ~ Selection</h1>
     <h2 className={styles["mcc-multiple"]}>Multiple ~ Selection</h2>
      <Select
        multiple
        capital={capital1}
        onChange={(o) => {
          setCapital1(o);
          console.log(o);
        }}
        options={options}
      />
     <h2 className={styles["mcc-single"]}>Single ~ Selection</h2>
      <Select 
        capital={capital2}
        onChange={(o) => {
          setCapital2(o);
          console.log(o);
        }}
        options={options}
      />
    </>
  );
}

export default App;
