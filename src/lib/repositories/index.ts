import { createMongoRepository } from "@/lib/db/repository";
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

export const courseRepository = createMongoRepository<ICourse>(Course);
export const blogRepository = createMongoRepository<IBlogPost>(BlogPost);
export const productRepository = createMongoRepository<IProduct>(Product);
export const professionalCourseRepository =
  createMongoRepository<IProfessionalCourse>(ProfessionalCourse);
export const schoolSubjectRepository =
  createMongoRepository<ISchoolSubject>(SchoolSubject);
export const contentRepository = createMongoRepository<IContent>(Content);
export const userRepository = createMongoRepository<IUser>(User);
export const callbackRequestRepository =
  createMongoRepository<ICallbackRequest>(CallbackRequest);
