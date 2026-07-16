'use server';


import { AddPlantFormData } from "@/app/items/add/page";
import { auth } from "./auth";
import { headers } from "next/headers";

const getJwtToken = async()=>{
    try{
      const jwtData = await auth.api.getToken({
        headers: await headers()
      })
      return jwtData?.token || null;
    }catch(error){
      console.log('no jwt token data found my boy ', error);
      return null;
    }
};

export const addNewPlant = async (data: AddPlantFormData)=>{
    const token = await getJwtToken();
    console.log(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plant/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });
    return res.json()
};


// get plants
export const getPlants = async (params: URLSearchParams) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants?${params.toString()}`);
    return res.json()
};

// get plant by id
export const getPlantById = async (id: string) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plant/${id}`);
    return res.json()
};

export const getTrandingPlants = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants/trending`);
    return res.json()
}

export const getMyPlants = async (userId: string) => {
    try {
        const token = await getJwtToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my/plants?userId=${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch my plants: ${res.status} ${res.statusText}`);
            return [];
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching my plants:", error);
        return [];
    }
};

export const DeleteMyPlant = async (userId: string, id: string) => {
    try {
        const token = await getJwtToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete/plant?userId=${userId}&id=${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to delete my plant: ${res.status} ${res.statusText}`);
            return { deletedCount: 0 };
        }
        return await res.json();
    } catch (error) {
        console.error("Error deleting my plant:", error);
        return { deletedCount: 0 };
    }
};