import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { User, Comment, Image } from ".";

@Entity("vehicles")
class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 4 })
  year: string;

  @Column({ type: "integer" })
  fuel: number;

  @Column({ type: "integer" })
  mileage: number | string;

  @Column({ length: 30 })
  color: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  fipePrice: number | string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number | string;

  @Column({ type: "text", nullable: true })
  description?: string | null | undefined;

  @Column({ type: "text" })
  coverImage: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  isGoodBuy: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.vehicles, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Comment, (vehiclecomment) => vehiclecomment.vehicle, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @OneToMany(() => Image, (vehicleimage) => vehicleimage.vehicle)
  images: Image[];
}

export { Vehicle };
