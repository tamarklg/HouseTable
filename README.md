## HouseTable
**Calculate Loans risk**

To run the application (after cloning it from github), please:
1. Create postgres DB.
    name: house-table, user: postgres, password: 1234
2. ```bash
    cd HouseTable/server
    npm i 
    npx sequelize-cli db:migrate
    npm start
    ```
3.  ```bash
    cd HouseTable/client
    npm run build
    npm run dev
    ```
4. Open the browser at http://localhost:3000