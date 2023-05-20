
function calculateMonthlyPayment() {
    console.log(vehicle_type, vehicle_year, fuel_expense);
    let error = null;
    let data = null;
    loading = true;

    fetch("http://localhost:8080/plan/calculate", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: json.stringify({
            vehicle_type: vehicle_type,
            year: parseint(vehicle_year),
            fuel_consumption: fuel_expense,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new error(`http error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((json) => {
            plan = json;
            console.log(plan);
        })
        .catch((err) => {
            error = err.message;
        })
        .finally(() => {
            loading = false;
        });
}
