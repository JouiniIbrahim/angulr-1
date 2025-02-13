export class CourseDto {
  name: string | null;
  description: string | null;
  category: string | null;
  level: string | null;
  file: string | null;

  constructor() {
    this.name = null;
    this.description = null;
    this.category = null;
    this.level = null;
    this.file = null;
  }
}

export class CourseWithFileDto {
  courseDto: CourseDto | null;
  file: File | null;

  constructor() {
    this.courseDto = new CourseDto();
    this.file = null;
  }
}
