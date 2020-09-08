export const handelResponse = response => {
    if (response.status >= 400) {
        throw Error(response.error);
    }
    return response;
}