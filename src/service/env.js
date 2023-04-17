const dotenv = require('dotenv');
dotenv.config();

class EnvService {
    constructor() {
        this.env = process.env;
    }

    get(key) {
        return this.env[key];
    }

    set(key, value) {
        this.env[key] = value;
    }

    delete(key) {
        delete this.env[key];
    }

    getEnv() {
        return this.env;
    }

    makeArray() {
        const array = [];
        for (const key in this.env) {
            array.push(`${key}=${this.env[key]}`);
        }

        return array;
    }

    makeArrayWithName(name) {
        if (!name) throw new Error('No name provided');

        const array = process.env[name].split(',');



        return array;
    }
}

module.exports = EnvService;