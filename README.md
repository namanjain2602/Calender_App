
# Calendar Communication Tracker

This is a React-based Calendar Application designed to help organizations track and manage their communications with companies. It enables easy logging of past interactions, planning future communications, and ensuring follow-ups are timely and consistent.

## Features

### Admin Module
- **Company Management**: Add, edit, and delete companies, along with details such as name, location, LinkedIn profile, emails, phone numbers, and comments.
- **Communication Method Management**: Define communication methods (e.g., LinkedIn Post, Email, Phone Call) and manage their sequence and mandatory status.

### User Module
- **Dashboard**: Visualize company details with communication logs and next scheduled communications, color-coded for overdue or due today.
- **Communication Action**: Log communications, add notes, and reset highlights for overdue or due tasks.
- **Notifications**: Display overdue and due communications.
- **Calendar View**: Manage past and upcoming communications in a calendar interface.

### Reporting and Analytics Module (Optional)
- **Communication Frequency Report**: View usage statistics for each communication method.
- **Engagement Effectiveness Dashboard**: Track the effectiveness of communication methods.
- **Overdue Communication Trends**: Analyze overdue communications over time.
- **Real-Time Activity Log**: Live feed of communication activities.
- **Downloadable Reports**: Export reports in PDF or CSV format.

## Folder Structure

```
/src
  ├── App.css
  ├── App.js
  ├── components
  │   ├── Admin
  │   │   ├── CommunicationMethodForm.js
  │   │   ├── CommunicationMethodList.js
  │   │   ├── CompanyForm.js
  │   │   ├── CompanyList.js
  │   │   └── Reports.js
  │   ├── home
  │   │   └── Home.js
  │   ├── login
  │   │   └── Login.js
  │   ├── signup
  │   │   └── Signup.js
  │   └── Users
  │       ├── CalendarView.js
  │       ├── CommunicationAction.js
  │       ├── DashboardTable.js
  │       └── Notifications.js
  ├── index.css
  ├── index.js
  └── shared
      ├── Footer.js
      └── Navbar.js
```

- `App.js`: Main entry point for the application.
- `components/`: Contains all React components for different modules and views.
- `shared/`: Contains common components like Navbar and Footer.

## Project Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Installing Dependencies

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-repository-name/calendar-app.git
   cd calendar-app
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```
   or, if you are using yarn:
   ```bash
   yarn install
   ```

### Running the Application Locally

Once the dependencies are installed, you can run the application locally.

1. Start the development server:
   ```bash
   npm start
   ```
   or, if you are using yarn:
   ```bash
   yarn start
   ```

2. Open your browser and visit `http://localhost:3000` to see the application in action.

### Build for Production

To build the application for production, use the following command:
```bash
npm run build
```
This will create an optimized build in the `build/` folder.

### Deployment to Netlify

1. Push your code to GitHub or any other Git-based version control system.
2. Go to [Netlify](https://www.netlify.com/) and create a new site from Git.
3. Link your repository to Netlify and deploy the application.
4. Netlify will automatically build and deploy your app.

### Environment Variables

If you need to use environment variables, create a `.env` file in the root of the project. Example:

```env
REACT_APP_API_URL=https://your-api-url.com
```

Then, you can access these variables in your React components like so:
```js
const apiUrl = process.env.REACT_APP_API_URL;
```

## Usage

- **Admin Users**: Use the Admin Module to manage companies and communication methods.
- **End Users**: Interact with the Dashboard to manage communications, log actions, and follow up on overdue tasks.
- **Reporting**: View performance and trends using the Reporting and Analytics Module (optional).

## Contributing

We welcome contributions! If you find bugs or have suggestions for new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

