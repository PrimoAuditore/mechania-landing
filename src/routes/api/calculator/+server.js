import { error, json } from '@sveltejs/kit';
import { BASE_HOST } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params }) {
    const fuel_consumption = url.searchParams.get('fuel_expense');
    const vehicle_type = url.searchParams.get('vehicle_type');
    const vehicle_year = url.searchParams.get('vehicle_year');

    let monthly_payment = await calculateMonthlyPayment(vehicle_type, vehicle_year, fuel_consumption);
    console.log("rs");
    console.log(monthly_payment);

    return json(monthly_payment)


}

async function calculateMonthlyPayment(vehicle_type, vehicle_year, fuel_expense) {

    let rs = await fetch(BASE_HOST + "/plan/calculate", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            vehicle_type: vehicle_type,
            year: parseInt(vehicle_year),
            fuel_consumption: parseInt(fuel_expense),
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log("data")
            console.log(data)
            return data;


        })
        .catch((err) => {
            console.log(err);
            console.log("err::::::" + err)
        });

    console.log("rs2");
    return rs;
}
