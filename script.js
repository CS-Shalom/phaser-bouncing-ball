let WIDTH = 800;
let HEIGHT = 300;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let lives = 10; // Initial number of lives
let livesText; // Text object to display lives

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Display the number of lives on the screen
    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        fontSize: '20px',
        fill: '#ffffff'
    });

    // Make the ball interactive and listen for pointerdown (click) events
    ball.setInteractive();
    ball.on('pointerdown', () => {
        // Increase the number of lives by 1
        lives++;
        livesText.setText(`Lives: ${lives}`);
    });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    // Check for collisions with walls
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1; // Reverse direction
        reduceLives(); // Reduce lives
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1; // Reverse direction
        reduceLives(); // Reduce lives
    }
}

// Function to reduce lives and check for game over
function reduceLives() {
    lives--;
    livesText.setText(`Lives: ${lives}`);

    if (lives <= 0) {
        // End the game
        livesText.setText('Game Over');
        ball.setVisible(false); // Hide the ball
        this.scene.pause(); // Pause the scene
    }
}
