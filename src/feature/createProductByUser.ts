import { authMiddleware } from "@core/middleware/authentication.middleware";
import { NotFound } from "@core/types/errorHandler";
import coursesService from "@modules/courses/courses.service";
import { User } from "@modules/users/users.model";
import { Application, NextFunction, Request, Response } from "express";

const createCourseByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).lean().select('_id');
        if (!user) {
            throw new NotFound('')
        }
        const data = req.body;
        const newCourse = await coursesService.createCourse(data);

        // let newCourse = await Course.findById("671f0667bb275c82f00b7bac").populate('assignUser',)
        res.send(newCourse);
    } catch (error) {
        next(error);
    }
}

const createUserRouter = (app: Application) => {
    app.get('/:id/assign-product-for-user', createCourseByUser);
};

export default createUserRouter;
