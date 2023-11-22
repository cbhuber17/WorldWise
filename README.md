# GeoNotes

GeoNotes helps you track your travels and create a visual record of your adventures. It allows you to add cities to your list and view them on a world map, as well as view information about each city.

<h1 align="center">
    <img src="public/assets/img/logo.png"/>
</h1>

It is built using:

- [React.js](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [React DatePicker](https://reactdatepicker.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [React Error Boundary](https://www.npmjs.com/package/react-error-boundary)
- [React Icons](https://react-icons.github.io/react-icons/)
- [BigDataCloud Client Side Reverse Geocoding to City API](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api).
- [AWS Amplify](https://aws.amazon.com/amplify)
- [PocketHost.io](https://pockethost.io/)
- [CKEditor](https://ckeditor.com/)

**Features**

- **Pages:** GeoNotes has 7 pages: homepage, pricing, product, sign-up, login, update-profile and app.
- **Responsive design** GeoNotes has a responsive design that adapts to different screen sizes and devices.
- **Interactive world map:** GeoNotes displays a world map with markers for all of the cities that the user has added to their list.
- **City list:** GeoNotes displays a list of all of the cities that the user has added to their list. The list includes the city name, country flag, and date of visit.
- **City form:** When the user clicks on a city on the map or in the list, GeoNotes displays a form with information about the city, including the city name, country flag, date of visit, and notes about the trip.
- **Add city:** The user can add a city to their list by filling out the city form and clicking the "ADD" button. A marker will then appear on the map for the new city.
- **Remove city:** The user can remove a city from their list by clicking the "&times;" button next to the city in the list. The marker for the city will then be removed from the map.
- **Edit and update city** The user can edit and update the information for existing cities in the list. To do this, simply click on the city in the list and then click the "EDIT" button.
- **Current user geolocation:** The user can click the "USE YOUR POSITION" button to navigate the map to their current user's geolocation.
- **Database:** The list of cities is persisted in a database on pockethost.io per account, so that the user's list is preserved even if they close the browser or navigate to a different page.
- **Login and logout functionality:** GeoNotes allows users to log in and out of their accounts. AWS Amplify is used as the backend for authentication, avatar image storage in S3, and lambda function to resize avatar to small images.

Contact me if you want to view a demo account!

## TODO:

- Forgot password/account recovery: https://docs.amplify.aws/lib/auth/password_management/q/platform/js/#change-to-a-new-password-via-self-service
- Center map on popup when clicking a CityItem, perhaps useRef for map and pass it to CityItem
- MAIN.JSX add strict mode for production
- Check responsiveness: 375, 550, 750, 1050
- Add amplify demo account, add pockethost demo db
- "Use your position" with a popup active didn't move to position
- SignUp post-confirm email, "Welcome to GeoNotes!". Will need email backend.
- Confirm page send code email again
- Address TODOs in code
- Signing up causes console error: SignUp.jsx?t=1699897158672:98 POST https://cognito-idp.us-west-2.amazonaws.com/ 400 (Bad Request)
