export class CourseDto {
  name: string | null;
  description: string | null;
  category: string | null;
  level: string | null;
  support: string | null;

  constructor() {
    this.name = null;
    this.description = null;
    this.category = null;
    this.level = null;
    this.support = null;
  }
}

export class CourseWithFileDto {
  courseDto: CourseDto | null;
  support: File | null;

  constructor() {
    this.courseDto = new CourseDto();
    this.support = null;
  }
}
