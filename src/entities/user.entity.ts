import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

import { Address, Vehicle, Comment } from ".";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column({ type: "text", nullable: true })
  description?: string | null | undefined;

  @Column({ default: false })
  isSeller: boolean;

  @Column({ type: "text", nullable: true })
  tokenResetPassword?: string | null | undefined;

  @Column({ nullable: true, type: "timestamp" })
  tokenResetPasswordExpiresAt?: Date | null | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}

export { User };
