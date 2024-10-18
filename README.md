# Asset Tracker

**Live Demo**: https://asset-tracker-130f8.web.app/

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

Asset Tracker is a web application designed to help users manage multiple accounts and track assets. Users can input and track prices, filter account data, and visualize their investments' performance through interactive graphs.

The application uses **React.js** for the frontend and **Firebase Firestore** as a backend for real-time data storage and retrieval. 

## Features

- **Account Management**: Track multiple investment accounts.
- **Price Tracking**: Add and update prices for each account.
- **Account Filtering**: View and filter data by individual accounts and based on specified time ranges.
- **Dynamic Visualizations**: Graphically display stock performance and account balance over time.

## Technologies Used

- **Frontend**: React.js, JavaScript, HTML5, CSS3
- **Backend**: Firebase Firestore (for real-time database functionality)
- **Deployment**: Firebase Hosting
- **Charting Library**: Plotly.js (for interactive visualizations)

## Setup and Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- Firebase CLI (for deployment and hosting)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Miryeong1235/asset-tracker.git
   cd asset-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
   
3. Set up Firebase configuration in a `.env` file at the root of the project:

   ```bash
   REACT_APP_FIREBASE_API_KEY=<your-api-key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
   REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
   REACT_APP_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
   REACT_APP_FIREBASE_APP_ID=<your-app-id>
   ```

5. Run the app locally:

   ```bash
   npm start
   ```

  The app will be available at `http://localhost:3000`.

### Deploy to Firebase
1. Make sure Firebase CLI is installed:

   ```bash
   npm install -g firebase-tools
   ```

3. Log in to Firebase

   ```bash
   firebase login
   ```

4. Deploy the application

   ``` bash
   firebase deploy
   ```

## Usage
1. Sign Up / Log In: Create a new account or log in using existing credentials.
2. Add Stock Price: Use the input form to add prices of assets for different accounts.
3. View and Filter Data: Use the dropdown menu to filter data by accounts and view prices.
4. Visualize Data: Check the dynamic charts displaying your assets over time.

## Future Enhancements
 - **Mobile Responsiveness**: Improve the layout and UI for mobile devices.
 - **Detailed Analytics**: Add more granular data analysis features, including insights into individual  portfolio growth over time.
- **Account Combinations**: Implement the ability to filter and compare data across multiple account combinations.

## Contact 
* Misuzu Taniguchi - mtaniguchi3@my.bcit.ca

## Acknowledgements 
* <a href="https://fonts.google.com/">Google Fonts</a>
