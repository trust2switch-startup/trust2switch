import { createPrismaRepository } from "@/lib/repositories/prisma-repo";
import { BlogPost, IBlogPost } from "@/models/BlogPost";
import { CallbackRequest, ICallbackRequest } from "@/models/CallbackRequest";
import { Content, IContent } from "@/models/Content";
import { Course, ICourse } from "@/models/Course";
import { Product, IProduct } from "@/models/Product";
import {
    ProfessionalCourse,
    IProfessionalCourse,
} from "@/models/ProfessionalCourse";
import { SchoolSubject, ISchoolSubject } from "@/models/SchoolSubject";
import { User, IUser } from "@/models/User";

export const courseRepository = createPrismaRepository<ICourse>("course");
export const blogRepository = createPrismaRepository<IBlogPost>("blogPost");
export const productRepository = createPrismaRepository<IProduct>("product");
export const professionalCourseRepository = createPrismaRepository<IProfessionalCourse>("professionalCourse");
export const schoolSubjectRepository = createPrismaRepository<ISchoolSubject>("schoolSubject");
export const contentRepository = createPrismaRepository<IContent>("content");
export const userRepository = createPrismaRepository<IUser>("user");
export const callbackRequestRepository = createPrismaRepository<ICallbackRequest>("callbackRequest");

