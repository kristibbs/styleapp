## Style app for front end development

Built using angular, this app sits alongside your site build, in the root.

The purpose of this app is to enable developers to quickly build a standalone prototype and also develop the final code that will be used in the production site.

Using the atomic design approach, this has been created to be very modular, so there are atoms to represent the smaller elements, molecules to represent the simple components and organisms to represent the larger more complecated components. 

The templates are a collection of molecules and organisms with dummy content to be used as living wireframes. The pages will have actual content and can be used for final sign off.

The molecules and components are designed to be standalone in so far as you should have a template and any associated sccs, js contained with in their own files. So easy to transport to another build.

Its also great for testing on mobile and browsers, so you can ensure that it all works fine before adding it to the cms. As a bonus, because its angular, changes you make in firebug arent lost as you navigate around the app. So you can see how your changes look on different pages. When happy just add the css to your scss files.

The idea is that the scss and js files etc will be just sent to the cms, all the styling is done within the app, and the css, js, images are copied via gulp to your website. 

##Install and set up
clone or unzip into your local folder. 
Ensure wampp or xampp is running as it requires apache to be running.
Gulp will need to be installed on your machine. Run npm install --save-dev in the root. This is to get all the node modules installed
Open browser and navigate to the folder/url.. http://localhost/styleapp for example

Thats a very simple and brief oveview, but more in depth instructions/overview to be added

Quick demo here: http://styleguide.kristibbs.co.uk/#/home
Quick guide here: http://styleguide.kristibbs.co.uk/#/help-developer-guide
