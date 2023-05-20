import { BASE_HOST } from '$env/static/private';

export async function load({ params }) {
    let quote = await get_quote(params.quote_id);
    return {
        quote: quote,
    };
}

async function get_quote(quote_id){
    const rs = await fetch(BASE_HOST + "/quote/" + quote_id)
        .then((response) => {
            if (!response.ok) {
                console.error("Not ok response");
            }
            return response.json();
        })
        .then((json) => {
            console.log(json)
            return json;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

    return rs;

}
