# CulturApp Administrator
Welcome to our user report management platform! We provide a comprehensive solution for managing reports submitted by users within our application. Our goal is to ensure a safe and enjoyable experience for all users while maintaining the integrity of our platform.

### Key Features
Users can submit three types of reports:
1.  **Bug Reports:** Users can report technical issues, errors, or glitches they encounter while using our application. These reports help us identify and promptly address any bugs, ensuring a smoother experience for everyone.
2.  **User Reports:** Our platform allows users to report others for various reasons, including misconduct, inappropriate behavior, harassment, or the presence of fake accounts. These reports help us enforce community guidelines and maintain a respectful environment for all.
3.  Additionally, users can submit **requests to become organizers** for specific activities or events within our platform. These requests allow individuals to take on leadership roles and contribute to the organization and coordination of various activities, enriching the overall experience for our users.

### Review Process
Our team carefully reviews each report received to assess the situation and take appropriate action as needed. We prioritize the safety, security, and satisfaction of our users, and we are committed to addressing reports promptly and effectively.

### Administrator Responsibility
We encourage our administrators to use the reporting feature responsibly and to help us maintain a welcoming and inclusive community for everyone. Together, we can work towards creating a positive and enjoyable environment for all users to interact and engage with our platform.

### Installation
To get started, you'll need to have Node.js installed on your machine. We recommend using Node Version Manager (nvm) to manage your Node.js versions. You can install nvm from [here](https://github.com/nvm-sh/nvm).

Once you have nvm installed, you can install Node.js 16 by running the following command in your terminal:
```bash
nvm install 16
```
After installing Node.js 16, you can clone this repository and install all the dependencies by navigating to the project directory and running:
```bash
npm install
```
This will install all the necessary dependencies for running the application. Once the installation is complete, you can start the development server by running:
```bash
npm start
```
The application should now be running locally on your machine, and you can access it by navigating to http://localhost:3000 in your web browser.

If you encounter any issues with the dependencies after installation, you can run the `npm audit` command to check for potential vulnerabilities in the packages. In case vulnerabilities are identified, you can attempt to automatically fix them by running `npm audit fix`.

### Project Structure
The project directory consists of three main folders:
1.  **Node_modules:** This folder contains all the dependencies and packages required for the project. It's automatically generated when you run npm install to install project dependencies.
2.  **Public:** The public folder contains static assets that are served directly by the web server. This includes the HTML file (index.html) that serves as the entry point for the React application, as well as any other static files like images or fonts.
3.  **Src:** The src folder contains the source code of the React application. It's where most of the development work takes place. Within the src folder, we have three main subfolders:

- Components: This folder contains reusable React components that are used throughout the application. For   example, the menu component (Menu.js) is located here.
- Logic: The Logic folder contains logic-related files such as authentication wrappers (AuthWrapper.js), navigation logic (Navigation.js), and routing configuration (RenderRoutes.js). These files handle the logic and behavior of the application.
- Pages: The Pages folder contains the main pages or screens of the application. Each page is typically represented by a React component. For example, you might have HomePage.js, AboutPage.js, ContactPage.js, etc., each representing a different page of the application.

#### Example Structure
```plaintext
web/
│
├── node_modules/
│   ├── (dependencies)
│
├── public/
│   ├── index.html
│   ├── (other static assets)
│
└── src/
    ├── Components/
    │   ├── Menu.js
    │   ├── (other reusable components)
    │
    ├── Logic/
    │   ├── AuthWrapper.js
    │   ├── Navigation.js
    │   ├── RenderRoutes.js
    │   ├── (other logic-related files)
    │
    └── Pages/
        ├── Home.js
        ├── Login.js
        ├── ReportBug.js
        ├── (other page components)
```
