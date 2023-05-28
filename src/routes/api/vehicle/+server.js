import { BASE_HOST } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import { writable } from 'svelte/store';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const license_plate = url.searchParams.get('license_plate');
    try {

        let vehicle = await get_vehicle_data(license_plate);
        console.log(vehicle)
        return json(vehicle)
    } catch (e) {
        console.log("retrieve failed")
        return json(e, { status: 500, statusText: e })

    }


}

async function get_vehicle_data(license_plate) {

    let params = new URLSearchParams({
        license_plate
    });

    let rs = await fetch(BASE_HOST + "/vehicle?" + params)
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                if (response.status === 424) {
                    throw new Error("Unable to retrieve vehicle data");
                }
            }
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => {
            throw err;
        });

    return rs;
}
