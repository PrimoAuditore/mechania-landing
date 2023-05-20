import { BASE_HOST } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const license_plate = url.searchParams.get('license_plate');


    console.log("get car")
    console.log(BASE_HOST);
    let vehicle = await get_vehicle_data(license_plate);
    console.log("AAAA")
    console.log(vehicle)
    return json(vehicle)


}

async function get_vehicle_data(license_plate) {

    let params = new URLSearchParams({
        license_plate
    });

    let rs = await fetch(BASE_HOST + "/vehicle?" + params)
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                console.error("Failed to get vehicle data");
            }
            return response.json();
        })
        .then((json) => {
            console.log(json)
            return json;
        })
        .catch((err) => {
            console.error(err);
        });

    return rs;
}

async function create_plan(quote_id, monthly_price, client_name, license_plate) {
    console.log(quote_id);
    console.log(typeof quote_id);
    console.log(license_plate);
    console.log(typeof license_plate);
    console.log(client_name);
    console.log(typeof client_name);
    console.log(monthly_price);
    console.log(typeof monthly_price);
    console.log("host: " + BASE_HOST);
    let rs = await fetch(BASE_HOST + "/plan/" + quote_id + "/create", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            price: parseFloat(monthly_price),
            assigned_name: client_name,
            license_plate: license_plate
        }),
    })
        .then((response) => {
            if (!response.ok) {
                console.log(response.statusText);
                console.log("not ok");
            }
            return response.json();
        })
        .then((json) => {
            console.log(json);
            return json;
        })
        .catch((err) => {
            console.error(err);
        });

    return rs;
}
