import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 50, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 14 })
  cpf: string;

  @Column({ type: "varchar", length: 16 })
  phone: string;

  @Column({ type: "date" })
  birthdate: Date | string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: false })
  is_seller: boolean;

  @Column({ type: "text", default: null })
  tokenResetPassword?: string | null;

  @Column({ nullable: true, type: "timestamp" })
  tokenResetPasswordExpiresAt: Date | null;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Vehicle, (vehicle) => vehicle.seller)
  vehicles: Vehicle[];

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Comment, (comment) => comment.owner)
  comments: Comment[];
}
export { User };
