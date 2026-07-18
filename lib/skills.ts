import { PokemonType } from "@/components/ui/TypeBadge";

export const SKILL_CATEGORIES: { name: string; type: PokemonType; items: string[] }[] = [
  {
    name: "Languages & Markup",
    type: "fire",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "SQL", "HTML", "CSS"]
  },
  {
    name: "Backend & Frameworks",
    type: "water",
    items: ["Node.js", "Express.js", "FastAPI", "NestJS", "SQLAlchemy", "MERN Stack", "Next.js"]
  },
  {
    name: "Databases & ORM",
    type: "ground",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle DB", "Mongoose", "Alembic"]
  },
  {
    name: "Auth & Security",
    type: "steel",
    items: ["JWT", "OAuth2", "bcrypt", "Role-Based Access Control", "Rate Limiting"]
  },
  {
    name: "Cloud & DevOps",
    type: "electric",
    items: ["AWS", "EC2", "S3", "Lambda", "DynamoDB", "SNS", "SQS", "API Gateway", "Docker", "Nginx", "Celery/Redis"]
  },
  {
    name: "Tools & Utilities",
    type: "fairy",
    items: ["Git", "GitHub", "Postman", "Supabase", "Cloudinary", "APScheduler"]
  }
];

export const ALL_SKILLS: { name: string; type: PokemonType }[] = SKILL_CATEGORIES.flatMap(cat =>
  cat.items.map(name => ({ name, type: cat.type }))
);
