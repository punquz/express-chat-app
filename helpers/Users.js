class Users {
    constructor() {
        this.users = []
    }
    AddUserData(id, name, room) {
        let users = {
            id,
            name,
            room
        }
        this.users.push(users)
        return users
    }
    RemoveUser(id) {
        let user = this.GetUser(id)
        if(user) this.users = this.users.filter(us => us.id !== id)
        return user
    }

    GetUser(id) {
        let getUser = this.users.filter(userId => userId.id === id )[0]
        return getUser
    }
    GetUsersList(room) {
        let onlineUsers = this.users.filter(user => user.room === room)
        let names = onlineUsers.map(u => u.name)
        return names
    }
}

module.exports = {Users}