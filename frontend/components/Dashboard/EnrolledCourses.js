const EnrolledCourses = () => {
    return (
      <div className="p-6 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Your Enrolled Courses</h1>
        <ul className="space-y-3">
          <li className="p-4 border rounded-lg shadow-sm">
            <h2 className="font-semibold">Course 1</h2>
            <p>Description of Course 1.</p>
          </li>
          <li className="p-4 border rounded-lg shadow-sm">
            <h2 className="font-semibold">Course 2</h2>
            <p>Description of Course 2.</p>
          </li>
        </ul>
      </div>
    );
  };
  
  export default EnrolledCourses;
  