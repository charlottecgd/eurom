import { NextResponse } from 'next/server';

interface LotteryRequestBody {
  numbers: number[];
  extraNumbers: number[];
}

function generateRandomDraw() {
  // Crée un ensemble pour stocker les numéros uniques tirés
  const numbers = new Set<number>();

  // Crée un ensemble pour stocker les étoiles uniques tirées
  const extraNumbers = new Set<number>();

  // Générer 5 numéros uniques
  while (numbers.size < 5) {
    // Math.random() génère un nombre aléatoire entre 0 et 1
    // Math.floor() arrondit ce nombre vers le bas pour obtenir un entier
    // Multiplication par 50 donne un nombre dans la plage 0-49
    // Ajout de 1 pour ajuster la plage à 1-50
    numbers.add(Math.floor(Math.random() * 50) + 1);
  }

  // Générer 2 étoiles uniques
  while (extraNumbers.size < 2) {
    // Math.random() génère un nombre aléatoire entre 0 et 1
    // Math.floor() arrondit ce nombre vers le bas pour obtenir un entier
    // Multiplication par 12 donne un nombre dans la plage 0-11
    // Ajout de 1 pour ajuster la plage à 1-12
    extraNumbers.add(Math.floor(Math.random() * 12) + 1);
  }

  // Convertit les ensembles en tableaux pour pouvoir les retourner
  return {
    numbers: Array.from(numbers),
    extraNumbers: Array.from(extraNumbers)
  };
}


function compareDraw(playerNumbers: number[], playerExtras: number[], drawNumbers: number[], drawExtras: number[]) {
  const numbers = playerNumbers.filter(num => drawNumbers.includes(num)).length;
  const stars = playerExtras.filter(num => drawExtras.includes(num)).length;

  return { numbers, stars };
}

export async function POST(req: Request) {
  try {
    const { numbers, extraNumbers } = await req.json() as LotteryRequestBody;

    if (numbers.length === 5 && extraNumbers.length === 2) {
      const draw = generateRandomDraw(); // Générer un tirage aléatoire
      const result = compareDraw(numbers, extraNumbers, draw.numbers, draw.extraNumbers); // Comparer le tirage

      return NextResponse.json({
        ...result,
        drawNumbers: draw.numbers, // Inclure les numéros tirés
        drawStars: draw.extraNumbers // Inclure les étoiles tirées
      });
    } else {
      return NextResponse.json(
        { message: 'Veuillez entrer exactement 5 numéros et 2 numéros supplémentaires' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ message: 'Erreur lors du traitement de la requête' }, { status: 500 });
  }
}
