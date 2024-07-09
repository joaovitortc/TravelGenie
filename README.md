<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/joaovitortc/TravelGenie">
    <img src="assets/images/genie_logo.png" alt="Logo" width="160" height="160">
  </a>

  <h1 align="center">Travel Genie</h1>

  <p align="center">
    Your personalized travel planner powered by AI
    <br />
    <br />
  </p>
</div>

<br /><br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#file-structure">File Structure</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

  <!-- ABOUT THE PROJECT -->
## About The Project
<div>
  <img src="assets/screenshots/Home_Screen.PNG" width="350" height="650" alt="Logo" align="left" />

  <p align="center"> TravelGenie is a revolutionary mobile app focused on simplifying travel planning. Utilizing artificial intelligence, TravelGenie generates personalized travel plans tailored to each user's interests and current location.<p/>
    <br/> 
    Users can:
    <li>Create new travel plans</li>
    <li>Save and revisit their plans</li>
    <li>Log in, sign-up and edit profile</li>
    <p align="center">Whether you're exploring new destinations or revisiting familiar ones, TravelGenie enhances your travel experience by providing intuitive, customizable travel plans at your fingertips.</p>
  

  ### Built With

* ![EJS](https://img.shields.io/badge/EJS-026d3f?style=for-the-badge&logo=ejs&logoColor=white)
* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

  <p align="right">(<a href="#readme-top">back to top</a>)</p>
</div>
<br/><br/><br/><br/>

## File Structure

```bash
KuKeen/
│
├── assets/
│   ├── css/         
│   ├── images/       
│   └── togglePassword.js       # Responsible for toggling the passsword visibility
│
├── controllers/
│   ├── cartController.js     
│   └── generalController.js  
│   └── loadDataController.js   # Endpoint responsible to restart the database (emergency recovery)
│   └── mealkitsController.js
│
├── modules/
│   ├── mealKitModel.js          
│   └── mealkitUtil.js
│   └── userModel.js        
│
├── views/
│   ├── general/                # Contain all the general views (home.ejs, cart.ejs, etc)
│   ├── layouts/
│       └── main.ejs            # Layout used in every page (using EJS-Layouts)
│   ├── mealkits/               # Contain all the mealkit's related views
│   ├── partials/
│       ├── footer.ejs
│       └── mealkits.ejs
│       └── navbar.ejs
│
├── .gitignore                  # Git ignore file
├── README.md                   # Project README file
└── server.js                   # Project Entry point
```

<!-- USAGE EXAMPLES -->
## Usage

This section outlines some of the features of the website.

### Log in system
The website employs *bcrypt.js* to securely hash and store user passwords in MongoDB. 
Only registered users are permitted to log in.

<img src="assets/log-in.png" alt="Logo" width="300">

### Url Protection
I utilized *express-session* to secure endpoints, ensuring that only logged-in users can access certain pages. This also prevents customers from accessing administrator pages.

<img src="assets/unauthorized.png" alt="Logo" >

### Admin
Administrators have the capability to create, delete, and edit meal kits through the admin panel.

<img src="assets/cru.png" alt="Logo" >

### Cart
Sessions are used to track user activity, maintaining the contents of the cart even if the user leaves the website. Users can also modify the quantity, add / remove items on their cart. By simulating the placement of an order, and email is sent to the registered user.

<img src="assets/cart.png" alt="Logo" >


<p align="right">(<a href="#readme-top">back to top</a>)</p>

</br>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

</br>

<!-- CONTACT -->
## Contact

- [Portfolio](https://joaocunha.onrender.com)
- [LinkedIn](https://www.linkedin.com/in/joaovitortc/)
- [GitHub](https://github.com/joaovitortc)

</br>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special thanks to [Nick Romanidis](https://github.com/nick-romanidis) for guidance and support throughout the development process.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
</br>
</br>

