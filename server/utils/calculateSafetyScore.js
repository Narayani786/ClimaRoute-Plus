export const calculateSafetyScore = (alerts) => {
    if (!alerts.length) return 100;
    return Math.max(0, 100 - alerts.length * 20); // Decrease per alert
};
