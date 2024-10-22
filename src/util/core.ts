export function initiateGoal(size: number) {
    function shuffle(array: number[]) {
        let currentIndex: number = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    let buffer = Array.from({length: 10}, (_value: string, key) => key);
    const goal = shuffle(buffer).slice(0, size);
    console.log(goal);
    console.log(size);

    return goal;
}

export  function getCurrentScore(currentMove: string, goal: number[]) {
    let moveArr = Array.from(currentMove), score = { hits : 0, precise : 0 };

    for (let index = 0; index < moveArr.length; index++) {
        let goalIndex = goal.indexOf(parseInt(moveArr[index]));
        if (goalIndex !==-1) {
            score.hits +=1;
            if (goalIndex === index) {
                score.precise +=1;
            }
        }
    }

    return `${score.hits} : ${score.precise}`;
}

export function isMoveHasUniqueDigits(move: string)
{
    let arr = move.split('');
    let newArr = arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });

    return (newArr.length === arr.length);
}
