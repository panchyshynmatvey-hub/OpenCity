
class GameInput {

    constructor() {

        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        this.keys = {};

        window.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.updateKeys();
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.updateKeys();
        });

        this.createMobileControls();

    }

    updateKeys() {

        this.forward =
            !!(this.keys["w"] || this.keys["arrowup"]);

        this.backward =
            !!(this.keys["s"] || this.keys["arrowdown"]);

        this.left =
            !!(this.keys["a"] || this.keys["arrowleft"]);

        this.right =
            !!(this.keys["d"] || this.keys["arrowright"]);

    }

    createMobileControls() {

        const controls = document.createElement("div");

        controls.id = "mobileControls";

        controls.innerHTML = `
            <div class="drive-controls">
                <button data-control="left">◀</button>
                <button data-control="right">▶</button>
            </div>

            <div class="pedal-controls">
                <button data-control="backward">▼</button>
                <button data-control="forward">▲</button>
            </div>
        `;

        document.body.appendChild(controls);

        controls.querySelectorAll("button").forEach(button => {

            const action = button.dataset.control;

            const press = (e) => {
                e.preventDefault();
                this[action] = true;
            };

            const release = (e) => {
                e.preventDefault();
                this[action] = false;
            };

            button.addEventListener("pointerdown", press);
            button.addEventListener("pointerup", release);
            button.addEventListener("pointercancel", release);
            button.addEventListener("pointerleave", release);

        });

    }

}

window.GameInput = GameInput;
