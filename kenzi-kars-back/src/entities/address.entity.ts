import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from ".";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 9 })
  cep: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 50 })
  city: string;

  @Column({ type: "varchar", length: 50 })
  street_number: string;

  @Column({ type: "varchar", length: 50 })
  street_name: string;

  @Column({ type: "varchar", length: 50, default: "no complement" })
  complement: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
export { Address };
