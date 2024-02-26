import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CandidateReport } from "./CandidateReport";
import { AdverseAction } from "./AdverseAction";
import { CourtSearch } from "./CourtSearch";

@Entity()
export class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: "date" })
  dob: Date;

  @Column()
  phone: string;

  @Column()
  ssn: string;

  @Column()
  zipcode: string;

  @Column()
  location: string;

  @Column({ name: "drivers_license" })
  driversLicense: string;

  @CreateDateColumn({ name: "created_at",type:"datetime" })
  createdAt: Date;

  @OneToOne(() => CandidateReport, (report) => report.candidate)
  report: CandidateReport;

  @OneToOne(() => AdverseAction, (adverseAction) => adverseAction.candidate)
  adverseAction: AdverseAction;

  @OneToMany(() => CourtSearch, (courtSearch) => courtSearch.candidate)
  courtSearches: CourtSearch[];
}
