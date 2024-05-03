import UserHandler from "../handlers/users.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { jest, describe, beforeEach, it, expect } from "jest";

jest.mock("../mongoose/schemas/user.mjs");

describe('User endpoints', () => {
    const mockResponse = {
        sendStatus: jest.fn(),
        send: jest.fn(),
    }

    const savedUser = {
        "_id": "1c5aad29-7600-4aa1-86a7-67645cee8dcc",
        "username": "test",
        "displayName": "test",
        "password": "password",
        "__v": 0
    };

    describe('GET /api/users/:_id', () => {
        it('should get user data if user exists', async() => {

            const mockRequest = { "params": { "_id": "1c5aad29-7600-4aa1-86a7-67645cee8dcc" }};
            jest.spyOn(User, 'findOne').mockReturnValueOnce(savedUser);

            await UserHandler.getUserById(mockRequest, mockResponse);
            expect(mockResponse.send).toHaveBeenCalled();
        });

        it('should return 400 if input is malformed', async () => {
            const mockRequest = { params: { _id: "1c5aad29-7600-4aa1-86a7" } };

            await UserHandler.getUserById(mockRequest, mockResponse);
            expect(mockResponse.sendStatus).toHaveBeenCalled();
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
        });

        it('should return 400 if user does not exist', async () => {
            const mockRequest = { params: { _id: "c4f51d34-8ec5-4a94-99f0-550564c4b6b3" } };
            jest.spyOn(User, 'findOne').mockReturnValueOnce(null);

            await UserHandler.getUserById(mockRequest, mockResponse);
            expect(mockResponse.sendStatus).toHaveBeenCalled();
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe('POST /api/users', () => {
        const mockRequest = { "username": "test", "displayName": "test", "password": "password" };

        beforeEach(() => {
            jest.spyOn(User, "findOne").mockReturnValueOnce(null);
        });

        it('should save user data if username is unique', async () => {
            jest.spyOn(User.prototype, 'save').mockReturnValueOnce(savedUser);

            await UserHandler.saveUser(mockRequest, mockResponse);
            expect(User).toHaveBeenCalled();
            expect(mockResponse.sendStatus).toHaveBeenCalled();
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(201, savedUser);
        });

        it('should fail to save user data if username is a duplicate of an existing entry', async () => {
            jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.reject("Failed to save user"));

            await UserHandler.saveUser(mockRequest, mockResponse);
            expect(User).toHaveBeenCalled();
            expect(mockResponse.sendStatus).toHaveBeenCalled();
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
        });
    });
});

