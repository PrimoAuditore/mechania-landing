import { BASE_HOST } from '$env/static/private';

export async function load({ params }) {
    let quote = await get_plan_quote(params.plan_slug);
    return {
        quote: quote,
    };
}
async function get_plan_quote(quote_id) {
    let quote = null;

    const rs = await fetch(BASE_HOST + "/plan/" + quote_id)
        .then((response) => {
            if (!response.ok) {
                console.error("http error!");
                console.log(response.text);
            }
            return response.json();
        })
        .then((json) => {
            quote = json;
            return quote;
        })
        .catch((err) => {
            return null;
        });

    return rs;
}

