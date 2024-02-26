import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "./Candidate";

@Entity()
export class CourtSearch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  search: string;

  @Column()
  status: string;

  @Column({ type: "date" })
  date: Date;

  @ManyToOne(() => Candidate, candidate => candidate.courtSearches)
  @JoinColumn({name:'candidate_id'})
  candidate: Candidate;
}
