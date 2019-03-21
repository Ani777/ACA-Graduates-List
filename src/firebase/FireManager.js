import { firestore } from "firebase";
import  firebase  from 'firebase';

export default class FireManager {

    static getCourses() {
        const coursesRef = firestore()
            .collection("courses");
             return coursesRef.get()
    }

    static deleteCourse(course){
        const courseRef=firestore()
            .collection('courses')
            .doc(course);
        return courseRef.get()
            .then( doc => doc.data().graduates)
            .then(graduates => {
                 return Promise.all(graduates.map(graduateId => {
                     return firebase
                         .firestore()
                         .collection('graduates')
                         .doc(graduateId)
                         .get()
                 }))
            })
            .then(docs => {
            return docs.map(doc => {
                return [doc.data().visibleFor, doc.id]
            })
        })
            .then(arrs => {
                return Promise.all(arrs.map(arr => {
                     FireManager.RemoveGraduateForCompanies(...arr);
                     return arr[1]
                }))
            })
            .then((graduateIds)=> {
                return Promise.all(graduateIds.map(id => {
                    return FireManager.removeGraduate(id)
                }))})
            .then(()=>{
                courseRef.delete()
            })
    }

    static editCourse(courseId, newName){

       const courseRef = firestore()
           .collection('courses')
           .doc(courseId);
       return courseRef.update({name: newName})
           .then(()=>{
              return courseRef.get()
           })
           .then(doc => doc.data().graduates)
           .then(graduates => {
               return Promise.all(graduates.map(id => {
               return firestore()
                   .collection('graduates')
                   .doc(id)
                   .get()
           }))})
           .then(doc => {

               return doc.map(graduate=>{
               return [graduate.id, graduate.data().visibleFor]})
           })
           .then (arr => {
               return Promise.all(arr.map(item => {
                   return Promise.all([FireManager.updateGraduate(item[0], {course: newName}),
                   FireManager.updateGraduateForCompanies(item[1], item[0], {course: newName})]
               )}))
           })


    }


    static findCourseId(courseName){
      return  FireManager.getCourses()
            .then(querySnapshot => {
                return querySnapshot.docs.map(doc => {
                    return [doc.data().name, doc.id]})
            }).then(arr =>{
            return arr.find(item => item[0]===courseName)})
            .then(arr => arr[1])
    }

    static addGraduateToCourse(course, graduateId){
        FireManager.getCourses()
            .then(querySnapshot => {
                return querySnapshot.docs.map(doc => {
                    return [doc.data().name, doc.id]})
            }).then(arr =>{
            return arr.find(item => item[0]===course)})
            .then(arr => arr[1])
            .then(courseId=> {
                return firestore()
                    .collection('courses')
                    .doc(courseId)
                    .get()
            })
            .then(doc => [doc.data().graduates, doc.id])
            .then(arr => {
                arr[0].push(graduateId);
                return arr;
            })
            .then(arr =>{
                return firestore()
                    .collection('courses')
                    .doc(arr[1])
                    .update({graduates: arr[0]})
            })

    }

    static removeGraduateFromCourse(course, graduateId){
        FireManager.getCourses()
            .then(querySnapshot => {
                return querySnapshot.docs.map(doc => {
                    return [doc.data().name, doc.id]})
            }).then(arr =>{
            return arr.find(item => item[0]===course)})
            .then(arr => arr[1])
            .then(courseId=>{
                   return firestore()
                      .collection('courses')
                      .doc(courseId)
                       .get()})
            .then(doc => [doc.data().graduates, doc.id])
            .then(arr => {
                arr[0].splice(arr[0].indexOf(graduateId), 1);
                return arr;
            })
            .then(arr =>{
                firestore()
                    .collection('courses')
                    .doc(arr[1])
                    .update({graduates: arr[0]})
            })

    }


    static createCourseInFirebase(course) {
        return firestore()
            .collection("courses")
            .add({...course})
            // .doc(course.name)
            // .set({...course})
    }


    static createCompanyInFirebase(companyData, id) {
        return firestore()
            .collection("companies")
            .doc(id)
            .set(companyData);
    }

    static getCompanies() {
        const companiesRef = firestore().collection("companies");
        return companiesRef.get();
}

    static editCompany(id, newData) {
        return firestore()
            .collection('companies')
            .doc(id)
            .update({...newData})
    }

    static getAvailableGraduates (companyID){
       return firestore()
           .collection('companies')
           .doc(companyID)
           .collection('availableGraduates')
           .get()
        }

    static addAvailableGraduate(companyId, graduateId, graduate) {
        return firestore()
            .collection("companies")
            .doc(companyId)
            .collection("availableGraduates")
            .doc(graduateId)
            .set(graduate);

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


    // static addCourse(id, name, icon){
    //     return firestore()
    //         .collection("courses")
    //         .doc(id)
    //         .set(name).then(()=>{
    //             const storageRef = firebase.storage().ref('courseIcons');
    //             storageRef.put(icon).then(icon => {
    //             });
    //     });
    // }




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

    // static editGraduate(id, newData) {
    //     return firestore()
    //         .collection('graduates')
    //         .doc(id)
    //         .update(newData)
    // }



    static createUserWithEmailAndPassword (email, password){
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
    }


    // static removeCourse(course) {
    //    firestore()
    //        .collection('courses')
    //        .doc('ZtsTO8Ldz0B6tCHNEHlY')
    //        .get()
    //         .then(doc => {
    //             const courses = doc.data().courses;
    //             if (courses.includes(course)) {
    //                 const newCourses = [...courses];
    //                 newCourses.splice(courses.indexOf(course), 1);
    //                 return newCourses;
    //             }
    //         })
    //         .then(newCourses => firestore()
    //             .collection('courses')
    //             .doc('ZtsTO8Ldz0B6tCHNEHlY')
    //             .update({courses: newCourses}))
    // }

    static getGraduates() {
        const graduatesRef = firestore().collection("graduates");
        return graduatesRef.get();
    }


    static getGraduate(graduateId) {
    if (graduateId) {
        return firestore()
            .collection("graduates")
            .doc(graduateId)
            .get()
            .then(doc => {
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



static RemoveGraduateForCompanies(companyIds, graduatesId) {
        if(companyIds.length){
            return Promise.all(companyIds.map(companyId => {
        return firestore()
            .collection('companies')
            .doc(companyId)
            .collection('availableGraduates')
            .doc(graduatesId)
            .delete()
    }))}
}

    static updateGraduateForCompanies(visibleFor, graduateId, data){
        return Promise.all(visibleFor.map(companyId =>{
            return firestore()
                .collection('companies')
                .doc(companyId)
                .collection('availableGraduates')
                .doc(graduateId)
                .update(data)
        } ))
    }

    static removeVisibleFor(graduateId, companyId){
        const ref = firestore()
            .collection('graduates')
            .doc(graduateId)
        return ref.get()
                .then(doc => doc.data().visibleFor)
                .then(visibleFor => {
                    visibleFor.splice(visibleFor.indexOf(companyId), 1);
                    return visibleFor
                })
                .then(visibleFor => {
                    return ref.update({visibleFor})
            })

    }

    static removeAvailableGraduate(companyId, graduateId){
        return firestore()
            .collection('companies')
            .doc(companyId)
            .collection('availableGraduates')
            .doc(graduateId)
            .delete()
    }

    static removeAllAvailableGraduates(companyId){
        return FireManager.getAvailableGraduates(companyId).then(querySnapshot => {
            return querySnapshot.docs.map(doc => doc.id)
        }).then(ids => {
            return Promise.all(ids.map(id => {
                return Promise.all([FireManager.removeVisibleFor(id, companyId), FireManager.removeAvailableGraduate(companyId, id)])
            }))
        })
    }

    static removeCompany(companyId) {
        if (companyId) {
            return firestore()
                .collection("companies")
                .doc(companyId)
                .delete();
        }
    }


}
