// @flow

type ActionType = (time: number) => void;

class PixiActions {
    ticker: Object;

    constructor(app: Object) {
        this.ticker = app.ticker;
    }

    addAction = (action: ActionType) => {
        this.ticker.add(action);
    };
}

export default PixiActions;
