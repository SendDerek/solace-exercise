"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AdvocatesTable from "../components/AdvocatesTable";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-mollie">
            Solace <span className="text-blue-600">Advocates</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect advocate to support your healthcare journey. Search through our network of experienced professionals.
          </p>
        </div>
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onReset={handleResetClick}
        />
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Advocates
            </h2>
            <div className="text-sm text-gray-500">
              {filteredAdvocates.length} {filteredAdvocates.length === 1 ? 'advocate' : 'advocates'} found
            </div>
          </div>
        </div>
        
        <AdvocatesTable advocates={filteredAdvocates} />
      </div>
    </div>
  );
}