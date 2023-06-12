import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ type: "varchar", length: 50, nullable: true })
  complement?: string | null;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;
}
export { Address };
