
import React from 'react';

const PasswordStrengthChecker = ({ password }) => {
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
            return 'green';
        } else if (strength >= 3) {
            return 'orange';
        } else {
            return 'red';
        }
    };

    const strength = calculateStrength(password);
    const color = getStrengthColor(strength);

    return (
        <div style={{ color: color }}>
            Siła hasła: {color === 'green' ? 'Silne' : color === 'orange' ? 'Średnie' : 'Słabe'}
        </div>
    );
};

export default PasswordStrengthChecker;
