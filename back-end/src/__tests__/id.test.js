import IdHandler from "../handlers/id.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { jest, describe, it, expect } from "jest";

jest.mock("../mongoose/schemas/user.mjs");

describe('Id tests', () => {
    describe('GET /api/id', () => {
        const mockRequest = {};
        const mockResponse = { send: jest.fn() };

        it('should get unique Id', async () => {
            jest.spyOn(User, 'findOne').mockReturnValueOnce(null);

            await IdHandler.getUniqueId(mockRequest, mockResponse);
            expect(mockResponse.send).toHaveBeenCalled();
        });
    });
});