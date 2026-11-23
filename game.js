
class OpenCityGame {
    constructor() {
        this.engine = new GameEngine();
        this.scene = this.engine.scene;

        this.world = new GameWorld(this.scene);
        this.pedestrians = new CityPedestrians(this.scene);
        this.input = new GameInput();
        this.physics = new GamePhysics(this.scene);

        this.car = new GameCar(this.scene, this.physics);
        this.player = new GamePlayer(this.scene);

        this.camera = new GameCamera(
            this.scene,
            this.engine.canvas
        );

        this.camera.follow(this.car.getTarget());
        this.isDriving = true;
        this.player.player.setEnabled(false);

this.input.exit = false;
this.input.enter = false;

this.exitCar = () => {
    if (!this.isDriving) return;

    this.isDriving = false;
    this.player.player.setEnabled(true);

    this.player.player.position.x =
        this.car.car.position.x + 3;

    this.player.player.position.z =
        this.car.car.position.z;

    this.camera.follow(this.player.getTarget());
};

this.enterCar = () => {
    if (this.isDriving) return;

    this.isDriving = true;
    this.player.player.setEnabled(false);

    this.camera.follow(this.car.getTarget());
};

        
this.scene.onBeforeRenderObservable.add(() => {
   this.pedestrians.update(); 
    if (this.isDriving) {
        this.car.update(this.input);

        if (this.input.exit) {
            this.exitCar();
        }
    } else {
        this.player.update(this.input);

        if (this.input.enter) {
            this.enterCar();
        }
    }

    this.camera.update();
});


        this.engine.start();

        console.log("OpenCity is running!");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.openCity = new OpenCityGame();
});
