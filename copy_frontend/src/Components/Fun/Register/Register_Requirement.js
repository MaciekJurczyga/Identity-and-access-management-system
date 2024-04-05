// Register_Requirement.js

const validateCredentials = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9]{5,}@gmail.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        throw new Error('Niepoprawne dane przy rejestracji');
    }
};

export default validateCredentials;
