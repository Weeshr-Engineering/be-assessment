***Application Setup and Testing Instructions***

#Prerequisites
Before running the application or tests, ensure you have the following installed:

Node.js
Yarn package manager
MongoDB

#Installation
Clone the repository to your local machine:
    git clone <repository_url>

Navigate to the project directory:
    cd <project_directory>

Install dependencies using Yarn:
    yarn install


#Configuration
Ensure you have set up the necessary environment variables, such as database connection strings or API keys. You may need to create a .env file in the project root directory and add your configuration variables.


##Running the Application

#Compiling TypeScript
Before running the application, ensure you compile TypeScript files to JavaScript using the TypeScript compiler (tsc). You can do this by running:
    yarn tsc
The above command will compile TypeScript files to JavaScript in the dist directory.

To run the application in development mode, execute the following command:
    yarn dev

This command will start the server and make your application accessible at the specified port (typically http://localhost:3000).


#Running Tests
To run tests for the application, execute the following command:
    yarn test
This command will run your test suite and provide feedback on the test results.
