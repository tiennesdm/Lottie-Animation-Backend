# Offline-First Lottie Animation Management System Backend 

## Overview

This project is a React application designed to enable users to search, preview, upload, and download Lottie animations. The system also provides a detailed view of each animation, showcasing its metadata. Key to this application is its robust offline functionality, ensuring users can access and interact with animations and metadata without an internet connection.

## Features

This application includes the following features:

- **Search and Preview Animations**: Users can search through a collection of Lottie animations and preview them.
- **Upload Animations**: Users can upload new Lottie animations to the system.
- **Download Animations**: Users can download Lottie animations for offline use.
- **Offline Capabilities**: The application supports offline use, allowing users to view and interact with animations and metadata without an internet connection.

## Technologies

The application uses the following technologies:

- **Frontend**: React, React Router, Redux (for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Additional Tools**: Service Workers for offline support, Lottie Library for rendering animations, Redux Persist for store management, Webpack for configuration, jest and react testing lib 

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm or yarn(1.22.22)
- MongoDB instance (local or cloud-based)
- 

### DATABASE URL ###
**MONGO_DB_URL=mongodb+srv://tiennesdm:shubhammehta@lottie-api.g4jdpmc.mongodb.net**

### Backend URL ###
**http://localhost:3000/graphql**

### Frontend Setup ###

Follow these steps to set up the project:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tiennesdm/Offline-Management-System.git
   cd Offline-Management-System
   ```
 2. **Installation**
     ```bash
      yarn install
        yarn build
    ```
3. **RUN THE PROJECT**
     ```bash
      yarn dev
      ```
4. **VERIFY TEST CASES FOR COMPONENT**
     ```bash
      yarn test
      ```
5. **GRAPHQL QUERY AND MUTATION**
    ```
    1. export const UPLOAD_LOTTIE =`
    mutation uploadLottie($file: Upload!, $name: String!, $description: String!) {
    uploadLottie(file: $file, name: $name, description: $description) {
      id
      filename
      mimetype
      encoding
      url
      name
      description
      isValidLottie
     }
     }
    `;
    2. export const GET_LOTTIES = gql`
        query GetLotties {
         lotties {
           id
           filename
           mimetype
           encoding
           url
           name
          description
          isValidLottie
       }
      }
    `;
    3. export const SEARCH_LOTTIES = gql`
        query SearchLotties($query: String!) {
          searchLotties(query: $query) {
           id
           filename
           mimetype
           encoding
          url
          name
          description
         isValidLottie
       }
      }
     `;
     ```
     
### Backend Setup (Offline-Management-System-Backend) ###

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tiennesdm/Offline-Management-System-Backend.git
   cd Offline-Management-System-Backend
   ```
 2. **Installation**
       ```bash
        yarn install
        ```
3. **RUN THE PROJECT**
     ```bash
      yarn dev
      ```
4. **GRAPHQL QUERY AND MUTATION**
    ```
    1. mutation uploadLottie($file: Upload!, $name: String!, $description: String!) {
    uploadLottie(file: $file, name: $name, description: $description) {
      id
      filename
      mimetype
      encoding
      url
      name
      description
      isValidLottie
     }
     }
    `;
    2. query GetLotties {
         lotties {
           id
           filename
           mimetype
           encoding
           url
           name
          description
          isValidLottie
       }
      }
    `;
    3. query SearchLotties($query: String!) {
          searchLotties(query: $query) {
           id
           filename
           mimetype
           encoding
          url
          name
          description
         isValidLottie
       }
      }
     `;
     ```













      
