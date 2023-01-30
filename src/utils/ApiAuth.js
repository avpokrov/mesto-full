class ApiAuth {
    constructor({ baseUrl, contentType }) {
      this._baseUrl = baseUrl;
      this._contentType = contentType;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }

    signup(data){
        return fetch(`${this._baseUrl}/signup`,{
            method: "POST",
            headers:{"Content-Type":this._contentType} ,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            }),
        }).then(this._checkResponse)
    }

    signin(data){
        return fetch(`${this._baseUrl}/signin`,{
            method: "POST",
            headers:{"Content-Type":this._contentType},
            body: JSON.stringify({
                password: data.password,
                email: data.email
            }),
        }).then(this._checkResponse)
    }

    getUser(jwt){
        return fetch(`${this._baseUrl}/users/me`,{
            method: "GET",
            headers:{"Content-Type":this._contentType, 
            "Authorization" : `Bearer ${jwt}`}
        }).then(this._checkResponse)
    }
}

const apiAuth = new ApiAuth({
    baseUrl: "http://localhost:3005",
    contentType: "application/json",
});

export default apiAuth;