
// ==================================
// OPENCITY - GAME ENGINE
// Version 0.1
// ==================================

class GameEngine {

    constructor() {
        this.canvas = document.getElementById("gameCanvas");

        this.engine = new BABYLON.Engine(
            this.canvas,
            true,
            {
                preserveDrawingBuffer: true,
                stencil: true,
                antialias: true
            }
        );

        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color4(
            0.53, 0.81, 0.92, 1
        );

        this.scene.collisionsEnabled = true;

        this.createLighting();

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        console.log("OpenCity Engine started!");
    }

    createLighting() {

        this.ambientLight =
            new BABYLON.HemisphericLight(
                "ambient",
                new BABYLON.Vector3(0, 1, 0),
                this.scene
            );

        this.ambientLight.intensity = 0.8;

        this.sun = new BABYLON.DirectionalLight(
            "sun",
            new BABYLON.Vector3(-1, -2, 1),
            this.scene
        );

        this.sun.position = new BABYLON.Vector3(
            30, 50, -30
        );

        this.sun.intensity = 1.2;
    }

    start() {

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

    }

}

// Global game engine
window.GameEngine = GameEngine;
