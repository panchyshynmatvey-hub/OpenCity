
class GameCamera {

    constructor(scene, canvas) {

        this.scene = scene;
        this.canvas = canvas;
        this.target = null;

        this.camera = new BABYLON.FollowCamera(
            "gameCamera",
            new BABYLON.Vector3(0, 5, -10),
            scene
        );

        // Camera settings
        this.camera.radius = 12;
        this.camera.heightOffset = 5;
        this.camera.rotationOffset = 180;

        // Smooth movement
        this.camera.cameraAcceleration = 0.04;
        this.camera.maxCameraSpeed = 15;

        // Camera limits
        this.camera.lowerRadiusLimit = 6;
        this.camera.upperRadiusLimit = 20;

        this.camera.lowerHeightOffsetLimit = 2;
        this.camera.upperHeightOffsetLimit = 10;

        this.camera.fov = 0.85;

        scene.activeCamera = this.camera;

        console.log("OpenCity Camera created!");

    }

    follow(target) {

        if (!target) return;

        this.target = target;

        this.camera.lockedTarget = target;

    }

    update() {

        if (!this.target) return;

        this.camera.lockedTarget = this.target;

    }

}

window.GameCamera = GameCamera;
