export default function handleError(response) {
    if(!response.oke) {
        switch (response.status) {
            case 401:
                window.location.assign("/sign-in");
                break;
        
            default:
                break;
        }
    }
}