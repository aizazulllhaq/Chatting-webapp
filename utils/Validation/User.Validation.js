import { check } from "express-validator";

export const loginValidation = [
    check("email", "Email is required")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true }),
    check("password", "Password is required").isStrongPassword({
        minLength: 6,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
    }),
];

export const signUpValidation = [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Email is Required")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true }),
    check("password", "Password must be strong").isStrongPassword({
        minLength: 6,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
    }),
    check("profileImg").custom((_, { req }) => {
        if (!req.file) {
            throw new Error("Profile is required");
        }
        const mimeType = req.file.mimetype;
        if (
            mimeType === "image/jpg" ||
            mimeType === "image/png" ||
            mimeType === "image/jpeg"
        ) {
            return true;
        } else {
            throw new Error(
                "Please upload an image in (png, jpg, jpeg) format only"
            );
        }
    }),
];