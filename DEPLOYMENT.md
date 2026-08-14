# Render Deployment Guide

This project is fully configured to be deployed as a single unified MERN Web Service on [Render](https://render.com/). 

In production mode (`NODE_ENV=production`), the backend Express server automatically serves the compiled frontend assets from `frontend/dist` and handles API requests under the `/api` prefix, allowing you to run the entire app on a single free/hobby instance.

---

## 1. Prerequisites & Database Setup (MongoDB Atlas)

Since Render does not offer a built-in MongoDB service, it is highly recommended to use **MongoDB Atlas** (which has a generous free tier):

1. Sign up/log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new **Free Shared Cluster**.
3. Under **Network Access**, add an entry to allow access from anywhere (`0.0.0.0/0`), as Render's outbound IPs rotate.
4. Under **Database Access**, create a database user with a secure password.
5. Click **Connect** -> **Choose a connection method** -> **Drivers** (Node.js).
6. Copy the connection string. It will look like:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
   *(Be sure to replace `<username>` and `<password>` with the database user credentials you created).*

---

## 2. Deploying on Render (Step-by-Step)

### Option A: Blueprints (Infrastructure-as-Code)
If you link your GitHub repository to Render, you can use the pre-configured [render.yaml](file:///e:/AntiGravity/Portfolio/render.yaml) file:
1. Go to the **Blueprints** page on the Render dashboard.
2. Click **New Blueprint Instance**.
3. Select your repository.
4. Fill in the required environment variables (`MONGODB_URI` and `JWT_SECRET`).
5. Click **Approve**. Render will automatically provision the service.

### Option B: Manual Web Service Setup
1. On the Render Dashboard, click **New +** and select **Web Service**.
2. Connect your Git repository.
3. Configure the service:
   * **Name**: `rohan-raut-portfolio`
   * **Runtime**: `Node`
   * **Build Command**: `npm run build`
   * **Start Command**: `npm start`
4. Under **Advanced**, add the following **Environment Variables**:
   * `NODE_ENV`: `production`
   * `MONGODB_URI`: *Your MongoDB Atlas connection string*
   * `JWT_SECRET`: *A secure random string (e.g., for JWT session verification)*
5. Click **Create Web Service**.

---

## 3. Seeding Data to Your Production Database

Once the service is active, you will want to seed your initial projects and skills data to your new database:

1. Temporarily add your production `MONGODB_URI` to your local `backend/.env` file.
2. Run the seed script locally:
   ```bash
   npm run seed
   ```
3. Remove the production URI from your local `.env` file to prevent accidental overrides.

Alternatively, you can access the **Render Shell** under your Web Service dashboard and run:
```bash
npm run seed
```
This will automatically connect to your production DB using the configured environment variables.
