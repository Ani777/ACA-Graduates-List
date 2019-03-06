import React from 'react';

function CoursesList (props) {
    const { courses } = props;
    const coursesList = courses.map(course => <tr key={course.name}>
        <td key={course.name}>{course.name}</td>
    </tr>);

    return(
        <tbody>
        {coursesList}
        </tbody>
    );

}

export default CoursesList;