import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from "./employeeSlice";
import leaveReducer from "./LeaveSlice"
import authReducer from "./authSlice";
import announcementReducer from "./announcementSlice"
import DocumentReducer from './documentSlice';
import attendanceReducer from "./attendanceSlice"
import punchReducer  from "./punchSlice"
export const store = configureStore({
  reducer: {
     employees: employeeReducer,
     leave: leaveReducer,
     auth: authReducer,
     announcement: announcementReducer,
     documents: DocumentReducer,
     attendance: attendanceReducer,
     punch: punchReducer,

  },
});


