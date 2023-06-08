import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Vehicle } from ".";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 256 })
  image_url: string;

  @Column({ type: "integer" })
  image_number: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Vehicle, { onDelete: "CASCADE" })
  vehicle: Vehicle;
}
export { Image };
