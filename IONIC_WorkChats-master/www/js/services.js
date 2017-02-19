angular.module('starter.services', ['firebase'])

  .factory('Data', function ($localStorage, $rootScope, $q, $firebaseArray, $firebaseObject) {


    var users = firebase.database().ref().child("Users");
    // console.log($firebaseArray(users).length + "....................");
    // users.$loaded()
    //   .then(function(){
    //       angular.forEach(users, function(user) {
    //           console.log(user+"------------");
    //       })
    //   });

    $rootScope.data = $localStorage;

    return {
      init: function () {
        if ($localStorage.members == null) {
          $localStorage.members = [];
        }

        // if ($localStorage.topics == null) {
        //   $localStorage.topics = [];
        // }

        if ($localStorage.groups == null) {
          $localStorage.groups = [];
        }
        if ($localStorage.message == null) {
          $localStorage.message = [];
        }
        if ($localStorage.memberRecent == null) {
          $localStorage.memberRecent = [];
        }
        if ($localStorage.memberOfTopic == null) {
          $localStorage.memberOfTopic = [];
        }

        if ($localStorage.memberOfGroup == null) {
          $localStorage.memberOfGroup = [];
        }
        if ($localStorage.messageTopic == null) {
          $localStorage.messageTopic = [];
        }

        if ($localStorage.account == null) {
          $localStorage.account = {};
        }
      },
      getMembers: function () {
        var ref = firebase.database().ref().child("Users");
        $firebaseArray(ref).$loaded().then(function (data) {
          $localStorage.members = data;
          // console.log("Info members " +$localStorage.members[0].$id+" "+$localStorage.members[0].name);
        });

      },
      getTopics: function () {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        $localStorage.topics
          = $firebaseArray
        (firebase.database().ref().child("Topics"));
        console.log("All topic "+$localStorage.topics.length+" ");
      },

      getGroups: function () {
        var ref = firebase.database().ref().child("GroupMember");
        $localStorage.groups = $firebaseArray(ref);

        $firebaseArray(ref).$loaded().then(function (data) {
          console.log("getGroups "+data.length+" "+data[0].$id+" "+$localStorage.groups[0]);
        });
      },

      getMessages: function (uId) {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        var ref = firebase.database().ref().child("Messages").child(uId);
        $localStorage.message = $firebaseArray(ref);
      },

      getMemberRecent: function (uId) {
        console.log("getMemberRecent " + uId);

        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        var ref = firebase.database().ref().child("Messages").child(uId);
        // console.log("ref " + ref);
        $firebaseArray(ref).$loaded().then(function (snapshot) {
          $localStorage.memberRecent = snapshot;
          $q.when($localStorage.members).then(function (dataMembers) {
            for (var i = 0; i < $localStorage.memberRecent.length; i++) {
              for (var index = 0; index < dataMembers.length; index++) {
                if ($localStorage.memberRecent[i].$id === dataMembers[index].$id){
                  $localStorage.memberRecent[i].information = dataMembers[index];
                  // console.log("Haha......." + $localStorage.memberRecent);
                  break
                }
              }
            }
          });
        });
      },
      getMemberOfGroup: function (groupId) {
        var ref = firebase.database().ref('GroupMember').child(groupId).child('Members');
        $firebaseArray(ref).$loaded().then(function (data) {
          if (data.length <= 0) {
            return;
          }
          $q.when($localStorage.members).then(function () {
            var members = [];
            var indexMem = 0;
            for (var i = 0; i < data.length; i++) {

              if (data[i].$id != $localStorage.user.uid) {
                console.log("Member group size @@@@@@@@@@@@@@@@@@ " + $localStorage.members.length);

                for (var index = 0; index < $localStorage.members.length; index++) {

                  if (data[i].$id == $localStorage.members[index].$id) {
                    members[indexMem] = $localStorage.members[index];
                    console.log("Member group aaaaaaa " + indexMem + " " + members[indexMem].name + " ");
                    indexMem++;
                    break;
                  }
                }
              }

            }
            $localStorage.memberOfGroup = members;
          });
        })


      }


    }
  })

  .factory('ChatsSingle', function ($ionicScrollDelegate, $firebaseArray, $rootScope, $q) {
      var chats = [];

      return {
        all: function () {
          return chats;
        },
        get: function (idSend, idReceiver) {
          chats.length = 0;
          var ref = firebase.database()
            .ref("Messages/" + idSend + "/" + idReceiver);
          ref.on('child_added', function (snapshot) {
            chats.push(snapshot.val());
            $q.when(chats).then(function () {
              $ionicScrollDelegate.scrollBottom(true);
            });
            console.log("get list chat @@@ " + chats.length);
          });

        },
        send: function (objectMessage) {
          console.log("send object messsagessss......" + objectMessage.idSend + " " + objectMessage.idReceiver);
          var ref = firebase.database().ref('Messages');
          ref
            .child(objectMessage.idSend)
            .child(objectMessage.idReceiver)
            .child(objectMessage.key)
            .set(objectMessage, function (error) {
              if (!error) {
                ref.child(objectMessage.idReceiver)
                  .child(objectMessage.idSend)
                  .child(objectMessage.key)
                  .set(objectMessage);
                $ionicScrollDelegate.scrollBottom(true);
              }
            });
        }
      }
    }
  )
  .factory('ChatsGroups', function ($ionicScrollDelegate, $firebaseArray, $q, $localStorage, Data) {
      Data.init();
      Data.getMembers();
      var topics = [];

      var membersTopic = [];
      var membersGroup = [];
      var chats = [];


      return {
        chats: function () {
          return chats;
        },
        allMemberTopic: function () {
          return membersTopic;
        },
        allMemberGroup: function () {
          return membersGroup;
        },
        getAllTopics: function () {
          return topics;
        },
        getMemberOfGroups: function (groupId) {

          // get topics of grops
          var ref = firebase.database().ref("GroupMember").child(groupId).child('Members');
          $firebaseArray(ref).$loaded().then(function (data) {
              $q.when($localStorage.members).then(function (dataMembers) {

                for (var i = 0; i < data.length; i++) {
                  for (var index = 0; index < $localStorage.members.length; index++) {
                    if (data[i].$id === dataMembers[index].$id) {
                      membersGroup[i] = dataMembers[index];
                      // console.log(dataMembers[index]);
                      break
                    }
                  }
                }
              });
            }
          );
        },
        getTopicsOfGroup: function (groupId) {
          var ref = firebase.database().ref("GroupMember").child(groupId).child('Topics');
          $firebaseArray(ref).$loaded().then(function (data) {
            console.log("LENGTH TOPIC HAHA "+data.length+" "+$localStorage.topics.length);
              $q.when($localStorage.topics).then(function (dataMembers) {
                for (var i = 0; i < data.length; i++) {
                  for (var index = 0; index < dataMembers.length; index++) {
                    if (data[i].$id === dataMembers[index].$id) {
                      // console.log("TOPIC INFO "+dataMembers[index].$id+" "+dataMembers[index].admin);
                      topics[i] = dataMembers[index];
                      // console.log("LENGTH TOPIC "+topics[i].$id+" "+topics[i].admin+" "+topics[i].describe);
                      // console.log(dataMembers[index]);
                      break
                    }
                  }
                }
              });
            }
          );
        },

        getMemberOfTopic: function (idTopic) {

          var refTopic = firebase.database().ref('Topics').child(idTopic).child('members');
          $firebaseArray(refTopic).$loaded().then(function (data) {

            $q.when($localStorage.members).then(function () {
              var member = [];
              // console.log($localStorage.members);
              for (var i = 0; i < data.length; i++) {
                for (var index = 0; index < $localStorage.members.length; index++) {
                  if (data[i].$id == $localStorage.members[index].$id) {
                    member[i] = $localStorage.members[index];
                    break;
                  }
                }
              }

              $localStorage.memberOfTopic = member;
              console.log("FriendListCtrl Member  "+$localStorage.memberOfTopic.length+" "+member[0].name+" "+member[1].name);

            });
          });
        },

        getMessageTopic: function (idTopic) {
          //noinspection JSUnresolvedFunction,JSUnresolvedVariable

          chats = $firebaseArray(firebase.database().ref('MessageTopic').child(idTopic));
          // console.log('getMessageTopic');
          // console.log(chats);

        },

        send: function (objectMessage, idTopic) {

          chats.$add(objectMessage).then(function (data) {
            console.log("message added");
            console.log(data);
            $ionicScrollDelegate.scrollBottom(true);

            var idSend = objectMessage.idSend;
            var ref = firebase.database().ref('Topics').child(idTopic).child('member');
            $firebaseArray(ref).$loaded().then(function (member) {
              for (var index = 0; index < member.length; index++) {
                if (member[index].$value == idSend) {
                  return;
                }
              }
              ref.child(idSend).set(idSend);
            });

          });
        }
      }
    }
  );

