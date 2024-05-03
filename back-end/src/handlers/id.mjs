import Helpers from "../utils/helpers.mjs";

class IdHandler {
    static async getUniqueId (request, response) {
        response.send(await Helpers.getUniqueId());
    }
}

export default IdHandler;