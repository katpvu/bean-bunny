export const checkErrors = async (res) => {
    let data;
    try {
        data = await res.clone().json();
    } catch {
        data = await res.text();
    }
    if (data?.errors) return data.errors;
    else if (data) return [data];
    else return [res.statusText];
}

export const findAvg = (array) => {
    let total = 0;
    array.forEach(num => total += num)
    let average = total / array.length

    return average
}