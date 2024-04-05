// Register_Requirement.js

const validateCredentials = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9]{5,}@gmail.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,10}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        alert('Niepoprawne dane przy rejestracji');
        throw new Error('Niepoprawne dane przy rejestracji');
    }
};

export default validateCredentials;
