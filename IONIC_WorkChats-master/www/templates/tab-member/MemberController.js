/**
 * Created by Nhahv on 11/12/2016.
 */
appControllers.controller('MembersCtrl', function ($scope, $localStorage, Data, $ionicPopup, $cordovaEmailComposer) {

  // Data.getMemberOfGroup('1234566');

  for(var i=0;i<$localStorage.memberOfGroup.length;i++)
      console.log("TAB MEMBER "+$localStorage.memberOfGroup[i].name);
  $scope.memberOfGroups = $localStorage.memberOfGroup;

  console.log("NAME>>>>>>>>>>>>>>>>>>> "+$localStorage.account.name);
  $scope.addMemBer = function () {
    $scope.data = {}

    // Custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type = "text" ng-model = "data.model">',
      title: 'Thêm bạn bè',
      subTitle: "Nhập email bạn bè  ",
      scope: $scope,

      buttons: [
        { text: 'Hủy bỏ' }, {
          text: '<b>Đồng ý</b>',
          type: 'button-positive',
          onTap: function (e) {

            if (!$scope.data.model) {
              //don't allow the user to close unless he enters model...
              e.preventDefault();
              console.log("false");
            } else {
                  console.log("-----------true");
              // this.sendEmail(this.sendEmail.email);
              $scope.sendEmail();
              return $scope.data.model;
            }
          }
        }
      ]
    });

    myPopup.then(function (res) {
      console.log('Tapped!', res);
    });
  };

//   $cordovaEmailComposer.isAvailable().then(function() {
//    // is available
//    alert("available");
//  }, function () {
//    // not available
//    alert("not available");
//  });
//   $scope.sendEmail = function () {

//     var email = {
//       to: 'namtiennguyen195@gmail.com',
//       subject: 'SU DUNG IONIC MESSAGER',
//       body: 'Chào bạn,bạn hãy chọn link để trải nghiệm ứng dụng ionic messager',
//       isHtml: true
//     };
//     console.log("end mail");
//   };
//   $cordovaEmailComposer.open(email).then(null, function () {
//       // user cancelled email
//     });

/**
 * Sends an email using Email composer with attachments plugin and using
 * parameter email.
 *
 * @param email
 */
// $scope.sendEmail = function (email) {
//   console.log("vaooooooooooo");

//   if (window.plugins && window.plugins.emailComposer) { //check if plugin exists
//     window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
//         console.log("Email sent successfully");
//       },

//       null,        // Subject
//       null,        // Body
//       [email],     // To (Email to send)
//       null,        // CC
//       null,        // BCC
//       false,       // isHTML
//       null,        // Attachments
//       null);       // Attachment Data
//   }

// }

// $scope.sendGmail = function ()  {
//   console.log("vao send");
//     $.ajax({
//       type: 'POST',
//       url: 'https://mandrillapp.com/api/1.0/messages/send.json',
//       data: {
//         'key': 'cp1pfTEc1MOEVbaM9SS43zx72ju1',
//         'message': {
//           'from_email': 'nam.uet.k58@gmail.com',
//           'to': [
//               {
//                 'email': 'namtiennguyen195@gmail.com',
//                 'name': 'RECIPIENT NAME (OPTIONAL)',
//                 'type': 'to'
//               }
//             ],
//           'autotext': 'true',
//           'subject': 'YOUR SUBJECT HERE!',
//           'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
//         }
//       }
//      }).done(function(response) {
//        console.log(response); // if you're into that sorta thing
//      });
// }
});
