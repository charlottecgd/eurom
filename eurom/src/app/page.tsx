"use client";

import { useState } from "react";

export default function Home() {
  const [numbersInput, setNumbersInput] = useState(""); // État pour stocker l'entrée des 5 numéros.
  const [starsInput, setstarsInput] = useState(""); // État pour stocker l'entrée des 2 numéros supplémentaires.
 
  // Gestion de l'entrée des 5 numéros
  const handleNumbersInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setNumbersInput(e.target.value); // Mise à jour de l'état avec la valeur entrée.
  };

  // Gestion de l'entrée des 2 numéros supplémentaires
  const handlestarsInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setstarsInput(e.target.value); // Mise à jour de l'état avec la valeur entrée.
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-400">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <input
          type="text"
          value={numbersInput}
          onChange={handleNumbersInputChange}
          className="mr-24 p-2 border border-gray-300 rounded"
          placeholder="5 numéros, séparés par des espaces"
        />
        <input
          type="text"
          value={starsInput}
          onChange={handlestarsInputChange}
          className="p-2 border border-gray-300 rounded"
          placeholder="2 numéros supplémentaires, séparés par des espaces"
        />
      </div>
     
    </main>
  );
}
