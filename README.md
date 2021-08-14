# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Frontend Explanation
1. For fornt end ui I am using materia ui with react to create the form page.
2. I am using api "https://restcountries.eu/rest/v2/all" to fetch country names.
3. Then if country selected Spain, Ghana, Brazil then additional fields are shown otherwise only needed fiedls are shown.
4. At last on form submision data is shown in the console if there is no validation error.
5. Assuming no laws on "holiday allowance" means user can enter any number.

### Backend Explanation

What problem are you trying to solve:
Each country has different employment laws and requires different information in order to employ someone. This means it is important that the company provide information on the country, an employee is based in our various services and systems.
Why should we solve it?:
It's going to create a big problem because Each country has different employment laws and requires different information in order to employ someone and if we do not follow that rules that means we are breaking the rules, which is not good and not at all professional.

How do you propose to solve it:
I will create an API in which I will,
1) Fetch the country name from the employee object.
2) then Fetch that country-specific country information from the Rest countries, which is a free API.
3) then, I will create a new object in which I will add the employee information with the addition of Country Full name, Currency, Language/s, and Timezone/s.
4) And then I will return that object to the frontend.

NOTE: For security purposes, I will also add the Token authentication and Permissions on that API (JWT Tokens)
What other approaches did you consider:
 An alternate approach can be:
1) Fetch all the country information at once and save it in an array of objects.
2) Create an array of objects in which add the information of employee with the addition of Country Full name, Currency, Language/s, and Timezone/s.
3) Then return that array of objects to the frontend.

In this approach, we will hit the Third Party API only once and save all the data at once.

What could go wrong?

Possibilities are:
1) Third-party API doesn't return the data, In that case, we will put Try, Catch for exceptional handling.
2) Third-party is taking so long time to return the response.
### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
