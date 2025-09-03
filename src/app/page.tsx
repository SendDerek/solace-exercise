"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
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

  const filteredAdvocates = useMemo(() => {
    if (!debouncedSearchTerm) {
      return advocates;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some(s => s.toLowerCase().includes(searchLower)) ||
        advocate.yearsOfExperience.toString().includes(debouncedSearchTerm)
      );
    });
  }, [advocates, debouncedSearchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleResetClick = useCallback(() => {
    setSearchTerm("");
  }, []);

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