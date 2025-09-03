"use client";

import React, { useEffect, useState } from "react";

interface Advocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    let isCancelled = false;
    
    const fetchAdvocates = async () => {
      console.log("fetching advocates...");
      try {
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        
        if (!isCancelled) {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch advocates:", error);
      }
    };
    
    fetchAdvocates();
    
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredAdvocates(advocates);
      return;
    }

    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        advocate.specialties.some(s => s.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        advocate.yearsOfExperience.toString().includes(debouncedSearchTerm)
      );
    });
    setFilteredAdvocates(filtered);
  }, [advocates, debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={handleSearchChange} />
        <button onClick={handleResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, index) => (
                    <div key={index}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}