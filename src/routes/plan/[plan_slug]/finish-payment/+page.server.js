import { BASE_HOST } from '$env/static/private';
export async function load({ params }) {
    let plan = await get_plan(params.plan_slug);
    return {
        plan: plan,
    };
}

async function get_plan(plan_id) {
    const rs = await fetch(BASE_HOST + "/plan/" + plan_id)
        .then((response) => {
            if (!response.ok) {
                console.error("Not ok response");
            }
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

    return rs;

}
