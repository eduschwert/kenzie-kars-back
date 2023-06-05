import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Vehicle, User } from ".";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @ManyToOne(() => User, (user) => user.comments)
  owner: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.comments)
  vehicle: Vehicle;
}
export { Comment };
