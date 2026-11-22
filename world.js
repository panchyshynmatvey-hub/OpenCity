
class GameWorld {

    constructor(scene) {
        this.scene = scene;

        this.createMaterials();
        this.createGround();
        this.createRoad();
        this.createRoadMarkings();
        this.createBuildings();
        this.createTrees();

        console.log("OpenCity World created!");
    }

    createMaterials() {

        this.grassMat = new BABYLON.StandardMaterial(
            "grassMat", this.scene
        );
        this.grassMat.diffuseColor =
            new BABYLON.Color3(0.16, 0.42, 0.19);

        this.roadMat = new BABYLON.StandardMaterial(
            "roadMat", this.scene
        );
        this.roadMat.diffuseColor =
            new BABYLON.Color3(0.12, 0.13, 0.15);

        this.lineMat = new BABYLON.StandardMaterial(
            "lineMat", this.scene
        );
        this.lineMat.diffuseColor =
            new BABYLON.Color3(1, 0.85, 0.1);

        this.buildingMat = new BABYLON.StandardMaterial(
            "buildingMat", this.scene
        );
        this.buildingMat.diffuseColor =
            new BABYLON.Color3(0.65, 0.69, 0.74);

        this.treeMat = new BABYLON.StandardMaterial(
            "treeMat", this.scene
        );
        this.treeMat.diffuseColor =
            new BABYLON.Color3(0.08, 0.35, 0.12);
    }

    createGround() {

        const ground = BABYLON.MeshBuilder.CreateGround(
            "ground",
            {
                width: 500,
                height: 500
            },
            this.scene
        );

        ground.material = this.grassMat;
        ground.checkCollisions = true;

    }

    createRoad() {

        const road = BABYLON.MeshBuilder.CreateBox(
            "mainRoad",
            {
                width: 14,
                height: 0.12,
                depth: 400
            },
            this.scene
        );

        road.position.y = 0.06;
        road.material = this.roadMat;
        road.checkCollisions = true;

    }

    createRoadMarkings() {

        for (let z = -190; z < 200; z += 12) {

            const line = BABYLON.MeshBuilder.CreateBox(
                "roadLine",
                {
                    width: 0.25,
                    height: 0.03,
                    depth: 5
                },
                this.scene
            );

            line.position.set(0, 0.14, z);
            line.material = this.lineMat;

        }

    }

    createBuildings() {

        for (let i = 0; i < 12; i++) {

            const height = 8 + Math.random() * 20;
            const side = i % 2 === 0 ? -1 : 1;

            const building =
                BABYLON.MeshBuilder.CreateBox(
                    "building" + i,
                    {
                        width: 9,
                        height: height,
                        depth: 10
                    },
                    this.scene
                );

            building.position.set(
                side * (18 + Math.random() * 18),
                height / 2,
                -150 + i * 25
            );

            building.material = this.buildingMat;
            building.checkCollisions = true;

        }

    }

    createTrees() {

        for (let i = 0; i < 35; i++) {

            const x = (Math.random() < 0.5 ? -1 : 1)
                * (15 + Math.random() * 45);

            const z = Math.random() * 350 - 175;

            const trunk = BABYLON.MeshBuilder.CreateCylinder(
                "trunk" + i,
                {
                    height: 2.5,
                    diameter: 0.5
                },
                this.scene
            );

            trunk.position.set(x, 1.25, z);

            const leaves = BABYLON.MeshBuilder.CreateSphere(
                "leaves" + i,
                {
                    diameter: 3,
                    segments: 8
                },
                this.scene
            );

            leaves.position.set(x, 3.5, z);
            leaves.material = this.treeMat;

        }

    }

}

window.GameWorld = GameWorld;
