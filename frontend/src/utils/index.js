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

