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

  @Column({ length: 9 })
  cep: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  street: string;

  @Column({ length: 10 })
  number: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  complement?: string | null | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}

export { Address };
