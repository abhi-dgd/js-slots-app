// Learning by following [Tech with Tim](https://www.youtube.com/watch?v=E3XxeE7NF30)

// Import required library
const prompt = require("prompt-sync")();


// Define app globals
// Size of wheel
const ROWS = 3;
const COLS = 3;
// Frequency map
const GLOBAL_SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
};
// Value of symbols
const GLOBAL_SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2,
};

// Define app functions
const deposit = () => {
    while (true){
        const amount = prompt("Enter deposit amount: ");
        integerAmount = parseInt(amount)
        if (isNaN(integerAmount) || integerAmount <= 0){
            console.log("Invalid entry! Try again");
        }
        else{
            return integerAmount;
        }
    }
};

const getBetLines = () => {
    while (true){
        const lines = prompt("Enter the number of lines you want to bet on: ");
        integerLines = parseInt(lines)
        if (isNaN(integerLines) || integerLines <= 0 || integerLines > 3){
            console.log(
                "Invalid number of lines! Must be less than or equal to 3"
            );
        }
        else{
            return integerLines;
        }
    }
};

const getBetAmount = (moneyAvailable, betLines) => {
    while (true){
        const bet = prompt("Enter the amount you want to bet per line: ");
        floatBet = parseFloat(bet)
        if (isNaN(floatBet) || floatBet <= 0 || floatBet > (moneyAvailable / betLines)){
            console.log("Invalid bet amount! Must be less than or equal to",
                moneyAvailable
            );
        }
        else{
            return floatBet;
        }
    }
};

const remainderBalance = (moneyAvailable, betAmount, betLines) => {
    let remainder = moneyAvailable - (betAmount * betLines)
    if (remainder < 0){
        remainder = parseFloat(moneyAvailable / betLines)
        console.log("Reduce bet amount to", remainder
        )
    }
    return remainder
};

const spinWheel = () => {
    // Reference to array symbols is constant
    // Contents of array can change
    const symbols = [];
    // Add n symbols into symbols as defined in GLOBAL_SYMBOL_COUNT
    for (const [symbol, count] of Object.entries(GLOBAL_SYMBOL_COUNT)){
        for (let i=0; i < count; i++){
            symbols.push(symbol)
        }
    }
    // console.log(symbols);

    const reels = [];
    for (let i=0; i < COLS; i++){
        // Add empty reel to reels based on the number of cols
        reels.push([]);
        // Copy symbols object into new object each iteration
        // Ensures that every reel has one of the specified symbols
        const symbolsPerReel = [...symbols];
        for (let j=0; j < ROWS; j++){
            let randomIndex = Math.floor(Math.random() * symbolsPerReel.length);
            let randomSymbol = symbolsPerReel[randomIndex]
            reels[i].push(randomSymbol)
            symbolsPerReel.splice(randomIndex, 1)
        }
    }

    // console.log("Reels", reels);
    return reels
};

const transposeArray = (arrangedReels) => {
    const transposed = [];
    for (let i=0; i < ROWS; i++){
        transposed.push([]);
        for (let j=0; j < COLS; j++){
            transposed[i].push(arrangedReels[j][i])
       };
    };

    // console.log("Transposed reels", transposed);
    return transposed
};

const displaySlots = (transposedReels) => {
    console.log()
    for (let i=0; i<ROWS; i++){
        let printStr = "| ";
        for (let j=0; j<COLS; j++){
            printStr += transposedReels[i][j]
            printStr += " | "
        };
        console.log("-------------")
        console.log(printStr)
    };
    console.log("-------------")
};

const checkWin = (generatedReels) => {
    let rowsWon = ROWS;
    for (let i=0; i<ROWS; i++){
        let extracted_row = generatedReels[i];
        for (let j=0; j < extracted_row.length; j++){
            if (extracted_row[0] != extracted_row[j]){
                rowsWon -= 1;
                break;
            }
        };
    };
    return rowsWon;
};


// Execution
let moneyAvailable = deposit();
let linesBetOn = getBetLines();
let amountBet = getBetAmount(moneyAvailable, linesBetOn);
let generatedReels = spinWheel();
let transposedReels = transposeArray(generatedReels);
let _ = displaySlots(transposedReels);
let won = checkWin(transposedReels);

console.log()
console.log("Money:", moneyAvailable)
console.log("Number of lines:", linesBetOn)
console.log("Bet amount:", amountBet)
console.log("Money available after placing bet: ",
    remainderBalance(moneyAvailable, amountBet, linesBetOn)
)
if (won){
    console.log()
    console.log("----------------------------")
    console.log("winner winner chicken dinner")
    console.log("----------------------------")
    console.log()
}
console.log("Game over!");
