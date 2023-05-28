import { BASE_HOST } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let body = await request.json();
    try {
        let vehicle = await create_vehicle_manual(body);
        return json(vehicle)
    } catch (err) {
        return json(err, { status: 500 })
    }

}

async function create_vehicle_manual(body) {
    let rs = await fetch(BASE_HOST + "/vehicle/manual", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.text.toString());
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
