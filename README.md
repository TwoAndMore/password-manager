# Password manager. How to work with.

## About

Manage all your passwords for different accounts (mails, devices, accounts, servers, etc.).
You can add/edit/delete/reveal passwords on the dashboard after login.

You can register or login with existing accounts:

* login: **admin**
* password: **admin**

or

* login: **myLogin**
* password: **myPassword**

To add a new password, click the "NEW" button:

![img.png](addData.png)

To delete item, press the red 'X' button.
To edit password, double-click the password:

![img_1.png](deleteAndEditData.png)


For storing data was chosen [json-server](https://github.com/typicode/json-server).

Stack used: 
* **HTML**, 
* **CSS(SCSS)**, 
* **React**, 
* **Typescript**.


## STEPS
1. Download or clone repository. `git clone https://github.com/TwoAndMore/password-manager`.
2. Open project folder with code editor (VS Code, WebStorm, other).
3. Run ```npm install``` in terminal.
4. Install JSON server ```npm install -g json-server```.
5. Start JSON server ```json-server -p 5000 src/data.json```.
6. Open second terminal and run ```npm start```.
7. If tab does not open, go to ```http://localhost:3000``` in your browser.
