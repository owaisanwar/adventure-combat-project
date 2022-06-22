const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);

    this.items = []
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
    let item = this.currentRoom.items.find(ele => ele.name === itemName);
    let indexOf = this.currentRoom.items.indexOf(ele => ele.name === itemName);
    this.currentRoom.items.splice(indexOf, 1);
    this.items.push(item);
    return this.items;

  }

  dropItem(itemName) {
    let item = this.getItemByName(itemName);

    this.currentRoom.items.push(item);
    let indexOf = this.items.indexOf(this.getItemByName(itemName));
    this.items.splice(indexOf, 1);
    return this.items;
  }

  eatItem(itemName) {
    let item = this.getItemByName(itemName);
    if(item instanceof Food) {
      let indexOf = this.items.indexOf(item);
      this.items.splice(indexOf, 1);
      return this.items;
    }
  }

  getItemByName(name) {
    // Fill this in
    return this.items.find(element => element.name == name);


  }

  hit(name) {
    // Fill this in

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
