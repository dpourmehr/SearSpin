<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="scripts/searsAPI.js"></script>
<!--<script type="text/javascript" src="scripts/facebookAPI.js"></script>-->
<title>Appealing title</title>
<meta charset="UTF-8">
<meta name="description" content="bullshit content">
</head>
<body>


<div id="fb-root"></div>
<script>

  searsAPI.getCategoryProducts('auto', function(data){
    console.log(data);
  });

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      share();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '886963431348171', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      oauth      : true, // enable OAuth 2.0
      xfbml      : true  // parse XFBML
    });    

  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (document.getElementById(id)) {return;}
     js = document.createElement('script'); js.id = id; js.async = true;
     js.src = "http://connect.facebook.net/en_US/all.js";
     document.getElementsByTagName('head')[0].appendChild(js);
   }(document));


  function share(){
    FB.ui(
      {
        method: 'feed',
        name: 'Relax',
        link: 'http://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://hackathon.codefyr.com/SearSpin/content/images/sears.png',
        caption: 'Sears Spin-to-Win',
        description: 'Free discounts on your favorite everyday items',
        message: 'OMG.. so much fun'
      },

      function(response) {
        if (response && response.post_id) {

          console.log('the goods', response);

          // THE POST WAS PUBLISHED
          alert('Post was published.');

        } else {

          // THE POST WAS NOT PUBLISHED
          alert('Post was not published.');

        }
      }
    );
  }
</script>


<!--
  Below we include the Login Button social plugin. This button uses
  the JavaScript SDK to present a graphical Login button that triggers
  the FB.login() function when clicked.

-->

<fb:login-button scope="email,user_birthday,user_likes,user_interests,user_about_me" onlogin="checkLoginState();">
</fb:login-button>

<div id="status">
</div>


</body>
</html>