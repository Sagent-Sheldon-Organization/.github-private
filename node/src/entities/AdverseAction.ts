import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "./Candidate";

@Entity()
export class AdverseAction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ type: "date", name: "pre_notice_date" })
  preNoticeDate: Date;

  @Column({ type: "date", name: "post_notice_date", nullable: true })
  postNoticeDate: Date;

  @OneToOne(() => Candidate, candidate => candidate.adverseAction)
  @JoinColumn({name:'candidate_id'})
  candidate: Candidate;
}
