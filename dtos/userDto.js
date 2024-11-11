class UserDto {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.address = user.address;
        this.image = user.image;
        this.isAdmin = user.isAdmin;
    }
}

module.exports = UserDto;
