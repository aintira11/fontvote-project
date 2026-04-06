# FontVote Project 🗳️✨

A dynamic web application for voting on and discovering fonts, built with Angular, Firebase, and MySQL. Users can browse fonts, cast votes, and view voting statistics through interactive charts.

## 📋 Overview

FontVote is an interactive platform that enables users to participate in font selection and voting. The application combines a modern Angular frontend with Firebase authentication and MySQL backend to manage font voting data and user preferences.

### Tech Stack
- **Frontend Framework**: Angular 17.2.0
- **Language**: TypeScript (38.4% of codebase)
- **Markup**: HTML (37.7% of codebase)
- **Styling**: SCSS (23.9% of codebase)
- **UI Components**: Angular Material
- **Data Visualization**: Chart.js, CanvasJS
- **Backend**: Firebase (authentication & storage)
- **Database**: MySQL
- **Testing**: Jasmine + Karma
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- Angular CLI globally installed (`npm install -g @angular/cli`)
- MySQL database configured
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aintira11/fontvote-project.git
cd fontvote-project
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection:
   - Update `dbconnect.ts` with your MySQL credentials:
```typescript
{
    connectionLimit: 10,
    host: "your-host",
    user: "your-user",
    password: "your-password",
    database: "your-database"
}
```

4. Set up Firebase configuration:
   - Add your Firebase config to the appropriate service files

### Development Server

Start the local development server:
```bash
npm start
```
or
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

## 📦 Project Structure

```
fontvote-project/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable Angular components
│   │   ├── services/         # API & data services
│   │   ├── guards/           # Route guards
│   │   ├── models/           # TypeScript interfaces/models
│   │   ├── styles/           # Component styles
│   │   └── app.component.ts   # Root component
│   ├── assets/               # Static assets (images, fonts, etc.)
│   ├── styles.scss           # Global styles
│   └── main.ts               # Entry point
├── dbconnect.ts              # MySQL connection configuration
├── angular.json              # Angular CLI config
├── tsconfig.json             # TypeScript configuration
├── firebase.json             # Firebase configuration
├── package.json              # Dependencies
└── README.md
```

## 🛠️ Available Commands

### Development
```bash
npm start           # Start development server (ng serve)
npm run watch       # Build in watch mode
```

### Production
```bash
npm run build       # Build for production (optimized)
```

### Testing
```bash
npm test            # Run unit tests with Karma
```

### Code Generation
```bash
# Generate a new component
ng generate component component-name

# Generate services, pipes, directives, etc.
ng generate --help
```

## 🎯 Features

- **Font Voting**: Browse available fonts and cast votes
- **Interactive Charts**: Visualize voting data with Chart.js and CanvasJS
- **User Authentication**: Secure login with Firebase
- **Real-time Updates**: Live voting statistics
- **Responsive Design**: Mobile-friendly interface with Angular Material
- **Database Integration**: Persistent storage with MySQL

## 🔧 Database Connection

The project uses async/promise-based database queries:
```typescript
// dbconnect.ts
import mysql from "mysql";
import util from "util";

export const conn = mysql.createPool({...});
export const queryAsync = util.promisify(conn.query).bind(conn);
```

**Connection Details**:
- Connection pool limit: 10
- Supports async/await queries via promisified connection

## 📊 Data Visualization

FontVote includes charting capabilities:
- **Chart.js**: Version 4.4.2 for flexible, customizable charts
- **CanvasJS**: Version 1.2.0 for advanced chart types

Create voting statistics and visual reports using these libraries.

## 🔐 Firebase Integration

The project uses Firebase for:
- User authentication
- Cloud storage
- Real-time data synchronization

**Firebase Version**: 10.8.1

## 📝 Development Notes

- **TypeScript**: Strict mode recommended for type safety
- **Angular Material**: Pre-configured for UI components
- **SCSS**: Configure component styles using SCSS
- **Async Database Queries**: Use promisified queries for clean async/await syntax
- **Version**: Angular 17.2.0

## 📚 Key Dependencies

```
Core:
- @angular/core: ^17.2.0
- @angular/material: ^17.2.1
- rxjs: ~7.8.0

Charts & Visualization:
- chart.js: ^4.4.2
- @canvasjs/angular-charts: ^1.2.0

Backend:
- firebase: ^10.8.1
- mysql: ^2.18.1

Development:
- typescript: ~5.3.2
- @angular/cli: ^17.2.0
```

## 📄 License

ISC License - See package.json for details

## 👨‍💻 Author

Created by [@aintira11](https://github.com/aintira11)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Created**: March 12, 2024  
**Last Updated**: April 6, 2026
