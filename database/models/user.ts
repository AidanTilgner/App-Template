import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import RefreshToken from "./token";

enum RoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false, select: false })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  role!: RoleEnum;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens!: RefreshToken[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
