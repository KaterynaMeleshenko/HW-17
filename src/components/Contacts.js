import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdSettingsPower } from "react-icons/md";
import Contact from "./Contact";
import "./contacts.css";

const defaultContacts = [ 
    {
    id: 0,
    firstName: "Барней",
    lastName: "Стинсовський",
    phone: "+380956319521",
    gender: "male"
  }, 
  { id: 1,
    firstName: "Робін",
    lastName: "Щербатська",
    phone: "+380931460123",
    gender: "female"
  }, 
  { id: 2,
    firstName: "Анонімний",
    lastName: "Анонімус",
    phone: "+380666666666"
  }, 
  { id: 3,
    firstName: "Лілія",
    lastName: "Олдровна",
    phone: "+380504691254",
    gender: "female"
  }, 
  { id: 4,
    firstName: "Маршен",
    lastName: "Еріксонян",
    phone: "+380739432123",
    gender: "male"
  }, 
  { id: 5,
    firstName: "Теодор",
    lastName: "Мотсбес",
    phone: "+380956319521",
    gender: "male"
  } ]

const Contacts = () => {
  const [contacts, setContacts] = useState(defaultContacts)
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [isChecked, setIsChecked] = useState([true, true, true]);
  //const genders = ["male", "female", undefined];
   
  const handlerCheckBoxes = (e) => {
    const id = e.target.id;
    const updateIsChecked = isChecked.map( (item, index) =>
      index === +id ? !item : item);  
    setIsChecked(updateIsChecked);
  }
  
  useEffect(() => {
    let newFilteredContacts = contacts;
    
    newFilteredContacts = newFilteredContacts.filter(el => {
      return (
        (el.gender === "male" && isChecked[0]) ||
        (el.gender === "female" && isChecked[1]) ||
        (el.gender === undefined && isChecked[2])
      );
    })
  

    
    if (search) {
      newFilteredContacts = newFilteredContacts.filter(el => {
        const { firstName, lastName, phone } = el;

        return (
          firstName.toLowerCase().includes(search.toLowerCase()) ||
          lastName.toLowerCase().includes(search.toLowerCase()) ||
          phone.includes(search)
        );
      });
    };
    
  setFilteredContacts(newFilteredContacts);

  }, [isChecked, search, contacts]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="inner"> 
      <div className="header">MY CONTACTS</div>
      <div className="input">
        <input 
          className="input" 
          placeholder="SEARCH" 
          type="search" 
          name="search" 
          onChange={handleSearchChange} 
          value={search}/>
      </div> 
      <div className="boxes">
        <input 
          className="box-male"
          type="checkbox"
          id="0"
          name="male"
          value="male"
          checked={isChecked[0]}
          onChange={handlerCheckBoxes}/>
          male
        <input   
          className="box-female" 
          type="checkbox" 
          id="1" 
          name="female" 
          value="female" 
          checked={isChecked[1]} 
          onChange={handlerCheckBoxes}/>
          female
        <input 
          className="box-undefined" 
          type="checkbox"
          id="2"
          name="undefined"
          value="undefined"
          checked={isChecked[2]}
          onChange={handlerCheckBoxes}/>
          undefined
      </div> 
      <div className="mainblock"> 
      { 
        filteredContacts.map(({ id, firstName, lastName, phone, gender }) => (
          <Contact 
            key = {id}
            firstName = {firstName}
            lastName = {lastName}
            phone = {phone}
            gender = {gender}
          />
        ))
      } 
      </div>
      <div className="othericons">
        <div className="star"><BiStar/></div>
        <div className="clock"> <BsClock/></div>
        <div className="person"><MdContacts/></div>
        <div className="other"><FiSettings/></div>
        <div className="auto"><MdSettingsPower/></div>
      </div>    
    </div>
  )
}

export default Contacts;