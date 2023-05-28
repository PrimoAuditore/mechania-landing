import { BASE_HOST } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        let vehicle = await get_vehicle_types();
        return json(vehicle)
    } catch (e) {
        return json(e, { status: 500 })

    }


}

async function get_vehicle_types() {


    let rs = await fetch(BASE_HOST + "/vehicle-type")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to retrieve vehicle data");
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
