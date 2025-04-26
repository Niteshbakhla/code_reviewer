
export const validateRegister = [
            body("name")
                        .trim()
                        .isLength({ min: 3 })
                        .withMessage("Name must be 3 characters long")
                        .matches(/[a-zA-Z0-9\s+$]/)
                        .withMessage("Name can only contain letters, numbers and spaces"),
            body("email")
                        .isEmail()
                        .withMessage("Please provide a valid email"),

            body("password")
                        .isLength({ min: 6 })
                        .withMessage("Password must be at least 6 characters long")
]


export const validateLogin = [
            body("email")
                        .isEmail()
                        .withMessage("Please provide a valid email"),
            body("password")
                        .notEmpty()
                        .withMessage("Password is required")
]