# logger-FE
Manage loggers in front-end.

# Important note
### Before starting frontend you need to run backend. To start backend you have to follow README.md in backend repository.

# Installation
```bash
npm install
```

# Running the app
```bash
npm run start
```

# Documentation
Metadata is in folder ***constants.ts***. You can change it as you want based on ***backend constants.ts***.
Project consists of pages:
- ***Graph and text page*** - main page with graph and related text
Every pages has its own components:
- ***Graph*** - graph component
- ***Text*** - text component

Calls to Backend API are in ***services*** folder. Every service has its own methods.
There are styles in ***styles*** folder. Every page has its own styles and dynamic styles based on required requirements.


***Note:*** If you want to change backend url, you have to change it in ***constants.ts*** file or you can create .env file to define BASE_URL.

# Constants.ts file
To modify constants you have to change ***constants.ts*** file. There are 3 main sections:
1. First section is not possible to change.
2. Second section is possible to change. It is related frontend settings.
3. Third section is possible to change. It is related backend settings.
