import Print from "../helper/print.js";
export default class Exception extends Error {
    static WrongPassword = "Wrong password";
    static UserNotFound = "User not found";
    static UserAlreadyExist = "User already exist";
    static CannotUser = "Cannot use user";
    static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password";
    constructor(message,validationErrors={}) {

        super(`message: ${Object.keys(validationErrors).length > 0 ? JSON.stringify(validationErrors) : JSON.stringify(message)}`);
        Print.error(message,validationErrors);
        this.validationErrors = validationErrors;

    }
}