
class CityPedestrians {
    constructor(scene) {
        this.scene = scene;
        this.people = [];

        this.createPeople();

        console.log("OpenCity Pedestrians created!");
    }

    createPeople() {
        const colors = [
            new BABYLON.Color3(0.9, 0.1, 0.1),
            new BABYLON.Color3(0.1, 0.3, 0.9),
            new BABYLON.Color3(0.1, 0.7, 0.3),
            new BABYLON.Color3(0.9, 0.7, 0.1),
            new BABYLON.Color3(0.6, 0.2, 0.8)
        ];

        for (let i = 0; i < 12; i++) {
            const person = BABYLON.MeshBuilder.CreateCapsule(
                "pedestrian" + i,
                { height: 1.8, radius: 0.35 },
                this.scene
            );

            const material = new BABYLON.StandardMaterial(
                "pedestrianMat" + i,
                this.scene
            );

            material.diffuseColor = colors[i % colors.length];
            person.material = material;

            const side = i % 2 === 0 ? -1 : 1;

            person.position.set(
                side * 9,
                0.9,
                -160 + i * 28
            );

            this.people.push({
                mesh: person,
                speed: 1 + Math.random() * 0.7,
                direction: Math.random() < 0.5 ? 1 : -1
            });
        }
    }

    update() {
        const delta = this.scene.getEngine().getDeltaTime() / 1000;

        for (const person of this.people) {
            person.mesh.position.z +=
                person.direction * person.speed * delta;

            if (person.mesh.position.z > 190) {
                person.direction = -1;
            }

            if (person.mesh.position.z < -190) {
                person.direction = 1;
            }

            person.mesh.rotation.y =
                person.direction > 0 ? 0 : Math.PI;
        }
    }
}

window.CityPedestrians = CityPedestrians;
