const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom; // An instance: room
        this.items = []; // array of instances
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // don't forget about the room instance 'currentRoom'
        // What we are doing is taking an item from 'currentRoom'
        // and putting it into 'this.items'

        // we should be able to do indexOf to get the index
        // of the instance in this array
        // Once we got the index we could splice a piece from the 'currentRoom'
        // and push it into 'this.items'

        const index = this.currentRoom.items.indexOf(this.currentRoom.getItemByName(itemName));
        this.items.push(...this.currentRoom.items.splice(index, 1));
        return true;
    }

    dropItem(itemName) {
        const index = this.items.indexOf(this.getItemByName(itemName));
        this.currentRoom.items.push(...this.items.splice(index, 1));
        return true;
    }

    eatItem(itemName) {
        const item = this.getItemByName(itemName);
        if(!(item instanceof Food)) return false;

        const index = this.items.indexOf(item);
        this.items.splice(index, 1);

        return true;
    }

    getItemByName(name) {
        // We need to iterate thru the array for said item
        // if said item is not found, return false;

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (item.name === name) return item;
        }

        return false;
    }
}

module.exports = {
  Player,
};
