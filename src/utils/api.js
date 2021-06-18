class Api {
    constructor(token, groupId){
        this.baseUrl = 'https://mesto.nomoreparties.co/v1'
        this._token = token;
        this._groupId = groupId
    }
    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } 
    getCards(){
        return fetch(`${this.baseUrl}/${this._groupId}/cards`, {
            headers: {
            authorization: this._token
            }
        })        
        .then(this._checkResponse)
    }
    getUserInfo(){
        return fetch(`${this.baseUrl}/${this._groupId}/users/me`, {
            headers: {
            authorization: this._token
            }
        })
        .then(this._checkResponse)
    }
    patchProfileAvatar(picture){
        return fetch(`${this.baseUrl}/${this._groupId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: picture
        })
        })
        .then(this._checkResponse)
    }
    patchProfileInfo(username, status){
        return fetch(`${this.baseUrl}/${this._groupId}/users/me`, {
        method: 'PATCH',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            about: status
        })
        })
        .then(this._checkResponse)
    }
    postNewCard(text, url) {
        return fetch(`${this.baseUrl}/${this._groupId}/cards `, {
        method: 'POST',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: text,
            link: url
        })
        })
        .then(this._checkResponse)
    }
    deleteCard(id) {        
        return fetch(`${this.baseUrl}/${this._groupId}/cards/${id}/`, {
        method: 'DELETE',
        headers: {
        authorization: this._token
        }
        })
        .then(this._checkResponse)
    }
    putLikePost(id) {
        return fetch(`${this.baseUrl}/${this._groupId}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
        authorization: this._token
        }
        })
        .then(this._checkResponse)
    }
    deleteLikePost(id) {
        return fetch(`${this.baseUrl}/${this._groupId}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
        authorization: this._token
        }
        })
        .then(this._checkResponse)
    }
}

const api = new Api ('57e386f4-1a89-4d89-a10b-b49e88b17870', 'cohort-21'); 

export default api