import { NextFunction, Request, Response } from 'express';
import { NotFound } from '@core/types/errorHandler';
import coursesService from './courses.service';

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const newCourse = await coursesService.createCourse(body);
    res.json({ message: 'Course created successfully', newCourse });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const Course = await coursesService.getCourseById(req.params.id);
    if (!Course) throw new NotFound('Course not found');
    res.json(Course);
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Courses = await coursesService.getAllCourses();
    res.json(Courses);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCourse = await coursesService.updateCourse(req.params.id, req.body);
    if (!updatedCourse) throw new NotFound("Course not found");

    res.json({ message: 'Course updated successfully', Course: updatedCourse });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCourse = await coursesService.deleteCourse(req.params.id);
    if (!deletedCourse) throw new NotFound("Course not found");
    res.json({ message: 'Course deleted successfully', Course: deletedCourse });
  } catch (error) {
    next(error);
  }
};

export default { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse };