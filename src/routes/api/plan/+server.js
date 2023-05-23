import { BASE_HOST } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let body = await request.json();
    let plan = await create_plan(body);
    return json(plan)
}

async function create_plan(body) {
    let rs = await fetch(BASE_HOST + "/plan", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (!response.ok) {
                console.error(response.statusText);
                console.error("not ok");
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
