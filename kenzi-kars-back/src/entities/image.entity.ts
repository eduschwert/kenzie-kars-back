import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Vehicle } from ".";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 256 })
  image_url: string;

  @Column({ type: "number" })
  image_number: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @ManyToOne(() => Vehicle)
  vehicle_id: Vehicle;
}
export { Image };
