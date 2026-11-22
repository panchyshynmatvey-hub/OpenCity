
class GamePhysics {
    constructor(scene) {
        this.scene = scene;
        this.gravity = -9.81;
        console.log("OpenCity Physics created!");
    }

    enableCollisions(mesh, options = {}) {
        mesh.checkCollisions = true;

        mesh.ellipsoid = options.ellipsoid ||
            new BABYLON.Vector3(1, 1, 1);

        mesh.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
    }

    move(mesh, direction, speed) {
        if (!mesh || !direction) return;

        const movement = direction.scale(speed);
        mesh.moveWithCollisions(movement);
    }
}

window.GamePhysics = GamePhysics;
