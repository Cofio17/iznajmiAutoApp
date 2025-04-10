 # Car Rental Platform
Test dA li radi
## Overview  
This project is a **car rental platform** that allows users to browse and reserve cars from multiple rental agencies. It integrates advanced booking features to simplify the reservation process and improve the management of car availability for agencies.

---

## Key Features  

### **1. Multi-Agency Car Listings**  
- The platform hosts cars from **multiple rental agencies**, giving users a variety of options.  
- Each car listing includes detailed information such as car model, price, availability, and agency details.  

### **2. Seamless Reservation Process**  
- Users can **select and reserve a car** for their desired dates directly through the platform.  
- The system automatically disables unavailable dates, preventing double bookings.  

### **3. Google Calendar Integration**  
- Upon reservation, the system syncs with the agency's **Google Calendar** using the Google Calendar API.  
- The reserved dates are blocked in the calendar, allowing agencies to easily manage their car schedules and availability.

---

## Technical Stack  

### **Frontend**  
- **React.js**: For building the user interface and creating a seamless user experience.  

### **Backend**  
- **Node.js** with **Express**: For handling server-side operations and API integration.  

### **Database**  
- **MongoDB**: For storing car listings, user data, and reservation details.  

### **Google Calendar API**  
- Used for synchronizing reservation data with agency calendars, ensuring real-time updates.  

---

## How It Works  

1. **Browse Cars**: Users can view a wide selection of cars listed by different agencies.  
2. **Select Dates**: They choose available dates on a calendar, which highlights unavailable dates in gray.  
3. **Make a Reservation**: Upon confirmation, the system reserves the car and blocks the selected dates in the agency's Google Calendar.  

---

This project was built using the **MERN stack** (MongoDB, Express, React, Node.js) and incorporates **Google Calendar API** for enhanced functionality. It provides a practical solution for both users and rental agencies to streamline the car rental process.
