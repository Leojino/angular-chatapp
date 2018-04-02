var chatApp = angular.module('chatApp', []);

chatApp.controller('ChatRoomController', function($scope){


    socket.on('chat-message', function(msg){
        $scope.addToChatBox(msg, 'server');
        $scope.$apply();
    });

    $scope.chatFormData = {};

    $scope.chats = [
        // {
        //     "name": "user",
        //     "msg": "Sample text",
        //     "msg_type": "text_msg"
        // },
        // {
        //     "name":"user",
        //     "msg":"sample text 2",
        //     "msg_type": "text_msg_2"
        // }
    ]

    $scope.chatSubmit = function(e) {
        $scope.addToChatBox($scope.chatFormData.msg, "user");
        socket.emit('chat-message', $scope.chatFormData.msg);
        $scope.chatFormData.msg = "";
        e.preventDefault();
    }

    $scope.addToChatBox = function(msg, user) {
        $scope.chats.push({
            msg: msg,
            name:user,
            msg_type: user == "user" ? "text_msg" : "text_msg_2"
        });
    } 
});

chatApp.directive('scrollToBottom', function($timeout, $window) {
    return {
        scope: {
            scrollToBottom: "="
        },
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection('scrollToBottom', function(newVal) {
                if (newVal) {
                    $timeout(function() {
                        element[0].scrollTop =  element[0].scrollHeight;
                    }, 0);
                }

            });
        }
    };
});