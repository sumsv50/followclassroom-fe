import handleError from "./handleError";


export async function postData(url = '', data = {}) {
    const token = localStorage.getItem("token");

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
    if (!response.ok) {
        return handleError(response);
    };
    return await response.json();
}

export async function getData(url = '') {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            return handleError(response);
        };

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function putData(url = '', data = {}) {
    const token = localStorage.getItem("token");
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT',
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
    if (!response.ok) {
        return handleError(response);
    };
    return await response.json();
}

export async function deleteData(url = '', data = {}) {
    const token = localStorage.getItem("token");
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE',
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
    if (!response.ok) {
        return handleError(response);
    };
    return await response.json();
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

        if (!response?.isSuccess || !token) {
            return false;
        }
        localStorage.setItem("token", token);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function signByLink(type, data, id) {
    try {
        const routeList = {
            'google': 'auth/google',
            'local': 'sign-in',
            'default': 'sign-in'
        }
        const route = routeList[type] ?? routeList['default'];
        const response = await postData(`${process.env.REACT_APP_BASE_URL}/classlink/${id}/${route}`, data);
        const token = response?.authorization;

        if (!response?.isSuccess || !token) {
            return false;
        }
        localStorage.setItem("token", token);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function updateUser(data) {
    try {
        const response = await postData(`${process.env.REACT_APP_BASE_URL}/api/user-update`, data);
        return response?.isSuccess ? response?.isSuccess : false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function inviteByEmail(class_id, email, role) {
    try {
        const response = await postData(`${process.env.REACT_APP_BASE_URL}/email`, { class_id, email, role });
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getGrade(class_id, id) {
    const data = await getData(`${process.env.REACT_APP_BASE_URL}/grades/${class_id}/${id}`);
    return data;
}

export async function crtGrade(class_id, name, weight) {
    try {
        const data = await postData(`${process.env.REACT_APP_BASE_URL}/grades/${class_id}`, { name, weight });
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updateGrade(class_id, id, name, weight) {
    try {
        const data = await putData(`${process.env.REACT_APP_BASE_URL}/grades/${class_id}/${id}`, { name, weight });
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function deleteGrade(class_id, id) {
    try {
        const data = await deleteData(`${process.env.REACT_APP_BASE_URL}/grades/${class_id}/${id}`,);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
