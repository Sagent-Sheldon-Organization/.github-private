import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Candidate } from "./Candidate";

@Entity()
export class CandidateReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({nullable:true})
  adjudication: string;

  @CreateDateColumn({ name: "created_at" ,type:"datetime" })
  createdAt: Date;

  @Column({name:'package_type'})
  packageType: string;

  @Column({ type: "datetime", nullable: true, name: "completed_at" })
  completedAt: Date;

  @OneToOne(() => Candidate, (candidate) => candidate.report)
  @JoinColumn({ name: "candidate_id" })
  candidate: Candidate;
}
