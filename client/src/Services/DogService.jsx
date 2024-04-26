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
    }).then((res) => res.json())
}

export const assignWalker = async (dog, walkerId) => {
    const updatedDog = {
        id: dog.id,
        name: dog.name,
        walkerId: walkerId,
        cityId: dog.cityId
    }

    return await fetch("/api/dogs/walker", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(updatedDog)
    })
}

export const deleteDog = async (dogId) => {
    const res = await fetch(`/api/dogs/${dogId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}