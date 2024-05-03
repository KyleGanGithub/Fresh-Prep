import { User } from "../mongoose/schemas/user.mjs";
import { validate as uuidValidate } from 'uuid';

class UserHandler {
    static async getUserById (request, response) {
        const isValidId = uuidValidate(request.params._id);
        if (!isValidId) return response.sendStatus(400);

        const user = await User.findOne({ "_id": request.params._id });
        if (user == null) return response.sendStatus(400);

        response.send(user);
    }

    static async saveUser (request, response) {
        const { body } = request;
        const newUser = new User(body);

        try {
            const savedUser = await newUser.save();
            return response.sendStatus(201, savedUser);
        } catch (err) {
            console.log(err);
            return response.sendStatus(400);
        }
    }
}

export default UserHandler;