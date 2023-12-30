class Task {
    constructor(min, max, action) {
        this.min = min;
        this.max = max;
        this.action = action;
        this.text = this.generateTaskText();
    }

    generateTaskText() {
        let actionsDescription = '';
        let actionNumber = 1;

        for (let actionKey in this.action) {
            const actionDescription = this.action[actionKey].toString().replace('S => ', '');
            actionsDescription += `<br>${actionNumber}. ${actionDescription}`;
            actionNumber++;
        }

        return `
            Перед вами куча камней. Вы играете против компьютера. Ходы делаются поочередно. <br>
            За один ход можно: ${actionsDescription} <br>
            Вы сами устанавливаете начальное количество камней(${this.min} <= S < ${this.max}). <br>
            В итоге выиграет тот, кто первый наберет ${this.max} камней в куче.
        `;
    }
}

const task1 = new Task(
    1, 30, { action1: S => S + 1, action2: S => S + 3, action3: S => S * 2 }
);

let currentTask;
const selectButton = document.querySelector(".select-s");
const taskText = document.querySelector(".current-task");
const heap = document.querySelector(".heap-content");
const inputForS = document.querySelector(".input-for-s");
let buttonsGame = document.querySelector(".buttonsMoves");
const NotesContainer = document.querySelector(".table-moovs");

let resMoves;
CreateGame(task1);
let S = 0;

function CreateGame(task) {
    currentTask = task;
    taskText.innerHTML = currentTask.text;
    selectButton.onclick = function () { StartGame(); };
}

function StartGame() {
    S = parseInt(inputForS.value, 10);

    if (S < currentTask.min || S >= currentTask.max) {
        console.error("Введите корректное число в диапазоне от " + currentTask.min + " до " + currentTask.max);
        return;
    }

    NewNote("Изначальное S")
    buttonsGame.innerHTML = ''
    NotesContainer.innerHTML = ''

    resMoves = OneHeapMoveResults(currentTask);
    heap.innerHTML = S;

    for (let el in currentTask.action) {
        let act = currentTask.action[el].toString().replace('S => ', '');
        buttonsGame.insertAdjacentHTML('beforeend', `<button class="action-btn-${el}" type="button" onclick="PlayerMove('${el}')">${act}</button>`);
    }
}

function PlayerMove(actionName) {
    S = currentTask.action[actionName](S);
    NewNote("Player")
    if (S >= currentTask.max) {
        heap.textContent = S;
        alert("Вы победили, набрав " + S + " камней");
        S = 0;
        inputForS.value = 0;
        return;
    }

    heap.textContent = S;
    ApponendMove(S)
}

function ApponendMove(Stonks) {
    let currentMoves = [];
    let currentMovesRes = [];

    for (let act in currentTask.action) {
        currentMoves.push(currentTask.action[act](Stonks));
        currentMovesRes.push(resMoves[currentTask.action[act](Stonks)]);
    }

    let maxMove = 0; 
    let bestMove = 999; 
    let bestMoveRes;

    for (let i = 0; i < currentMoves.length; i++) {
        if (currentMoves[i] > maxMove)
            maxMove = currentMoves[i];

        if (currentMovesRes[i] < bestMove) {
            bestMove = currentMovesRes[i];
            bestMoveRes = currentMoves[i];
        }
    }

    if (maxMove >= currentTask.max) {
        S = maxMove;
        heap.textContent = S;
        NewNote("Computer")
        alert("Вы проиграли, соперник набрал " + maxMove + " камней");
        S = 0;
        inputForS.value = 0;
        return;
    }

    for (let i = 0; i < currentMovesRes.length; i++) {
        if (currentMovesRes[i] < 0 && currentMovesRes[i] >= bestMove) {
            bestMove = currentMovesRes[i];
            bestMoveRes = currentMoves[i];
        }
    if (currentMovesRes[i] > 0 && currentMovesRes[i] > bestMove && bestMove > 0) {
            bestMove = currentMovesRes[i];
            bestMoveRes = currentMoves[i];
        }
    }

    S = bestMoveRes;
    NewNote("Computer")
    heap.textContent = S;
}

function NewNote(Player){
    NotesContainer.insertAdjacentHTML('beforeend', `<p>${Player}: -> ${S}</p>`);
}