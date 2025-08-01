import inquirer from "inquirer";
import { player, getRandomEvent} from "./Entities.js"
import { map, mapObj, restartGame } from "./main.js"

const promptMovement = async () => {
    await inquirer
    .prompt([
        {
        type: 'list',
        name: 'direction',
        message: 'Which direction would you like to move?',
        choices: [
            'Up',
            'Down',
            'Left',
            'Right',
        ],
        },
    ])
    .then((move) => {
        if (player.move(move.direction.toLowerCase())) {
            map.changeSprite(player, player.xCoord, player.yCoord);
             if (getRandomEvent() === "win") {
                console.log("You win!")
                restartGame();
             }
        } else {
            console.clear();
            map.displayMap(mapObj);
            console.log(`You can't move ${move.direction.toLowerCase()} any further`);
            promptMovement();
        }
    });
}

export { promptMovement }