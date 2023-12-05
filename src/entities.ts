import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from "typeorm";

// store unsupported value as a string
const json: ValueTransformer = {
  from: (value: string) => JSON.parse(value),
  to: (value: any) => JSON.stringify(value),
};

@Entity({ synchronize: true })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ nullable: true, unique: true })
  email?: string;
  @Column({ nullable: true, unique: true })
  phone?: string;
  @Column("text", { transformer: json })
  hobbies!: string[];
}
