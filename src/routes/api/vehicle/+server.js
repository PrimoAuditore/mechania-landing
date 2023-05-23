import { BASE_HOST } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const license_plate = url.searchParams.get('license_plate');
    let vehicle = await get_vehicle_data(license_plate);
    return json(vehicle)


}

async function get_vehicle_data(license_plate) {

    let params = new URLSearchParams({
        license_plate
    });

    let rs = await fetch(BASE_HOST + "/vehicle?" + params)
        .then((response) => {
            if (!response.ok) {
                console.error("Failed to get vehicle data");
            }
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.error(err);
        });

    return rs;
}
