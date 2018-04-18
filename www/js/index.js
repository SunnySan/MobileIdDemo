/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Sunny: Received Device Ready Event');
        console.log('Sunny: calling setup push');
        if (typeof PushNotification == "undefined"){
	        console.log('Sunny: PushNotification is undefined ');
        }else{
	        console.log('Sunny: PushNotification object is loaded ');
	        app.setupPush();
        }
    },
    setupPush: function() {
        console.log('Sunny: calling push init');

		PushNotification.hasPermission(data => {
			if (data.isEnabled) {
		        console.log('Sunny: has Permission');
				//alert("has Permission");
			}else{
		        console.log('Sunny: NO Permission');
				//alert("NO Permission");
			}
		});
		const push = PushNotification.init({
			android: {
			},
		    browser: {
		        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
		    },
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});
		
		push.on('registration', (data) => {
			// data.registrationId
			//alert("registration" + data.registrationId);
            console.log('Sunny:registration event, registrationId: ' + data.registrationId);
            console.log('Sunny:registration event, registrationType: ' + data.registrationType);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                window.plugins.toast.show('Push Notification updated!', 'short', 'bottom', null, function(b){alert('Toast error: ' + b)});
                // Post registrationId to your app server as the value has changed
            }
		});
		
		push.on('notification', (data) => {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
			//alert(data.message);
            console.log('Sunny: notification event, data.message=' + data.message + ', data.title=' + data.title + ', data.count=' + data.count + ', data.additionalData.foreground=' + data.additionalData.foreground + ', data.additionalData.coldstart=' + data.additionalData.coldstart + ', data.additionalData.dismissed=' + data.additionalData.dismissed);
            /*
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
            */
            var i = data.message.indexOf(";");
            if (i>0){
            	var s = data.message.substring(i + 1);
	            console.log('Sunny: notification request data=' + s);
	            window.location.href = "doAuthentication.html?" + s;
            }else{
	            navigator.notification.alert(
	                data.message,		// message
	                null,				// callback
	                data.title,			// title
	                'Ok'				// buttonName
	            );
            }
		});
		
		push.on('error', (e) => {
			//alert("e.message");
            navigator.notification.alert(
                e.message,			// message
                null,				// callback
                'System alert',		// title
                'Ok'				// buttonName
            );
			//alert("error" + e.message);
		});

        console.log('Sunny: after init');

    }
};
