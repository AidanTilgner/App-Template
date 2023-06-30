import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

enum RoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  role!: RoleEnum;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
