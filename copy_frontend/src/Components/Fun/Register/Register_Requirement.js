// Register_Requirement.js

const validateCredentials = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9]{5,}@gmail.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        alert('Niepoprawne dane przy rejestracji\n' +
            'Wymogi do hasła:\n' +
            '• Hasło musi mieć co najmniej 5 znaków\n' +
            '• Hasło musi zawierać przynajmniej jedną dużą literę.\n' +
            '• Hasło musi zawierać przynajmniej jedną małą literę.\n' +
            '• Hasło musi zawierać przynajmniej jedną cyfrę.\n' +
            'Wymogi do adresu email:\n' +
            '• przynajmniej 5 znaków\n' +
            '• zakończony na @gmail.com\n')
            ;
        throw new Error('Niepoprawne dane przy rejestracji');
    }
};

export default validateCredentials;
