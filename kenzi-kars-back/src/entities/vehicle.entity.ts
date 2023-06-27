import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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

  @Column({ type: "integer" })
  fuel: Number;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "varchar", length: 30 })
  color: string;

  @Column({ type: "decimal" })
  fipe_price: number;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  cover_image: string;

  @Column({ default: true, type: "boolean" })
  is_active: boolean;

  @Column({ type: "boolean" })
  is_good_buy: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.vehicles, { onDelete: "CASCADE" })
  seller: User;

  @OneToMany(() => Comment, (vehiclecomment) => vehiclecomment.vehicle, {
    onDelete: "CASCADE",
  })
  comments: Array<Comment>;

  @OneToMany(() => Image, (vehicleimage) => vehicleimage.vehicle)
  images: Array<Image>;
}

export { Vehicle };
