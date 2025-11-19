//Messi Goals ----------------------------------------------------------
//https://www.codewars.com/kata/grasshopper-messi-goals-function/train/javascript

// - The solution is the same for everyone on the team.
function goals(laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
    return laLigaGoals + copaDelReyGoals + championsLeagueGoals;
}

//Make Negative ----------------------------------------------------------
//https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript

//- Serafym Starobrianskyi
//- Yana Stepaniuk
function makeNegative(num) {
    return num > 0 ? -num : num;
}

//- Alina Vlasenko
//- Sofiia Tolstonoh
function makeNegative(num) {
    return -Math.abs(num);
}

//- Zhavelia Iryna
function makeNegative(num) {
    return num < 0 ? num : num * -1;
}

//- Truhon Angelina
function makeNegative(num) {
    return num <= 0 ? num : -num;
}


//Game Move ----------------------------------------------------------
//https://www.codewars.com/kata/grasshopper-terminal-game-move-function/train/javascript

// - The solution is the same for everyone on the team.
function move(position, roll) {
    return position + roll * 2;
}


//Personalized Message ----------------------------------------------------------
//https://www.codewars.com/kata/grasshopper-personalized-message/train/javascript

//The solution is the same for everyone on the team.
function greet(name, owner) {
    return name === owner ? "Hello boss" : "Hello guest";
}

//Keep Hydrated ----------------------------------------------------------
//https://www.codewars.com/kata/keep-hydrated-1/train/javascript

// - The solution is the same for almost everyone on the team.
function litres(time) {
    return Math.floor(time * 0.5);
}

// - Serafym Starobrianskyi
function litres(time) {
    return Math.floor(time / 2);
}

//Opposites Attract ----------------------------------------------------------
//https://www.codewars.com/kata/555086d53eac039a2a000083/train/javascript

// - Serafym Starobrianskyi
// - Yana Stepaniuk
// - Alina Vlasenko
function lovefunc(flower1, flower2) {
    return (flower1 % 2) !== (flower2 % 2);
}

// - Zhavelia Iryna
function lovefunc(flower1, flower2) {
    return (flower1 % 2 === 0 && flower2 % 2 !== 0) || (flower1 % 2 !== 0 && flower2 % 2 === 0) ? true : false
}

// - Truhon Angelina
function lovefunc(flower1, flower2) {
    return (flower1 % 2 === 0) && (flower2 % 2 !== 0) || (flower1 % 2 !== 0) && (flower2 % 2 === 0);
}