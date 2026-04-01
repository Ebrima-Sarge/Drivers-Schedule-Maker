Upcoming Rides Manager
This application is a specialized management tool designed to help users organize, track, and update their upcoming ride schedules. It provides a simple, interactive interface to view existing passenger data, add new entries, modify current ride details, and synchronize changes with a backend API.
 Key Functionalities
1. View & Load Rides
Upon launching, the app automatically fetches current ride data from the server. It displays each ride with its respective details:
Passenger Info: First Name, Last Name.
Trip Details: Pickup Location, Drop-off Location.
Time Management: Duration (in minutes).
Inclusion Status: Use the "Select" checkbox to toggle if a ride is included in your current scheduling plan.
2. Add New Rides
You can expand your schedule by clicking the Options menu (the vertical icon next to the "Upcoming Rides" header) and selecting the "Add New" option. This will create a fresh, empty input row where you can enter new passenger and trip information.
3. Manage & Edit
The app is built to be reactive. Every time you change a value in the input fields (e.g., updating a name or changing a pickup location), the app tracks these modifications. Once changes are detected, a "SEND" button will appear at the bottom of the screen to allow you to save your progress.
4. Synchronization (Saving Changes)
Clicking the "SEND" button triggers a synchronization process with the backend:
The app iterates through your modifications and sends updates via PATCH requests to ensure your changes are persisted on the server.
It provides feedback on the success or failure of these updates.
Upon a successful batch update, the application refreshes to reflect the most current state from the server.

