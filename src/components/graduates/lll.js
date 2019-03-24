import {firestore} from "firebase";

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

static findCourseId(courseName){
    FireManager.getCourses()
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => doc.id)})
        .then(ids =>{
            return ids.find(id => id===courseName)})
        .then(arr => arr[1])
}
