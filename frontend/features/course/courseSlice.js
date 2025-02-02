import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  enrolledCourses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchCoursesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess(state, action) {
      state.courses = action.payload;
      state.loading = false;
    },
    fetchCoursesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    enrollCourse(state, action) {
      const courseId = action.payload;
      if (!state.enrolledCourses.includes(courseId)) {
        state.enrolledCourses.push(courseId);
      }
    },
    setUserEnrolledCourses(state, action) {
      state.enrolledCourses = action.payload;
    },
    clearEnrolledCourses(state) {
      state.courses = [];
      state.enrolledCourses = [];
    },
  },
});

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  addCourse,
  enrollCourse,
  setUserEnrolledCourses,
  clearEnrolledCourses,
} = coursesSlice.actions;

export default coursesSlice.reducer;
