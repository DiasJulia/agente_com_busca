function setup() {
    createCanvas(400, 400);
    agent = new Vehicle();
    world = new World();
}

function draw() {
    //background(220);

    agent.show();
    agent.update();

    world.update();
}