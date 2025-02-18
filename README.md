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
    <li><a href="#user-flow">User Flow</a></li>
    <li><a href="#video-demo">Video Demo</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

  <!-- ABOUT THE PROJECT -->
## About The Project
<div>
  <img src="assets/screenshots/Home_Screen.PNG" width="350" height="650" alt="Logo" align="left" />

  <p> TravelGenie is a revolutionary mobile app focused on simplifying travel planning. Utilizing artificial intelligence, TravelGenie generates personalized travel plans tailored to each user's interests and current location.<p/>
    <br/> 
    Users can:
    <li>Create new travel plans</li>
    <li>Regenerate a new plan based on a previous plan</li>
    <li>Save and revisit their plans</li>
    <li>Log in, sign-up and edit profile</li>
    <br/>
    <p>Whether you're exploring new destinations or revisiting familiar ones, TravelGenie enhances your travel experience by providing intuitive, customizable travel plans at your fingertips.</p>
  

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
│   ├── (tabs)/                #  Where index.jsx can be found, home screen of the application  
│   └── journey/               #  All the User Journey screens and logic when user press "Get Started"
│   └── plans/                 #  My Plans and Plan Detail screens
│   └── profile/               #  Login/Signup and Profile screens
│   └── firebase.js            #  Responsible for firebase config
│   └── openai.js              #  Responsible for openai API config
│   └── ...
│
├── components/                #  Several components can be found, main ones:
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
## User Flow

<div align="center">
  <img src="assets/screenshots/Step1.jpeg" width="300" height="650" alt="Screenshot 1" style="display: inline-block; margin-right: 10px;">
  <img src="assets/screenshots/Step2.jpeg" width="300" height="650" alt="Screenshot 2" style="display: inline-block; margin-right: 10px;">
  <img src="assets/screenshots/Step3.jpeg" width="300" height="650" alt="Screenshot 3" style="display: inline-block;">
  <img src="assets/screenshots/Step4.jpeg" width="300" height="650" alt="Screenshot 4" style="display: inline-block; margin-right: 10px;">
  <img src="assets/screenshots/Step5.jpeg" width="300" height="650" alt="Screenshot 5" style="display: inline-block; margin-right: 10px;">
  <img src="assets/screenshots/Step6.jpeg" width="300" height="650" alt="Screenshot 6" style="display: inline-block;">
  <img src="assets/screenshots/Loading.jpeg" width="300" height="650" alt="Screenshot 6" style="display: inline-block;">
  <img src="assets/screenshots/Generated_Plan.PNG" width="300" height="650" alt="Screenshot 6" style="display: inline-block;">
   <img src="assets/screenshots/Sign-up.jpeg" width="300" height="650" alt="Screenshot 6" style="display: inline-block;">
   <img src="assets/screenshots/Profile.jpeg" width="300" height="650" alt="Screenshot 6" style="display: inline-block;">
   <img src="assets/screenshots/MyPlans.jpeg" width="300" height="650" alt="Screenshot 6" style="display: inline-block;">
</div>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

</br>

## Video Demo

https://github.com/joaovitortc/TravelGenie/assets/144037699/c10c68af-fa4c-42cd-9251-38e45795c57b

For a more extensive version:
https://www.youtube.com/watch?v=gG4qAEOTDvg


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

</br>

<!-- ACKNOWLEDGMENTS -->
## Contributors

* [Joao Vitor Topanotti da Cunha](https://github.com/joaovitortc)
* [Alberte Illum Sørensen](https://github.com/illumss)
* [Dominik Satke](https://github.com/dominiksatke)
* [Noel Junior Yando](https://github.com/Yanstart)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
</br>
</br>

