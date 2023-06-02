import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User, Vehicle } from ".";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 256 })
  content: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  //   @ManyToOne(() => RealEstate, (realEstates) => realEstates.schedules)
  //   realEstate: RealEstate;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.comments)
  vehicle: Vehicle;
}
export { Address };
