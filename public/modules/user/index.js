define(['jquery', 'knockout', 'common', 'leaflet', '../map/map'], function($, ko, Common, L, Map) {
    var User = function() {
        var self = this;
        self.firstName = ko.observable();
        self.lastName = ko.observable();
        self.listUsers = ko.observableArray([]);
        
        self.activate = function() {
            // this.map = new Map();
        };
        self.attached = function() {
            // this.map = new Map(self.getListUsers())
            self.getListUsers();
        };
        self.updateUser = function(user) {
            var id = user.id;
            var li = $('#user_' + id).parent().parent();
            var data = user.user;
            var url = Common.getUrl("user", id);
            Common.rest(url, "PUT", data, function(err, result) {
                if (!err) {
                    console.log("Updated: " + result);
                    Common.showMessage("Update user", "Update successful");
                } else {
                    console.log("Update error");
                    Common.showMessage("Update user", "Update failed");
                }
            });
        };
        self.deleteUser = function(user) {
            var id = user.id;
            var url = Common.getUrl("user", id);
            Common.rest(url, "DELETE", null, function(err, result) {
                if (!err) {
                    console.log("Deleted: " + result);
                    Common.showMessage("Delete user", "Delete successful");
                    $('#user_' + id).parent().parent().remove();
                    self.listUsers.remove(user);
                } else {
                    console.log("Deleted error");
                    Common.showMessage("Delete user", "Delete failed");
                }
            });
        };
        self.createUser = function() {
            console.log("create user");
            var data = {
                firstName: self.firstName,
                lastName: self.lastName,
                latlng: self.latlng
            };
            var url = Common.getUrl("user");
            Common.rest(url, "POST", data, function(err, user) {
                if (!err) {
                    console.log("Created: " + user);
                    Common.showMessage("Create user", "Create successful");
                    self.reset();
                } else {
                    console.log("Created error");
                    Common.showMessage("Create user", "Create failed");
                }
            });
        };
        self.getListUsers = function() {
            var url = Common.getUrl("user");
            console.log(url);
            Common.rest(url, "GET", null, function(err, result) {
                if (!err) {
                    console.log("GET all users: ");
                    self.listUsers(result.users);
                    // for (var i = 0; i < result.users.length; i++) {
                    //     var user = result.users[i];
                    // }
                } else {
                    console.log("Get list users error");
                }
            });
        };
        self.reset = function() {
            self.firstName("");
            self.lastName("");
            self.latlng("");
        };
    };
    return User;
});