function TwoHeapsMoveResults(currentTask) {
    const results = [];

    for (let sum = currentTask.maxSum; sum >= currentTask.minSum; sum--) {
        let moves = [];

        for (let actionKey in currentTask.action) {
            if (currentTask.action.hasOwnProperty(actionKey)) {
                const [newHeap1, newHeap2] = currentTask.action[actionKey](...results[sum]);
                moves.push(newHeap1 + newHeap2);
            }
        }

        if (Math.max(...moves) >= currentTask.maxSum) {
            results[sum] = [1, 1]; // Победа для суммы куч
        } else {
            let resultMoves = moves.map(move => results[move]);
            let bestMove = Math.min(...resultMoves.filter(el => el[0] > 0));

            results[sum] = bestMove[0] >= 0 ? [-bestMove[0] - 1, -bestMove[1] - 1] : [-bestMove[0], -bestMove[1]];
        }
    }

    console.log(results);
    return results;
}
