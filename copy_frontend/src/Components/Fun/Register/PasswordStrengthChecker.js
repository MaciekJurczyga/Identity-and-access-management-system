

const PasswordStrengthChecker = ({ password, setPasswordColor }) => {
    const calculateStrength = (password) => {
        let strength = 0;

        if (password.length >= 8) {
            strength += 1;
        }

        if (/[A-Z]/.test(password)) {
            strength += 1;
        }

        if (/[a-z]/.test(password)) {
            strength += 1;
        }

        if (/\d/.test(password)) {
            strength += 1;
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }

        return strength;
    };

    const getStrengthColor = (strength) => {
        if (strength >= 5) {
            return '#a4f562';
        } else if (strength >= 3) {
            return '#f39c4b';
        } else {
            return '#e74343';
        }
    };

    const strength = calculateStrength(password);
    const color = getStrengthColor(strength);

    setPasswordColor(color);
    return null;
};

export default PasswordStrengthChecker;
