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
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Address, Vehicle } from ".";

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
  bithdate: Date | string;

  @Column({ type: "varchar", length: 256 })
  description: string;

  @Column({ type: "boolean", length: 256 })
  is_seller: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Vehicle, (vehicle) => vehicle.seller)
  vehicle: Vehicle[];

  @OneToMany(() => Address, (address) => address.user)
  address: Vehicle[];
}
export { User };
