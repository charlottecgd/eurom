"use client";

import { useState } from "react";

export default function Home() {
  const [numbersInput, setNumbersInput] = useState(""); // État pour stocker l'entrée des 5 numéros.
  const [starsInput, setstarsInput] = useState(""); // État pour stocker l'entrée des 2 numéros supplémentaires.
  const [numbers, setNumbers] = useState<number[]>([]); // État pour stocker les 5 numéros après validation.
  const [stars, setstars] = useState<number[]>([]); // État pour stocker les 2 numéros supplémentaires après validation.

  // Gestion de l'entrée des 5 numéros
  const handleNumbersInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setNumbersInput(e.target.value); // Mise à jour de l'état avec la valeur entrée.
  };

  // Gestion de l'entrée des 2 numéros supplémentaires
  const handlestarsInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setstarsInput(e.target.value); // Mise à jour de l'état avec la valeur entrée.
  };

   // Gestion du clic sur le bouton "Afficher les numéros"
   const handleSubmit = () => {
    // Division des entrées en utilisant les espaces comme séparateurs et conversion en nombres
    const numbersArray = numbersInput.split(" ").map(Number);
    const starsArray = starsInput.split(" ").map(Number);

    // Validation pour s'assurer que 5 numéros et 2 numéros supplémentaires ont été saisis
    if (numbersArray.length === 5 && starsArray.length === 2) {
      setNumbers(numbersArray); // Mise à jour de l'état des 5 numéros validés.
      setstars(starsArray); // Mise à jour de l'état des 2 numéros supplémentaires validés.

      console.log(numbersArray, starsArray); // Affichage des numéros dans la console.
    } else {
      alert("Veuillez entrer exactement 5 numéros et 2 numéros supplémentaires, séparés par des espaces."); // Alerte si la validation échoue.
    }
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
      <button
        onClick={handleSubmit}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Jouer
      </button>
      
    </main>
  );
}
