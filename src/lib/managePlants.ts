

export const getMyPlants = async (userId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my/plants?userId=${userId}`);
    return res.json()
};

export const DeleteMyPlant = async (userId: string, id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete/plant?userId=${userId}&id=${id}`, {
        method: 'DELETE'
    });
    return res.json()
};