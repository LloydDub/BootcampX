const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = [process.argv[2] || "JUL02"];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

pool
  .query(queryString, cohortName)
  .then((res) => {
    console.log(res);
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));
