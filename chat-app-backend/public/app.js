var chatApp = angular.module('chatApp', []);

chatApp.controller('ChatRoomController', function($scope){

    $scope.chatFormData = {};

    $scope.chats = [
        {
            "name": "jino",
            "msg": "Sample text",
            "msg_type": "text_msg"
        },
        {
            "name":"jino",
            "msg":"sample text 2",
            "msg_type": "text_msg_2"
        }
    ]

    $scope.chatSubmit = function(e) {
        $scope.addToChatBox($scope.chatFormData.msg);
        $scope.chatFormData.msg = "";
        e.preventDefault();
    }

    $scope.addToChatBox = function(msg) {
        $scope.chats.push({
            msg: msg,
            name:"jino",
            msg_type: "text_msg"
        });
    } 
})