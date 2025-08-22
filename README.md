# 📝 Mini Blog Website

A modern, professional, and responsive blog website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring full CRUD functionality, search capabilities, and a clean UI design.

![Mini Blog](https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

- 🔐 **Full CRUD Operations** - Create, Read, Update, Delete blog posts
- 📄 **Pagination** - Browse posts with 5 posts per page
- 🔍 **Search Functionality** - Filter posts by title or author
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean design with smooth animations and professional styling
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🖼️ **Professional Images** - High-quality Unsplash images for visual appeal

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - Modern UI library with hooks
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **React Router DOM 7.8.1** - Client-side routing
- **Axios 1.11.0** - HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js 4.19.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.5.1** - MongoDB object modeling
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.4.5** - Environment variable management

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas)
- **npm** or **yarn** package manager

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mini-blog-website
```

### 2. Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file (optional):**

   ```bash
   # Create .env file in backend directory
   echo "MONGODB_URI=mongodb://localhost:27017/Mini-Blog" > .env
   echo "PORT=5000" >> .env
   ```

   > **Note:** The app defaults to `mongodb://localhost:27017/Mini-Blog` if no `.env` file is provided.

4. **Start MongoDB:**

   - **Local MongoDB:** Ensure MongoDB is running on your system
   - **MongoDB Atlas:** Use your connection string in the `.env` file

5. **Start the backend server:**

   ```bash
   npm start
   # or
   node index.js
   ```

   ✅ Backend server will run on `http://localhost:5000`

### 3. Frontend Setup

1. **Navigate back to the project root:**

   ```bash
   cd ..
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Create frontend environment file (optional):**

   ```bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   ✅ Frontend will run on `http://localhost:5173`

## 📖 Usage Guide

### 🏠 Homepage

- View all blog posts in a beautiful grid layout
- Navigate through pages using pagination controls
- Use the search bar to find posts by title or author
- Click on any post card to read the full article

### ✍️ Creating Posts

1. Click **"Add Post"** in the navigation bar
2. Fill in the post title, author name, and content
3. Click **"Publish Post"** to save
4. You'll be redirected to the homepage to see your new post

### 📖 Reading Posts

- Click on any post card from the homepage
- View the full article with professional styling
- See author information and publication date
- Use navigation buttons to go back or edit the post

### ✏️ Editing Posts

1. From a post detail page, click **"Edit Post"**
2. Modify the title, content, or author information
3. Click **"Update Post"** to save changes
4. You'll be redirected back to the post detail page

### 🗑️ Deleting Posts

1. From a post detail page, click **"Delete"**
2. Confirm the deletion in the popup dialog
3. You'll be redirected to the homepage

## 📁 Project Structure

```
Mini Blog Website/
├── 📁 backend/                 # Node.js + Express.js backend
│   ├── 📁 models/              # Mongoose data models
│   │   └── 📄 Post.js          # Blog post schema definition
│   ├── 📁 routes/              # API route handlers
│   │   └── 📄 posts.js         # CRUD operations for posts
│   ├── 📄 index.js             # Main server application file
│   └── 📄 package.json         # Backend dependencies and scripts
├── 📁 public/                  # Static assets
├── 📁 src/                     # React frontend source code
│   ├── 📁 components/          # Reusable React components
│   │   ├── 📄 Header.jsx       # Navigation header
│   │   ├── 📄 Footer.jsx       # Site footer
│   │   ├── 📄 Hero.jsx         # Homepage hero section
│   │   ├── 📄 PostList.jsx     # Blog posts grid display
│   │   └── 📄 SearchBar.jsx    # Search functionality
│   ├── 📁 pages/               # Page-level components
│   │   ├── 📄 HomePage.jsx     # Main homepage
│   │   ├── 📄 AddPostPage.jsx  # Create new post form
│   │   ├── 📄 EditPostPage.jsx # Edit existing post form
│   │   └── 📄 PostDetailsPage.jsx # Single post view
│   ├── 📁 config/              # Configuration files
│   │   └── 📄 api.js           # API base URL configuration
│   ├── 📄 App.jsx              # Main app component with routing
│   ├── 📄 main.jsx             # React application entry point
│   └── 📄 index.css            # Global styles and Tailwind imports
├── 📄 index.html               # Main HTML template
├── 📄 package.json             # Frontend dependencies and scripts
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 vite.config.js           # Vite build tool configuration
├── 📄 .env                     # Environment variables (create manually)
└── 📄 README.md                # Project documentation
```

## 🎨 Design Features

### Color Palette

- **Primary:** Blue (#2563eb) to Teal (#0d9488) gradients
- **Background:** Soft gray (#f9fafb) to light blue (#eff6ff) gradients
- **Text:** Dark gray (#1f2937) for headings, medium gray (#6b7280) for body text
- **Accents:** White backgrounds with subtle shadows and borders

### Animations & Interactions

- **Fade-in animations** for post cards and page elements
- **Hover effects** with scale transforms and color transitions
- **Smooth transitions** for all interactive elements
- **Loading spinners** and error states for better UX

### Responsive Design

- **Mobile-first approach** with Tailwind CSS breakpoints
- **Flexible grid layouts** that adapt to screen sizes
- **Touch-friendly buttons** and navigation elements
- **Optimized typography** for readability across devices

## 🔧 API Endpoints

### Posts API (`/api/posts`)

| Method | Endpoint         | Description                              | Parameters                                      |
| ------ | ---------------- | ---------------------------------------- | ----------------------------------------------- |
| GET    | `/api/posts`     | Get all posts with pagination and search | `page`, `limit`, `search`                       |
| GET    | `/api/posts/:id` | Get single post by ID                    | `id` (URL parameter)                            |
| POST   | `/api/posts`     | Create new post                          | `title`, `content`, `author` (body)             |
| PUT    | `/api/posts/:id` | Update existing post                     | `id` (URL), `title`, `content`, `author` (body) |
| DELETE | `/api/posts/:id` | Delete post                              | `id` (URL parameter)                            |

### Example API Usage

```javascript
// Get posts with search and pagination
GET /api/posts?page=1&limit=5&search=react

// Create a new post
POST /api/posts
{
  "title": "My Amazing Blog Post",
  "content": "This is the content of my blog post...",
  "author": "John Doe"
}
```

## 🔒 Environment Variables

### Backend (.env in /backend)

```env
MONGODB_URI=mongodb://localhost:27017/Mini-Blog
PORT=5000
```

### Frontend (.env in root)

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or ensure MongoDB is available on your server
2. Set environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Update CORS settings for your frontend domain

### Frontend Deployment

1. Update `VITE_API_URL` to point to your deployed backend
2. Build the project: `npm run build`
3. Deploy the `dist` folder to Netlify, Vercel, or similar platforms

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**

- Ensure MongoDB is running locally or check your connection string
- Verify network connectivity for MongoDB Atlas

**CORS Errors:**

- Check that the backend CORS configuration allows your frontend domain
- Ensure API URLs are correct in the frontend configuration

**Build Errors:**

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for version compatibility issues

**Port Already in Use:**

- Change the PORT in your backend .env file
- Kill existing processes: `lsof -ti:5000 | xargs kill -9`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for beautiful stock photos
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [React](https://reactjs.org) team for the amazing library
- [MongoDB](https://mongodb.com) for the flexible database solution

---

**Built with ❤️ using React, Node.js, Express.js, and MongoDB**
