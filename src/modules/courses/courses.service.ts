

import { BadRequest, Forbidden, NotFound } from '@core/types/errorHandler';
import { Course, ICourse } from './courses.model';

const createCourse = async (input: ICourse) => {
  const newCourse = new Course(input);
  if (!input.name || !input.price) throw new BadRequest(`Name and price are required`);

  return await newCourse.save();
};


const getCourseById = async (id: string) => {
  const course = await Course.findById(id);
  if (!Course) throw new NotFound('Course not found');
  return course;
};

const getAllCourses = async () => {
  const course = await Course.find();
  return course
};

const updateCourse = async (id: string, updates: Partial<ICourse>) => {
  const course = await Course.findByIdAndUpdate(id, updates, { new: true });
  return course
};

const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};

export default { createCourse, getCourseById, getAllCourses, updateCourse, deleteCourse }