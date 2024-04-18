export const getDogs = async () => {
    const res = await fetch("/api/dogs");
    return res.json();
};


export const getDogById = async (id) => {
    const res = await fetch(`/api/dogs/${id}`);
    return res.json();
};

export const postNewDog = async (dog) => {
    return await fetch("/api/dogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(dog)
    })
}