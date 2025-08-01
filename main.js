import { GridObject } from "./Grid.js";
import { player } from "./Entities.js"
import { promptMovement } from "./Movement.js";
import inquirer from "inquirer";

let map = new GridObject(10, 10);
let mapObj = map.generateRows();
map.changeSprite(player, 0, 0);

const restartGame = async () => {
    await inquirer
    .prompt([
        {
        type: 'list',
        name: 'direction',
        message: 'Would you like to restart?',
        choices: [
            'Yes',
            'No',
        ],
        },
    ])
    .then((move) => {
        if (player.move(move.direction.toLowerCase())) {
            mapObj = map.generateRows();
            player.isAlive = true;
            player.attack = 5;
            player.defense = 10;
            player.hp = 20;
            player.xCoord = 0;
            player.yCoord = 0;
            console.clear();
            map.changeSprite(player, 0, 0);
            promptMovement();
        } else {
    }
    });
}

await promptMovement();

export { map, mapObj, restartGame }