class World {
    constructor() {

    }

    createPowerPlant() {
        return new PowerPlant();
    }

    createHousehold() {
        return new Household();
    }

    connectHouseholdToPowerPlant(household, powerPlant) {
        household.connectPowerplant(powerPlant);
    }

    connectHouseholdToHousehold(household1, household2) {
        household1.connectToHousehold(household2);
    }

    disconnectHouseholdFromPowerPlant(household, powerPlant) {
        household.disconnectPowerplant(powerPlant);
    }

    killPowerPlant(powerPlant) {
        powerPlant.kill();
    }

    repairPowerPlant(powerPlant) {
        powerPlant.repair();
    }

    householdHasEletricity(household) {
        household.hasElectricityInNetwork();
    }
}


class PowerPlant {
    constructor() {
        this.isAlive = true;
    }

    kill() {
        this.isAlive = false;
    }

    repair() {
        this.isAlive = true;
    }

};

class Household {
    constructor() {
        this.connectedPowerplants = [];
        this._coupledHousehold = null;
    }

    hasElectricityOnCurrentHousehold() {
        for (let i = 0, arr = this.connectedPowerplants; i < arr.length; i++) {
            if (arr[i].isAlive) {
                return true;
            }
        };

        return false;
    }

    hasElectricityInNetwork() {
        let currentHousehold = this;
        let checked = [];
        while (currentHousehold != null) {
            if (currentHousehold.hasElectricityOnCurrentHousehold()) {
                return true;
            };

            if(checked.includes(currentHousehold._coupledHousehold)) {
                break;
            }

            checked.push(currentHousehold);
            currentHousehold = currentHousehold._coupledHousehold;
        };

        return false;
    }

    connectPowerplant(powerPlant) {
        this.connectedPowerplants.push(powerPlant);
    }

    disconnectPowerplant(powerPlant) {
        for (let i = 0, arr = this.connectedPowerplants; i < arr.length; i++) {
            if (arr[i] === powerPlant) {
                arr.splice(i, 1);
            };
        };
    }

    connectToHousehold(household) {
        this._coupledHousehold = household;
    }

    disconnectToHousehold() {
        this._coupledHousehold = null;
    }

};

