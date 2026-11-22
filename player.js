
class GamePlayer {
    constructor(scene) {
        this.scene = scene;
        this.createPlayer();
    }

    createPlayer() {
        const material = new BABYLON.StandardMaterial(
            "playerMaterial",
            this.scene
        );
        material.diffuseColor = new BABYLON.Color3(0.1, 0.3, 0.9);

        this.player = BABYLON.MeshBuilder.CreateCapsule(
            "player",
            {
                height: 2,
                radius: 0.45
            },
            this.scene
        );

        this.player.position.set(5, 1, 5);
        this.player.material = material;
        this.player.checkCollisions = true;
        this.player.ellipsoid = new BABYLON.Vector3(0.45, 1, 0.45);
    }

    getTarget() {
        return this.player;
    }
}

window.GamePlayer = GamePlayer;
