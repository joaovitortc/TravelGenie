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
  </p>
</div>

<br />

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
    <li>Regenerate a new plan based on a previous plan</li>
    <li>Save and revisit their plans</li>
    <li>Log in, sign-up and edit profile</li>
    <br/>
    <p align="center">Whether you're exploring new destinations or revisiting familiar ones, TravelGenie enhances your travel experience by providing intuitive, customizable travel plans at your fingertips.</p>
  

  ### Built With

 ![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)
 ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
 ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
 

  <p align="right">(<a href="#readme-top">back to top</a>)</p>
</div>
<br/><br/><br/><br/><br/><br/>

## File Structure

```bash
TravelGenie/
│
├── assets/
│   ├── fonts/         
│   ├── images/       
│   └── screenshots/      
│
├── app/
│   ├── (tabs)/                #  where index.jsx can be found, home screen of the application  
│   └── journey/               #  All the User Journey screens and logic when user press "Get Started"
│   └── plans/                 #  My Plans and Plan Detail screens
│   └── profile/               #  Login/Signup and Profile screens
│   └── firebase.js            #  Responsible for firebase config
│   └── openai.js              #  Responsible for openai API config
│   └── ...
│
├── components/                #  Several component can be found, main ones:
│   ├── Loading.jsx            
│   └── PlanCard.jsx
│   └── NoPlansScreen.jsx
│   └── ...      
│
├── constants/                 #  For colors used several times
│
├── .gitignore                 #  Git ignore file
├── README.md                  #  Project README file
└── app.json                   #  Configuring Expo
└── ...
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

