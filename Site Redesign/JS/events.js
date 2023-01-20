/*
*  FizzBuzz Functions
*/

//
//
//
function divisible (num)
{
	if (num % 15 == 0)
	{
		return "FizzBuzz!";
	}
	else if (num % 5 == 0)
	{
		return "Buzz";
	}
	else if (num % 3 == 0)
	{
		return "Fizz";
	}
	else
	{
		return num;
	}
}

//
//
//
function fizzbuzz ()
{
	const input = document.getElementById ("fizzbuzz-input").value;
	const output = document.getElementById ("output");
	
	if (output)
	{
		output.replaceChildren ();
		const head = output.insertRow ();
		const headIn = head.insertCell ();
		const headOut = head.insertCell ();
		headIn.innerText = "Input";
		headOut.innerText = "Output";
		
		for (let i = 1; i <= input; i++)
		{
			//  New <tr> element representing the input
			const newRow = output.insertRow ();
			
			//  New <td> element
			const cellIn = newRow.insertCell ();
			cellIn.innerText = i;
			
			//  New <td> element representing the output
			const cellOut = newRow.insertCell ();
			cellOut.innerText = divisible (i);
		}
	}
}

/*
*  Calculator Functions
*/

//
//
//
function clearDisplay ()
{
	const display = document.getElementById ("calculator-display");
	display.value = "";
}

//
//
//
function evaluateExpression ()
{
	const expression = document.getElementById ("calculator-display").value;
	
	if (!isNaN (expression [0]) && !isNaN (expression [expression.length - 1]))
	{
		let answer = 0;
		//  Parse the expression using space as a delimiter
		//  Spaces are only entered between operators
		let parsedExpression = expression.split (" ");
		
		//  Solve the expression according to PEMDAS
		for (let i = 0; i < parsedExpression.length; i++)
		{
			if (i == 0)
			{
				answer = +parsedExpression [i];
			}	
			
			if (parsedExpression [i] == '*')
			{
				answer = answer * +parsedExpression [i + 1];
				i++;
			}
			else if (parsedExpression [i] == '/')
			{
				answer = answer / +parsedExpression [i + 1];
				i++;
			}
			else if (parsedExpression [i] == '+')
			{
				answer = answer + +parsedExpression [i + 1];
				i++;
			}
			else if (parsedExpression [i] == '-')
			{
				answer = answer - +parsedExpression [i + 1];
				i++;
			}
		}
		
		document.getElementById ("calculator-display").value = answer;
	}
	else
	{
		alert ("Invalid Expression!");
		clearDisplay ();
	}
}

//
//
//
function writeToDisplay (button)
{	
	const display = document.getElementById ("calculator-display");
	
	if (isNaN (button.value))
	{
		display.value += " " + button.value + " ";
	}
	else
	{
		display.value += button.value;
	}
}

/*
*  Hangman Functions
*/

let word = "";
let message = "";
let mystery = "";
let wrongGuesses = 0;

//  Guesses a letter and if guessed correctly,
//  adds it to the mystery word
//
function guessLetter (button)
{
	let letter = button.innerText;
	
	for (let i = 0; i < word.length; i++)
	{
		if (!word.includes (letter.toLowerCase ()))
		{
			wrongGuesses++;
			drawMan ();
			break;
		}
		
		if (word.charAt (i) == letter.toLowerCase ())
		{
			mystery = mystery.substring (0, i) + letter + mystery.substring (i + 1);
			document.getElementById ("mystery-word").innerText = mystery;
		}
	}
	
	if (!mystery.includes ("-"))
	{
		message = "You won!";
		setTimeout (refreshPage, 500);
	}
	
	button.style = "visibility:hidden";
}

//  Sets up a new game with a new word
//
//
function newGame ()
{
	fetch (`https://random-word-api.herokuapp.com/word?lang=en`)
	.then ((res) => res.json ()).then ((data) => 
	{
		word = data [0].toLowerCase ();
	
		for (let i = 0; i < word.length; i++)
		{
			mystery += "-";
		}
		
		document.getElementById ("mystery-word").innerText = mystery;
	});
	
	//  Draws the gallows
	let painter = document.getElementById ("hangman-drawing").getContext ("2d");
	painter.fillStyle = "#FDFCDC";
	painter.fillRect (35, 30, 20, 250);
	painter.fillRect (-50, 280, 150, 20);
	painter.fillRect (35, 30, 200, 20);
}

//  Draws the stick figure as wrong guesses accumulate
//
//
function drawMan ()
{
	let painter = document.getElementById ("hangman-drawing").getContext ("2d");
	painter.fillStyle = "#FDFCDC";
	painter.strokeStyle = "#FDFCDC";
	switch (wrongGuesses)
	{
		//  Head
		case 1:
			painter.beginPath ();
			painter.arc (165, 100, 50, 0, 2 * Math.PI);
			painter.stroke ();
			painter.fill ();
			break;
		//  Torso
		case 2:
			painter.fillRect (157, 100, 15, 150);
			break;
		//  Left Leg
		case 3:
			painter.beginPath ();
			painter.moveTo (165, 245);
			painter.lineTo (137, 300);
			painter.lineWidth = 15;
			painter.stroke ();
			break;
		//  Right Leg
		case 4:
			painter.beginPath ();
			painter.moveTo (165, 245);
			painter.lineTo (185, 300);
			painter.lineWidth = 15;
			painter.stroke ();
			break;
		//  Left Arm
		case 5:
			painter.fillRect (157, 170, 75, 15);
			break;
		//  Right Arm
		case 6:
			painter.fillRect (97, 170, 60, 15);
			message = "Game Over! Word was: " + word;
			setTimeout (refreshPage, 500);
			break;
	}
}

//  Refreshes the page after sending the desired message
//
//
function refreshPage ()
{
	alert (message);
	location.reload ();
}

/*
*  Pokemon Battle Functions
*/

let pokemon = [];

//
//
//
function getPokemon ()
{
	fetch (`https://pokeapi.co/api/v2/pokemon/?limit=151/`)
	.then ((response) => response.json ()).then ((data) =>
	{
		pokemon = data.results;
		
		for (let i = 0; i < pokemon.length; i++)
		{
			getPokemonData (pokemon [i], i);
		}
	});
}

//
//
//
function getPokemonData (pokemonChoice, index)
{
	fetch (`${pokemonChoice.url}`)
	.then ((response) => response.json ()).then ((data) =>
	{
		pokemon [index] = data;
		
		if (index == pokemon.length - 1)
		{
			updatePokemonChoices ();
		}
	});
}

//
//
//
function updatePokemonChoices ()
{
	const pokeList = document.getElementById ("pokemon-choices");
	
	for (let i = 0; i < pokemon.length; i++)
	{
		const choice = document.createElement ("option");
		choice.innerText = pokemon [i].name.charAt (0).toUpperCase () + pokemon [i].name.slice (1);
		choice.id = pokemon [i].name;
		pokeList.appendChild (choice);
	}
	
	showPokemon (0);
}

//
//
//
function showPokemon (selectedIndex)
{
	let image = document.getElementById ("sprite");
	image.src = pokemon [selectedIndex].sprites.front_default;
}

//
//
//
function goToBattle ()
{
	const choice = pokemon [document.getElementById ("pokemon-choices").selectedIndex];
	sessionStorage.setItem ('userPokemon', JSON.stringify (choice));
	
	const enemy = pokemon [Math.round ((Math.random ()) * 151)];
	sessionStorage.setItem ('enemyPokemon', JSON.stringify (enemy));
	location.replace ("PokemonBattleStart.html");
}

/*
*  Battle In Progress Functions
*/

//
//
//
function setupBattle ()
{
	const userPokemon = JSON.parse (sessionStorage.getItem ('userPokemon'));
	const userSprite = document.getElementById ("user-pokemon");
	userSprite.src = userPokemon.sprites.back_default;
	
	const enemyPokemon = JSON.parse (sessionStorage.getItem ('enemyPokemon'));
	const enemySprite = document.getElementById ("enemy-pokemon");
	enemySprite.src = enemyPokemon.sprites.front_default;
	
	document.getElementById ("user-name").innerText = userPokemon.name [0].toUpperCase () + userPokemon.name.slice (1);
	document.getElementById ("enemy-name").innerText = enemyPokemon.name [0].toUpperCase () + enemyPokemon.name.slice (1);
}