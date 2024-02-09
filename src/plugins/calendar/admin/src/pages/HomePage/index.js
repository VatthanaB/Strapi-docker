/*
 * HomePage
 *
 * This is the home page component that displays a calendar.
 */

// Importing necessary libraries and components
import React, { useState } from "react";
import Calendar from "react-calendar";
import pluginId from "../../pluginId";
import styles from "./HomePage.module.css";
import "react-calendar/dist/Calendar.css";
import { BaseHeaderLayout, ContentLayout, Layout } from "@strapi/design-system";

// HomePage component
const HomePage = () => {
  // State for storing the selected date
  const [date, setDate] = useState(new Date());

  // Handler for date change
  const handleDateChange = (value) => {
    // Check if the value is an array (in case of date range selection)
    if (Array.isArray(value)) {
      setDate(value[0]); // If it's an array, we take the first date
    } else {
      setDate(value); // If it's not an array, we directly set the date
    }

    // Create a new Date object
    let date = new Date(value);
    let formattedDate = date.toLocaleDateString("en-GB"); // 'dd/mm/yyyy' format

    console.log(formattedDate);
  };

  // Render the HomePage component
  return (
    <div className={styles.main_div}>
      <h1 className={styles.header}>Calendar's HomePage</h1>
      <p className={styles.paragraphe}>This is my calendar plugin</p>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="myCalendar"
      />
    </div>
  );
};

// Export the HomePage component as default
export default HomePage;
