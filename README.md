# Diabetes Risk Analyzer

![Real Estate Data UI](images/UI_1.png "Sample")
The Diabetes Risk Analyzer web application utilizes a **React UI** for the frontend and a **Flask API server** for the backend.
---

## 🚀 **Getting Started**

### Prerequisites
- Ensure you have **Node.js**, **npm**, and **Python** installed on your system.

---

## 🛠 **Setting Up the Backend**

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the necessary dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask API server:
   ```bash
   python app.py
   ```

   The server will start by default at **http://localhost:5000**.

---

## 🖥 **Setting Up the Frontend**

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies using npm or yarn:
   ```bash
   npm install
   # OR
   yarn
   ```

3. Start the React development server:
   ```bash
   npm start
   # OR
   yarn start
   ```

   The frontend will run by default on **http://localhost:3000**.

---

## 🛠 **Scripts Overview**

### For Frontend
- **`npm start`**: Runs the React app in development mode.
- **`npm test`**: Launches the test runner in interactive mode.
- **`npm run build`**: Builds the React app for production into the `build` folder.
- **`npm run eject`**: Ejects the app configuration for advanced customization.

### For Backend
- **`python app.py`**: Starts the Flask server in development mode.
- **`pip install -r requirements.txt`**: Installs all backend dependencies.

---

## 🌟 **Application Overview**

1. **Two-Tier Architecture**:
   - **Frontend**: Built with React and decoupled from the backend logic.
   - **Backend**: A Flask API for handling requests and predictions.
   
2. **Default Configurations**:
   - Flask API runs on **port 5000**.
   - React UI communicates with the backend on **port 5000**.

3. **Customization Options**:
   - Change the backend port in the Flask app configuration.
   - Update the React frontend to point to the new backend port.

---

## 📚 **Learn More**

### React Documentation
- [React Official Docs](https://reactjs.org/)
- [Create React App Guide](https://create-react-app.dev/)

### Flask Documentation
- [Flask Official Docs](https://flask.palletsprojects.com/)

---

## 🚨 **Troubleshooting**

### Backend
- **Issue**: Flask API server is not running.
  - **Fix**: Ensure all dependencies are installed via `pip install -r requirements.txt`.

### Frontend
- **Issue**: React app doesn't load or shows errors.
  - **Fix**: Ensure `npm install` or `yarn` completes without issues and start the server again.

### Build Issues
- **Issue**: `npm run build` fails to minify.
  - **Fix**: Check for outdated dependencies or incompatible code and refer to [troubleshooting build issues](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).

---

Enjoy building with **Diabetes Risk Analyzer**! 🚀
