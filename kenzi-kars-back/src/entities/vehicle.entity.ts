import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from ".";

@Entity("vehicles")
class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  brand: string;

  @Column({ type: "varchar", length: 4 })
  year: string;

  @Column({ type: "varchar", length: 15 })
  fuel: string;

  @Column({ type: "integer", length: 15 })
  mileage: number;

  @Column({ type: "varchar", length: 256 })
  description: string;

  @Column({ type: "decimal", length: 256 })
  price: number;

  @Column({ type: "varchar", length: 30 })
  color: string;

  @Column({ type: "decimal", length: 256 })
  fipe_price: number;

  @Column({ type: "varchar", length: 256 })
  cover_image: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @ManyToOne(() => User)
  seller: User;
  //   @OneToMany(
  //     () => Schedule,
  //     (realEstateSchedule) => realEstateSchedule.realEstate
  //   )
  //   schedules: Array<Schedule>;
  // }

  @OneToMany(() => Comment, (vehiclecomment) => vehiclecomment.vehicle)
  comments: Array<Comment>;
}

export { Vehicle };
