function OneHeapMoveResults(currentTask) {
    let res = []

    for (let i = currentTask.max - 1; i >= currentTask.min; i--) {
        let moves = []

        for (act in currentTask.action) {
            moves.push(currentTask.action[act](i))
        }

        if (Math.max.apply(null, moves) >= currentTask.max)
            res[i] = 1;

        else {
            resMove = []
            for (move of moves) {
                resMove.push(res[move])
            }

            let bestMove = Math.min.apply(null, resMove);

            for (el of resMove) {
                if (el < 0 && el > bestMove)
                    bestMove = el
                if (el > 0 && el > bestMove && bestMove > 0)
                    bestMove = el
            }

            bestMove < 0 ? bestMove = (bestMove - 1) * -1 : bestMove = bestMove * -1
            res[i] = bestMove
        }
    }

    console.log(res)
    return res
}
