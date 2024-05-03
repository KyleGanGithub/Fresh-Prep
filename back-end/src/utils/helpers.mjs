import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { User } from "../mongoose/schemas/user.mjs";

class Helpers {
    static connectToDb () {
        mongoose.connect('mongodb://localhost:27017/fresh_prep')
        .then(() => console.log('Connected to Database'))
        .catch((err) => console.log(`Error during connection: ${err}`));
    }

    static async getUniqueId () {
        let uuid, duplicate;

        while (duplicate !== null) {
            uuid = uuidv4();
            duplicate = await User.findOne({ "_id": uuid });
        }

        return uuid;
    }

    static randomNum (min, max) {
        return Math.floor(Math.random(min, max));
    }
}

export default Helpers;