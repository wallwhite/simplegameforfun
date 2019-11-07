// @flow
import { Engine, Render, Runner, Composites, Common, MouseConstraint, Mouse, World, Bodies } from 'matter-js';

class Character {
    engine: Engine;

    Render: Render;

    Runner: Runner;

    Composites: Composites;

    Common: Common;

    MouseConstraint: MouseConstraint;

    Mouse: Mouse;

    World: World;

    Bodies: Bodies;

    constructor() {
        this.Render = Render;
        this.Runner = Runner;
        this.Composites = Composites;
        this.Common = Common;
        this.MouseConstraint = MouseConstraint;
        this.Mouse = Mouse;
        this.World = World;
        this.Bodies = Bodies;

        this.init();
    }

    init = () => {
        this.engine = Engine.create();

        console.log(this.engine);
        const render = Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: 800,
                height: 600,
                showAngleIndicator: true,
            },
        });

        Render.run(render);
        const runner = Runner.create();

        Runner.run(runner, this.engine);
    };
}

export default Character;
