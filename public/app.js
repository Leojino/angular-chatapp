var chatApp = angular.module('chatApp', []);

chatApp.controller('ChatRoomController', function ($scope) {


    socket.on('chat-message', function (msgObj) {
        console.log(msgObj);
        $scope.addToChatBox(msgObj, msgObj.msg, msgObj.type, 'server');
        $scope.$apply();
    });

    $scope.chatFormData = {};

    $scope.chats = [];

    $scope.chatSubmit = function (e) {

        var sendChat = {
            msg: $scope.chatFormData.msg,
            type: "text_template",
            user: "user"
        }


        $scope.addToChatBox(sendChat, $scope.chatFormData.msg,"text_template" , "user");
        socket.emit('chat-message', $scope.chatFormData.msg);
        $scope.chatFormData.msg = "";
        e.preventDefault();
    }

    $scope.addToChatBox = function (msgObj, msg, type, user) {
        console.log(msgObj);
        msgObj.name = user;
        $scope.chats.push(msgObj);
    }
});

chatApp.directive('scrollToBottom', function ($timeout, $window) {
    return {
        scope: {
            scrollToBottom: "="
        },
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watchCollection('scrollToBottom', function (newVal) {
                if (newVal) {
                    $timeout(function () {
                        element[0].scrollTop = element[0].scrollHeight;
                    }, 0);
                }

            });
        }
    };
});

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