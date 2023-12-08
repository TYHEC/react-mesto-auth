class authorizationApi {
    constructor(authorizationUrl) {
        this._authorizationUrl = authorizationUrl;
    }
    _handlingServerResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
        };
    };
    registerUser(email, password) {
        return fetch(`${this._authorizationUrl}/signup`, {
            method: `POST`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(this._handlingServerResponse)

    }
    loginUser(email, password) {
        return fetch(`${this._authorizationUrl}/signin`, {
            method: `POST`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(this._handlingServerResponse)
    }
    verificateUser(token) {
        return fetch(`${this._authorizationUrl}/users/me`, {
            method: `GET`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._handlingServerResponse)
    }

}
const authApi = new authorizationApi('https://auth.nomoreparties.co');
export default authApi;