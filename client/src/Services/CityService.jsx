export const getCities = async () => {
    const res = await fetch("/api/cities");
    return res.json();
};

export const postNewCity = async (city) => {
    return await fetch("/api/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(city)
    }).then((res) => res.json())
}