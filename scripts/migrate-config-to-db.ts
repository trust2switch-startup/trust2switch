// Migration script to move config data from files to database
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), '.env.local');
const envResult = dotenv.config({ path: envPath });

if (envResult.error && !process.env.MONGODB_URI && !process.env.DATABASE_URL) {
  console.warn(`Warning: Could not load .env.local from ${envPath}`);
  console.warn('Trying .env file as fallback...');
  dotenv.config(); // Also try .env as fallback
}

// Log loaded env vars for debugging (without sensitive data)
if (process.env.MONGODB_URI || process.env.DATABASE_URL) {
  console.log('✓ Environment variables loaded');
  console.log(`  DATABASE_TYPE: ${process.env.DATABASE_TYPE || 'mongodb'}`);
  console.log(`  MONGODB_URI: ${process.env.MONGODB_URI ? '***set***' : 'not set'}`);
  console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? '***set***' : 'not set'}`);
} else {
  console.error('✗ ERROR: MONGODB_URI or DATABASE_URL not found in environment variables');
  console.error('  Please create a .env.local file with:');
  console.error('  MONGODB_URI=your-mongodb-connection-string');
  process.exit(1);
}

import { connectDatabase } from '../src/lib/db/database';
import { Course } from '../src/models/Course';
import { BlogPost } from '../src/models/BlogPost';
import { Product } from '../src/models/Product';
import { Content } from '../src/models/Content';
import { ProfessionalCourse } from '../src/models/ProfessionalCourse';
import { SchoolSubject } from '../src/models/SchoolSubject';
import { courses } from '../src/config/courses';
import { blogPosts } from '../src/config/blog';
import { products } from '../src/config/products';
import { content } from '../src/config/content';
import professionalCoursesData from '../src/config/professionalCourses.json';
import schoolSubjectsData from '../src/config/schoolSubjects.json';
import { requireDatabaseUrl } from '../src/lib/env';

async function migrate() {
  try {
    requireDatabaseUrl();
    console.log('Starting migration...');

    // Connect to database
    await connectDatabase();
    console.log('Connected to database');

    // Migrate Courses
    console.log('Migrating courses...');
    for (const course of courses) {
      const existingCourse = await Course.findOne({ slug: course.slug });
      if (!existingCourse) {
        // Remove id field as MongoDB will generate _id
        const { id, ...courseData } = course;
        await Course.create(courseData);
        console.log(`  - Created course: ${course.title}`);
      } else {
        // Update existing course
        const { id, ...courseData } = course;
        await Course.findOneAndUpdate({ slug: course.slug }, courseData);
        console.log(`  - Updated existing course: ${course.title}`);
      }
    }

    // Migrate Blog Posts
    console.log('Migrating blog posts...');
    for (const post of blogPosts) {
      const existingPost = await BlogPost.findOne({ slug: post.slug });
      if (!existingPost) {
        const { id, ...postData } = post;
        await BlogPost.create(postData);
        console.log(`  - Created blog post: ${post.title}`);
      } else {
        console.log(`  - Skipped existing blog post: ${post.title}`);
      }
    }

    // Migrate Products
    console.log('Migrating products...');
    for (const product of products) {
      const existingProduct = await Product.findOne({ sku: product.sku });
      if (!existingProduct) {
        const { id, ...productData } = product;
        await Product.create(productData);
        console.log(`  - Created product: ${product.title}`);
      } else {
        console.log(`  - Skipped existing product: ${product.title}`);
      }
    }

    // Migrate Content
    console.log('Migrating content...');
    const existingContent = await Content.findOne();
    if (!existingContent) {
      await Content.create(content);
      console.log('  - Created content configuration');
    } else {
      console.log('  - Content already exists, skipping');
    }

    // Migrate Professional Courses
    console.log('Migrating professional courses...');
    for (const course of professionalCoursesData) {
      const existingCourse = await ProfessionalCourse.findOne({ slug: course.slug });
      if (!existingCourse) {
        await ProfessionalCourse.create(course);
        console.log(`  - Created professional course: ${course.title}`);
      } else {
        console.log(`  - Skipped existing professional course: ${course.title}`);
      }
    }

    // Migrate School Subjects
    console.log('Migrating school subjects...');
    for (const subject of schoolSubjectsData) {
      const existingSubject = await SchoolSubject.findOne({ slug: subject.slug });
      if (!existingSubject) {
        await SchoolSubject.create(subject);
        console.log(`  - Created school subject: ${subject.title}`);
      } else {
        console.log(`  - Skipped existing school subject: ${subject.title}`);
      }
    }

    console.log('\nMigration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

// Run migration
migrate();

