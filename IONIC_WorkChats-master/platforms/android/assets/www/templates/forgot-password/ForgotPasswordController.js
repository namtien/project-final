/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('ForgotPasswordCtrl', function ($scope, $ionicPopup) {

    $scope.forgotPassword = {};


    function validateEmail(elementValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    $scope.btnForgotPassword = function () {
        console.log("password");

        var email = $scope.forgotPassword.email;

        console.log(email);
        if (validateEmail(email)) {
            var auth = firebase.auth();
            auth.sendPasswordResetEmail(email)
                .then(function () {
                    // Email sent.
                    var alertPopup = $ionicPopup.alert({
                        template: 'Check email to sign in with new password',
                        okText: 'OK'
                    });
                }, function (error) {
                    // An error happened.
                    var alertPopup = $ionicPopup.alert({
                        template: 'Email do not',
                        okText: 'OK'
                    });
                });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: 'Email do not',
                okText: 'OK'
            });
            return;
        }

    };
});
