import handleError from "./handleError";


export async function postData(url = '', data = {}) {
    const token = localStorage.getItem("token");
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data)
    });
    if(!response.ok) {
        return handleError(response);
    };
    return await response.json();
}

export async function getData(url = '') {
    try {
        const token = localStorage.getItem("token");
        // Default options are marked with *
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if(!response.ok) {
            return handleError(response);
        };
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

export async function authentication(type, data) {
    try {
        const routeList = {
            'google': 'auth/google',
            'local': 'sign-in',
            'default': 'sign-in'
        }
        const route = routeList[type] ?? routeList['default'];
        const response = await postData(`${process.env.REACT_APP_BASE_URL}/api/${route}`, data);
        const token = response?.authorization;

        if(!response?.isSuccess || !token) {
            return false;
        }
        localStorage.setItem("token", token);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}