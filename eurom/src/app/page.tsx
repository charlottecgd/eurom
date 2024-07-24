"use client";

import { useState } from "react";

export default function Home() {
  const [numbersInput, setNumbersInput] = useState("");
  const [extraNumbersInput, setExtraNumbersInput] = useState("");
  const [result, setResult] = useState<{ numbers: number; stars: number } | null>(null);
  const [drawNumbers, setDrawNumbers] = useState<number[]>([]);
  const [drawStars, setDrawStars] = useState<number[]>([]);

  const handleNumbersInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumbersInput(e.target.value); // Mise à jour de l'état avec la valeur entrée.
  };

  const handleExtraNumbersInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtraNumbersInput(e.target.value); // Mise à jour de l'état avec la valeur entrée.
  };

  const handleSubmit = async () => {
    const numbersArray = numbersInput.split(" ").map(Number);
    const extraNumbersArray = extraNumbersInput.split(" ").map(Number);

    if (numbersArray.length === 5 && extraNumbersArray.length === 2) {
      try {
        const response = await fetch('/api/lottery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numbers: numbersArray,
            extraNumbers: extraNumbersArray,
          }),
        });

        // Vérifier si la réponse est JSON
        if (response.ok) {
          const data = await response.json();
          setResult({
            numbers: data.numbers,
            stars: data.stars
          }); // Stocker le résultat du tirage
          setDrawNumbers(data.drawNumbers); // Stocker les numéros tirés
          setDrawStars(data.drawStars); // Stocker les étoiles tirées
        } else {
          console.error('Erreur de réponse:', await response.text());
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    } else {
      alert("Veuillez entrer exactement 5 numéros et 2 numéros supplémentaires, séparés par des espaces.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-400">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <input
          type="text"
          value={numbersInput}
          onChange={handleNumbersInputChange}
          className="mr-24 p-2 border border-gray-300 rounded bg-white text-black"
          placeholder="Entrez 5 numéros, séparés par des espaces"
        />
        <input
          type="text"
          value={extraNumbersInput}
          onChange={handleExtraNumbersInputChange}
          className="p-2 border border-gray-300 rounded bg-white text-black"
          placeholder="Entrez 2 numéros supplémentaires, séparés par des espaces"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Jouer
      </button>
      <div className="mt-8">
        {/* Affichage du résultat */}
        {result && (
          <div>
            <p>Vous avez obtenu {result.numbers} bons numéros et {result.stars} bonnes étoiles</p>
            {/* Affichage des numéros tirés */}
            <p>Numéros tirés : {drawNumbers.join(", ")}</p>
            <p>Étoiles tirées : {drawStars.join(", ")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
