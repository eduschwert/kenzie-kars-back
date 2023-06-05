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
import { Image, User, Comment } from ".";

@Entity("vehicles")
class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  brand: string;

  @Column({ type: "varchar", length: 50 })
  model: string;

  @Column({ type: "varchar", length: 4 })
  year: string;

  @Column({ type: "varchar", length: 20 })
  fuel: string;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "varchar", length: 30 })
  color: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "decimal" })
  fipe_price: number;

  @Column({ type: "varchar", length: 256 })
  cover_image: string;

  @Column({ default: true, type: "boolean" })
  is_active: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @ManyToOne(() => User, (user) => user.vehicles)
  seller: User;

  @OneToMany(() => Comment, (vehiclecomment) => vehiclecomment.vehicle)
  comments: Array<Comment>;

  @OneToMany(() => Image, (vehicleimage) => vehicleimage.vehicle)
  images: Array<Image>;
}

export { Vehicle };
