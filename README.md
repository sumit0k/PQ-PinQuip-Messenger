# PQ : PinQuip Messenger
A `M.E.A.N.` stack based messenger application using PeerJS server

The project is scaffolded using gulp, slush-wean and bower. The UI is developed in LUMX using AngularJS. The Project still not uses MongoDB so as to fulfill the requirement of packaged application.
<b>This repositiry is modified to run on Heroku and live demo can be seen at<a href="https://pinquip.herokuapp.com">PinQuip Messenger</a> <b>

<b>General Information</b><br>
`Express Server` is started on port no `3000`.<br>
`EJS` is used for HTML renderer for ExpressJS<br>
`PeerJS Server` is started on secure port at url <a href="https://pinquip-peerjs.herokuapp.com">`PinQuip PeerJS Heroku Server`</a>.<br>
`IndexedDB` is used for database purposes.<br>
`PouchDB` is used as wrapper for IndexedDB<br>
`blueimp-file-upload` is used for FTP over express server.<br>
`AngularJS` is used for creating modules for front-end.<br>
`LUMX` is used as UI framework.<br>
`jQuery is used for DOM Manipulation`.<br>
`Velocity` is used for smoother animations.<br>

<b>Running the Application</b><br>
Requires Node and npm to be installed as prerequisite
<ol>
<li>Use `npm install` to install the dependencies from `package.json` file</li>
<li>Execute application with the help of node script<br>
Run `node app\app.js` at the root of project.
</li>
</ol>
or one click deploy at <a href="https://www.heroku.com/deploy/?template=https://github.com/sumitkumar1209/PQ-PinQuip-Messenger/tree/offline-video-call">Heroku</a><br>
And if you are logged in to Heroku, you should see a page where you enter your app name and click on Deploy for free, your peer-server will be available on Heroku! To test the server you can go to `https://<<your-app-name>>.herokuapp.com`
