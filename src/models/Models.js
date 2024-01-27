import { PrismaClient } from "@prisma/client"

export const ModelsMedia = new PrismaClient().media
export const ModelsUsers = new PrismaClient().users
export const ModelsMentors = new PrismaClient().mentors
export const ModelsChapters = new PrismaClient().chapters
export const ModelsCourses = new PrismaClient().courses
export const ModelsLessons = new PrismaClient().lessons
export const ModelsImageCourses = new PrismaClient().image_courses
export const ModelMyCourses = new PrismaClient().myCourses
export const ModelsReviews = new PrismaClient().reviews
export const ModelsOrders = new PrismaClient().orders
export const ModelsPaymentlogs = new PrismaClient().payment_logs