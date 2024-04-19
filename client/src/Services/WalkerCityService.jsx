export const getWalkerCities = async () => {
    const res = await fetch("/api/walkercity");
    return res.json();
};