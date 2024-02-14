class PacMan {
  constructor(lives, score, row, col) {
    // Encapsulated attributes
    this._lives = lives;
    this._score = score;
    this._position = { row, col };
  }
  // Public methods for controlled access/modification
  get get_lives() {
    return this._lives;
  }
  set set_lives(value) {

    this._lives = value;
  }
  get get_score() {
    return this._score;
  }
  set set_score(value) {
    this._score = value;
  }
  getPosition() {
    return { ...this._position };
  }
  moveUp() {
    this._position.row--;
  }

  moveDown() {
    this._position.row++;
  }

  moveLeft() {
    this._position.col--;
  }

  moveRight() {
    this._position.col++;
  }

  eatPellet(pellet) {
    this._score += pellet.value;
    if (pellet.isPowerUp) {
      // Implement power-up effects (e.g., stun)
    }
    pellet.remove();
  }

  getHitByGhost() {
    if (this.isPoweredUp()) {
      // Ghost gets stunned (implementation varies)
    } else {
      this._lives--;
    }
  }

  isPoweredUp() {
    // Check if power-up effect is active
    // (implementation depends on your power-up design)
  }

  // You can add more methods as needed
}

// Example usage:
const pacman = new PacMan(3, 0, 1, 1); 
//Constructor is used.
//Order of params matches the constructor
//In this case, 3=lives,0=score,1=row & 1=col
pacman.set_score(3); //Sets Score using setter
pacman.set_lives(2); // Sets lives using the setter

console.log("Lives:", pacman.get_lives()); // Access via getter
console.log("Score:", pacman.get_score()); // Access via getter

// Direct access to private attributes is prevented:
// pacman._lives = 10; // This would cause an error

// But you can modify values through controlled methods:
//***************************************************************************************************** */
class Ghost {
  constructor(name, position, speed) {
    this.name = name;
    this.position = position;
    this.speed = speed;
  }

  move() {
    // Basic movement logic (change position based on speed)
    console.log("Ghost is moving...");
  }

  changeDirection() {
    // Logic for changing direction
    console.log("Ghost is changing direction...");
  }
}

class RedGhost extends Ghost {
  constructor(name, position) {
    super(name, position, 2); // Call the base class constructor with faster speed
  }

  chaseAggressively() {
    console.log("Red Ghost is chasing aggressively!");
  }
}

class BlueGhost extends Ghost {
  constructor(name, position) {
    super(name, position, 1);// Call the base class constructor with slower speed
  }

  followPacManCautiously() {
    console.log("Blue Ghost is following Pac-Man cautiously...");
  }
}

// Example usage:
const Blinky = new RedGhost("Blinky", [10, 20])
Blinky.move();      // Inherited from Ghost
Blinky.chaseAggressively(); // Unique to RedGhost

const Inky = new BlueGhost("Inky", [5, 15]);
Inky.changeDirection(); // Inherited from Ghost
Inky.followPacManCautiously(); // Unique to BlueGhost


/***************************************************************** */


class Pellet {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    throw new Error("Abstract method");
  }

  remove() {
    throw new Error("Abstract method");
  }
}

class NormalPellet extends Pellet {
  constructor() {
    super(10);
  }

  getValue() {
    return super.getValue();
  }

  remove() {
    console.log("Normal pellet removed!");
  }
}

class PowerUpPellet extends Pellet {
  constructor() {
    super(50);
  }

  getValue() {
    return super.getValue();
  }

  remove() {
    console.log("Power-up pellet removed and activates power-up!");
  }
}

class PacMan {
  constructor() {
    this.score = 0;
  }

  eatPellet(pellet) {
    this.score += pellet.getValue();
    pellet.remove();
  }
}

// Example usage:
const pacman = new PacMan();
const normalPellet = new NormalPellet();
const powerPellet = new PowerUpPellet();

pacman.eatPellet(normalPellet); // Logs "Normal pellet removed!"
pacman.eatPellet(powerPellet); // Logs "Power-up pellet removed and activates power-up!"

console.log("Pac-Man score:", pacman.score); // Output: Pac-Man score: 60
