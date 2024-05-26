export const sanitize = (data) => {
    const {Password, ...sanitizeData} = data;

    return sanitizeData;
}