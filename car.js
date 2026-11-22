
class GameCar {
    constructor(scene, physics) {
        this.scene = scene;
        this.physics = physics;
        this.speed = 0;
        this.maxSpeed = 0.45;
        this.acceleration = 0.008;
        this.turnSpeed = 0.035;

        this.createCar();
    }

    createCar() {
        this.car = new BABYLON.TransformNode("car", this.scene);

        const bodyMat = new BABYLON.StandardMaterial("carBodyMat", this.scene);
        bodyMat.diffuseColor = new BABYLON.Color3(0.8, 0.08, 0.06);

        const body = BABYLON.MeshBuilder.CreateBox("carBody", {
            width: 2,
            height: 0.65,
            depth: 4
        }, this.scene);

        body.parent = this.car;
        body.position.y = 0.8;
        body.material = bodyMat;

        const cabinMat = new BABYLON.StandardMaterial("cabinMat", this.scene);
        cabinMat.diffuseColor = new BABYLON.Color3(0.12, 0.2, 0.28);

        const cabin = BABYLON.MeshBuilder.CreateBox("carCabin", {
            width: 1.55,
            height: 0.8,
            depth: 1.8
        }, this.scene);

        cabin.parent = this.car;
        cabin.position.set(0, 1.45, -0.2);
        cabin.material = cabinMat;

        const wheelMat = new BABYLON.StandardMaterial("wheelMat", this.scene);
        wheelMat.diffuseColor = new BABYLON.Color3(0.04, 0.04, 0.04);

        this.wheels = [];

        for (const x of [-1, 1]) {
            for (const z of [-1.25, 1.25]) {
                const wheel = BABYLON.MeshBuilder.CreateCylinder("wheel", {
                    diameter: 0.85,
                    height: 0.3,
                    tessellation: 16
                }, this.scene);

                wheel.parent = this.car;
                wheel.position.set(x, 0.45, z);
                wheel.rotation.z = Math.PI / 2;
                wheel.material = wheelMat;

                this.wheels.push(wheel);
            }
        }

        this.car.position.y = 0;
        this.physics.enableCollisions(this.car);
    }

    update(input) {
        if (input.forward) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        } else if (input.backward) {
            this.speed = Math.max(this.speed - this.acceleration, -this.maxSpeed * 0.5);
        } else {
            this.speed *= 0.96;
        }

        if (Math.abs(this.speed) > 0.005) {
            if (input.left) {
                this.car.rotation.y -= this.turnSpeed;
            }
            if (input.right) {
                this.car.rotation.y += this.turnSpeed;
            }
        }

        const direction = new BABYLON.Vector3(
            Math.sin(this.car.rotation.y),
            0,
            Math.cos(this.car.rotation.y)
        );

        this.physics.move(this.car, direction, this.speed);

        for (const wheel of this.wheels) {
            wheel.rotation.x += this.speed * 0.08;
        }
    }

    getTarget() {
        return this.car;
    }
}

window.GameCar = GameCar;
