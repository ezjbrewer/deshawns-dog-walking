export const getWalkerCities = async () => {
    const res = await fetch("/api/walkerCity");
    return res.json()
};

export const postWalkerCity = async (cityId, walkerId) => {
    const walkerCityObj = {
        cityId: cityId,
        walkerId: walkerId
    }
    
    return await fetch(`/api/walkerCities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(walkerCityObj)
    })
    // return res.json()
}

export const deleteWalkerCity = async (cityId, walkerId) => {
    const res = await fetch(`/api/walkerCities?cityId=${cityId}&walkerId=${walkerId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// export const postNewDog = async (dog) => {
//     return await fetch("/api/dogs", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json", 
//         },
//         body: JSON.stringify(dog)
//     }).then((res) => res.json())
// }

// `/api/walkerCity/post?cityId=${cityId}&walkerId=${walkerId}`