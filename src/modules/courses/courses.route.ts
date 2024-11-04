import { Application, Router } from 'express';
import coursesController from './courses.controller';


const courseRouter = (app: Application) => {
    const path = 'courses';
    app.post(`/${path}`, coursesController.createCourse);
    app.get(`/${path}/:id`, coursesController.getCourse);
    app.get(`/${path}`, coursesController.getAllCourses);
    app.put(`/${path}/:id`, coursesController.updateCourse);
    app.delete(`/${path}/:id`, coursesController.deleteCourse);
}
export default courseRouter;
