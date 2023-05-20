import { BASE_HOST } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let body = await request.json();


    let quote = await create_quote(body);
    console.log(quote);


    return json(quote)


}

async function create_quote(body) {
    let rs = await fetch(BASE_HOST + "/quote", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
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
