import { firestore } from "firebase";
import  firebase  from 'firebase';

export default class FireManager {


    static addCourse(id, name, icon){
        return firestore()
            .collection("courses")
            .doc(id)
            .set(name).then(()=>{
                debugger;
                const storageRef = firebase.storage().ref('courseIcons');
                storageRef.put(icon).then(icon => {
                    debugger;
                });
        });
    }


    static createUserWithEmailAndPassword (email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)}

    static  writeUserData(course, dateOfBirth, email, feedback, firstName, lastName, phone, testResults, works){
        return firebase.writeUserData(course, dateOfBirth, email, feedback, firstName, lastName, phone, testResults, works)

    }


    static createStudentInFirebase(studentData, id) {
        return firestore()
            .collection("students")
            .doc(id)
            .set(studentData)
    }

    static removeStudent(id) {
        return firestore()
            .collection("students")
            .doc(id)
            .delete();
    }

    static editStudent(id, newData) {
        return firestore()
            .collection('students')
            .doc(id)
            .update({...newData})
    }

    static createUserWithEmailAndPassword (email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    static createCompanyInFirebase(companyData) {
        return firebase.firestore().collection("companies").add(companyData)
        .then(data =>console.log(data));
    }

    static removeCompany(id) {
            return firestore()
                .collection("companies")
                .doc(id)
                .delete();
    }

    static updateCompany(id, newData) {
        return firestore()
            .collection('companies')
            .doc(id)
            .update({...newData})
    }

    static addCourse(newCourse) {
        firestore().collection('courses').doc('ZtsTO8Ldz0B6tCHNEHlY').get()
            .then(doc => {
                const courses = doc.data().courses;
                if (!courses.includes(newCourse)) {
                    const newCourses = [...courses];
                    newCourses.push(newCourse);
                    return newCourses;
                }
            })
            .then(newCourses => firestore().collection('courses').doc('ZtsTO8Ldz0B6tCHNEHlY').update({courses: newCourses}))
    }

    static removeCourse(course) {
       firestore().collection('courses').doc('ZtsTO8Ldz0B6tCHNEHlY').get()
            .then(doc => {
                const courses = doc.data().courses;
                if (courses.includes(course)) {
                    const newCourses = [...courses];
                    newCourses.splice(courses.indexOf(course), 1);
                    return newCourses;
                }
            })
            .then(newCourses => firestore().collection('courses').doc('ZtsTO8Ldz0B6tCHNEHlY').update({courses: newCourses}))
    }

    // static addStudent(student) {
    //     if (student.id) {
    //         return firestore()
    //             .collection("students")
    //             .doc(student.id)
    //             .set(student);
    //     }
    // }



    // static editStudent(student) {
    //     if (student.id) {
    //         return firestore()
    //             .collection("students")
    //             .doc(student.id)
    //             .update({ ...student });
    //     }
    // }

    // static getStudent(student) {
    //     if (student.id) {
    //         const ref = firestore()
    //             .collection("students")
    //             .doc(student.id);

    //         return ref
    //             .get()
    //             .then(doc => {
    //                 if (doc.exists) {
    //                     return doc.data();
    //                 } else {
    //                     console.error("No such student!");
    //                 }
    //             })
    //             .catch(function(error) {
    //                 console.error("Error getting student:", error);
    //             });
    //     }
    // }

    // static getStudents() {
    //     const studentsRef = firestore().collection("students");
    //     console.log(" = ",studentsRef)
    //     return studentsRef
    //         .get()
    //         .then(function(querySnapshot) {
    //             return querySnapshot.docs.map(doc => doc.data());
    //         })
    //         .catch(function(error) {
    //             console.error("Error getting students:", error);
    //         });
    // }
}
