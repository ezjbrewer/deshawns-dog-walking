export const getWalkers = async () => {
    const res = await fetch("/api/walkers");
    return res.json();
};

export const getWalkerById = async (id) => {
    const res = await fetch(`/api/walkers/${id}`);
    return res.json();
};

export const deleteWalker = async (walkerId) => {
    const res = await fetch(`/api/walkers/${walkerId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}