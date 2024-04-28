// Login_Requirements.js

const validateLoginCredentials = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9]{5,}@gmail.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,10}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        alert('Niepoprawne dane logowania niefajne');
        throw new Error('Niepoprawne dane logowania');
    }
};

export default validateLoginCredentials;
