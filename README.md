# POS application

## Setup and Installation

1. Clone the repository: 
`git clone [your-repo-link]`

2. Navigate into the project directory: 
`cd POS-application`

3. Install the dependencies: 
`npm install`

4. You can run the following commands to create your Android and iOS projects for your native application.
`npx cap add android`
`npx cap add ios`

5. Start the server: `npm start dev`

The application will start running at `http://localhost:5173/` (or your specified port).

## Adding New Components

1. Navigate to the `components` directory.
2. Create a new file with the `.tsx` extension.
3. In this file, define your React component.
4. Export your component and import it where it's needed.

## Sync your web code to your native project
Once you've created your native projects, you can sync your web application to your native project by running the following command.
`npx cap sync` 
It will copy your built web application, by default www, to your native project and install the native projects dependencies.

