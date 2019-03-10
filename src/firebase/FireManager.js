import { firestore } from "firebase";
import  firebase  from 'firebase';

export default class FireManager {

    static getCourses() {
        const coursesRef = firestore().collection("courses");
        return coursesRef.get();
    }

    static createCourseInFirebase(course) {
        return firestore()
            .collection("courses")
            .add({...course})
    }


    static createCompanyInFirebase(companyData) {
        return firebase.firestore().collection("companies").add(companyData);
    }

    static getCompanies() {
        const companiesRef = firestore().collection("companies");
        return companiesRef.get();
}

    static getAvailableGraduates (companyID){
       return firebase.firestore().collection('companies').doc(companyID).collection('availableGraduates').get()
        }


    static async getCurrentCompany(id) {
        let company = null;
        const ref = firestore()
                    .collection("companies")
                    .doc(id);
        await ref.get().then(doc => {
                if (doc.exists) {
                    company = doc.data();
                }
            });
        return company;
    }


    static addCourse(id, name, icon){
        return firestore()
            .collection("courses")
            .doc(id)
            .set(name).then(()=>{
                const storageRef = firebase.storage().ref('courseIcons');
                storageRef.put(icon).then(icon => {
                });
        });
    }




    static createGraduateInFirebase(graduateData) {
            return firestore()
            .collection("graduates")
            .add(graduateData)
    }

    static removeGraduate(graduateId) {
        if (graduateId) {
            return firestore()
                .collection("graduates")
                .doc(graduateId)
                .delete();
        }
    }

    static updateGraduate(id, data) {
        return firestore()
            .collection('graduates')
            .doc(id)
            .update({...data})
    }

    static createUserWithEmailAndPassword (email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
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

    static getGraduates() {
        const graduatesRef = firestore().collection("graduates");
        return graduatesRef.get();
    }


    static getGraduate(graduateId) {
    if (graduateId) {
        return firestore().collection("graduates").doc(graduateId).get().then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.error("No such graduate!");
            }
        })
            .catch(function (error) {
                console.error("Error getting graduate:", error);
            });
    }
}

}
