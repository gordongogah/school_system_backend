# School Sytem Backend API
This is a REST API backend implemented to manage data flow between the client and the data storage of the school system application

## Technology
*  <b>Node-Express</b> - Creates the server
*  <b>Sequels</b> - The ORM bridge between the json data and the db objects
*  <b>MySQL</b> - The DBMS to manage stored data

## Contribution

If you have access to this repository from your github account then it means you can contribute and make changes to its codebase. However, to ensure a smooth experience among developers, a few guidelines have been set and ought to be followed.

### Guidelines

1. To get started clone this repository into your local development environment `git clone https://github.com/gordongogah/school_system_backend.git` from your commandline git client.

2. Run `npm install` from your git client inside the project root directory to install all the required dependancies into your workspace.

3. Create a `.env` file and set all variables listed in the `.env.example` file and in the correct format as specified(the database parameters must be correct according to your mysql db server).

4. Run `npm run devStart` to start your test server and make sure everything is working. Feel free to consult where you are not sure.

<b>Please Note:</b> Every developer is using different database configurations for according to their preffered environments so every contributor is urged not to interfere with other contributors' dev environments by observing the following before pushing your code to the upstream branch:

* do not push `.env` file 
* do not push your editor settings files e.g `.vscode`, `.idea` etc
