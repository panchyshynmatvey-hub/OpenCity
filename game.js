
class OpenCityGame {
    constructor() {
        this.engine = new GameEngine();
        this.scene = this.engine.scene;

        this.world = new GameWorld(this.scene);
        this.input = new GameInput();
        this.physics = new GamePhysics(this.scene);

        this.car = new GameCar(this.scene, this.physics);
        this.player = new GamePlayer(this.scene);

        this.camera = new GameCamera(
            this.scene,
            this.engine.canvas
        );

        this.camera.follow(this.car.getTarget());

        this.scene.onBeforeRenderObservable.add(() => {
            this.car.update(this.input);
            this.camera.update();
        });

        this.engine.start();

        console.log("OpenCity is running!");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.openCity = new OpenCityGame();
});
