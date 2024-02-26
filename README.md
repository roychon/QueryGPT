<!-- ABOUT THE PROJECT -->
## Virtual.AI
The AI chat app for chats, speech, and handwritting.

![Screenshot of Chats Page](https://github.com/roychon/virtual.ai/blob/main/frontend/src/public/sample_chat.png)

This application provides a modern and interactive platform for real-time communication. Whether you're collaborating with team members, connecting with friends, or seeking assistance, this chat app delivers a seamless and engaging experience.

Features:
* **AI Integration:** Benefit from AI-powered responses to enhance your chat experience.
* **Speech Recognition:** Utilize speech recognition technology to convert spoken words into text messages, enabling hands-free communication.
* **Handwriting Recognition:** Seamlessly integrate handwriting recognition to allow users to input messages using a stylus or touchscreen device.
* **Thread Management:** Organize discussions into threads for better clarity and organization.
* **User Authentication:** Secure your conversations with user authentication, ensuring privacy and confidentiality.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Technologies Used

This project is a chat application built with React for the frontend, MongoDB and Express.js for the backend, and LangChain for AI-powered responses. It utilizes Tailwind CSS for styling.

* [![React][React.js]][React-url]
* [![Langchain][Langchain.com]][Langchain-url]
* [![Typecscript][Typescript.com]][Typescript-url]
* [![Express][Express.js]][Express-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
* [![Tailwind.css][Tailwind.com]][Tailwind-url]
* [![Express][Express.js]][Express-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

1. **Clone the Repository:** Start by cloning the project repository to your local machine.
2. **Install Dependencies:** Navigate to the project directory and install frontend and backend dependencies.
3. **Configure Environment Variables:** Set up environment variables for MongoDB URI and LangChain API key.
4. **Start the Servers:** Launch the frontend and backend servers to run the application locally.
5. **Access the Application:** Open your web browser and navigate to http://localhost:3000 to access the chat application.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can run a local version of this app on your machine_

1. Get an **OPEN_AI_API Key** at [https://openai.com/gpt-4]((https://openai.com/gpt-4))
2. Clone the repo
   ```sh
   git clone https://github.com/roychon/virtual.ai
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create your <code>.env</code> file
5. Enter your API in `.env`
   ```sh
   OPENAI_API_KEY = 'ENTER YOUR API';
   ```
6. Enter your mongodb url in `/env`
   ```sh
   MONGODB_URL = 'ENTER YOUR MONGODB URL`
   ```
7. Set Cookie details
   ```sh
   COOKIE_SECRET = 'ENTER YOUR COOKIE SECRET'
   COOKIE_NAME = 'ENTER YOUR COOKIE NAME'
   COOKIE_EXPIRY = 'ENTER YOUR COOKIE EXPIRY DATE'
   ```
8. Start frontend server
   ```sh
   cd frontend/src
   npm run dev
   ```
9. Start backend server
    ```sh
    cd backend
    npm run dev
    ```
10. Once the servers are running, open your web browser and navigate to <code>http://localhost:3000</code> to access the chat application.
    
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_Below are some screenshots of virtual.ai in the browser_
![Screenshot of Home Page](https://github.com/roychon/virtual.ai/blob/main/frontend/src/public/sample_home_page.png)

![Screenshot of Chats Page](https://github.com/roychon/virtual.ai/blob/main/frontend/src/public/sample_login_page.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript.com]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&
[Typescript-url]: https://www.typescriptlang.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[MongoDB.com]: 	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Langchain.com]: https://img.shields.io/badge/LangChain-4F0599?style=for-the-badge&logo=langchain
[Langchain-url]: https://www.langchain.com/


