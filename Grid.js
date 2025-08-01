import { player } from "./Entities.js"

class GridObject {
    #backgroundSprites = ["🌳", "🌲", "🌴", "🌵"];

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    #generateLineObject (yCoord) {
        let tileObject = {}
        for(let i = 0; i < this.width; i++) {
            const randomSprite = this.#backgroundSprites[Math.floor(Math.random()* this.#backgroundSprites.length)];
            tileObject[i] = {sprite: randomSprite, steppedOn: false, xCoord: i, yCoord: yCoord};
        } 
        return tileObject;
    }

    generateRows() {
        let lineObject = {}
        for (let i = 0; i < this.height; i++){
            let line = this.#generateLineObject(i);
            lineObject[`row${i}`] = line;
        }
        lineObject[`row${this.height - 1}`][`${this.width - 1}`].sprite = "💎";
        this.lObj = lineObject;
        return lineObject;
    }

    displayMap(map) {
        console.log("Forest Explorer\n")
        for (let i = this.height - 1; i >= 0; i--) {
            let mapRow = "";
            for (let j = 0; j < this.width; j++) {
                mapRow += map[`row${i}`][j].sprite;
                mapRow += "     ";
            }
            console.log(mapRow);
        }
        console.log(`\nPlayer ${player.sprite}`)
        console.log(`<ATK: ${player.attack}> <DEF: ${player.defense}> <HP: ${player.hp}>\n`)
    }

    changeSprite(player, xCoord, yCoord) {
        console.clear()
        this.lObj[`row${yCoord}`][xCoord].sprite = player.sprite;
        this.lObj[`row${yCoord}`][xCoord].steppedOn = true;
        for (let i = this.height - 1; i >= 0; i--) {
            for (let j = 0; j < this.width; j++) {
                if (this.lObj[`row${i}`][j].steppedOn && ( this.lObj[`row${i}`][j].xCoord !== player.xCoord || this.lObj[`row${i}`][j].yCoord !== player.yCoord) ) {
                    this.lObj[`row${i}`][j].sprite = "🐾";
                    this.lObj[`row${i}`][j].alreadyExplored = true;
                }
            }
        }

        this.displayMap(this.lObj);
    }
}

export { GridObject }
