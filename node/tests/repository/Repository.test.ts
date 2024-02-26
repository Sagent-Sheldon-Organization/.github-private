import { User } from "../../src/entities/User";
import { Candidate } from "../../src/entities/Candidate";
import { AdverseAction } from "../../src/entities/AdverseAction";
import { CandidateReport } from "../../src/entities/CandidateReport";
import { CourtSearch } from "../../src/entities/CourtSearch";
import {
  findByUsername,
  createUser,
} from "../../src/repository/UserRepository";
import {
  findCandidateByEmail,
  findCandidateById,
  createCandidate,
  fetchCandidatesSummary,
} from "../../src/repository/CandidateRepository";
import {
  createCourtSearch,
  findSearchesByCandidateId,
} from "../../src/repository/CourtSearchRepository";
import {
  upsertCandidateReport,
  findReportBycandidateId,
} from "../../src/repository/CandidateReportRepository";
import {
  createAdverseaction,
  getAdverseActions,
} from "../../src/repository/AdverseActionRepository";
import { DataSource } from "typeorm";
import { Constants } from "../../src/utils/Constants";
// Establishing a test connection to the database
const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  entities: [User, Candidate, CandidateReport, AdverseAction, CourtSearch],
  synchronize: true,
  logging: false,
});
beforeAll(async () => {
  await AppDataSource.initialize();
});

// Closing the test connection after all tests are run
afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});

describe("UserRepository", () => {
  afterEach(async () => {
    // Clearing the User table before each test
    await User.clear();
  });

  describe("findByUsername", () => {
    it("should find a user by username", async () => {
      // Inserting a user into the database for testing
      const testUser = await User.create({
        username: "testuser",
        password: "testpassword",
      }).save();

      // Calling the findByUsername function
      const foundUser = await findByUsername("testuser");

      // Expecting the foundUser to match the testUser
      expect(foundUser).toEqual(testUser);
    });

    it("should return null if user is not found", async () => {
      // Calling the findByUsername function with a username that doesn't exist
      const foundUser = await findByUsername("nonexistentuser");

      // Expecting the foundUser to be null
      expect(foundUser).toBeNull();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const username = "newuser";
      const password = "newpassword";

      // Calling the createUser function
      const newUser = await createUser(username, password);

      // Finding the newly created user from the database
      const foundUser = await User.findOne({ where: { username } });

      // Expecting the foundUser to match the newUser
      expect(foundUser).toEqual(newUser);
    });
  });
});

describe("CandidateRepository", () => {
  afterEach(async () => {
    // Clearing the User table before each test
    await CandidateReport.clear();
    await Candidate.clear();
  });

  describe("findCandidateByEmail", () => {
    it("should find a Candidate by email", async () => {
      // Inserting a Candidate into the database for testing
      const testCandidate = await Candidate.create({
        email: "john.doe32@example.com",
        name: "John Doe",
        dob: "1990-05-15",
        phone: "123-456-7890",
        ssn: "123-45-6789",
        zipcode: "12345",
        driversLicense: "DL1234567890",
        location: "calfornia",
      }).save();

      // Calling the findCandidateByEmail function
      const foundCandidate = await findCandidateByEmail(testCandidate.email);

      // Expecting the foundCandidate to match the testCandidate
      expect(foundCandidate).toEqual(testCandidate);
    });

    it("should return null if candidate is not found", async () => {
      // Calling the findCandidateByEmail function with a email that doesn't exist
      const foundCandidate = await findCandidateByEmail(
        "nonexistentuser@gmail.com"
      );

      // Expecting the foundCandidate to be null
      expect(foundCandidate).toBeNull();
    });
  });

  describe("findCandidateById", () => {
    it("should find a Candidate by Id", async () => {
      const testCandidate = await Candidate.create({
        email: "john.doe321@example.com",
        name: "John Doe",
        dob: "1990-05-15",
        phone: "123-456-7890",
        ssn: "123-45-6789",
        zipcode: "12345",
        driversLicense: "DL1234567890",
        location: "calfornia",
      }).save();
      // Calling the create function
      const newCandidate = await Candidate.create(testCandidate).save();

      // Finding the newly created candidate from the database
      const foundCandidate = await findCandidateById(newCandidate.id);

      // Expecting the foundCandidate to match the newCandidate
      expect(foundCandidate).toEqual(newCandidate);
    });
  });

  describe("createCandidate", () => {
    it("should create a new candidate", async () => {
      const testCandidate = {
        email: "john.doe325@example.com",
        name: "John Doe",
        dob: "1990-05-15",
        phone: "123-456-7890",
        ssn: "123-45-6789",
        zipcode: "12345",
        driversLicense: "DL1234567890",
        location: "calfornia",
      };
      // Calling the createCandidate function
      const newCandidate = await createCandidate(testCandidate);
      // Finding the newly created Candidate from the database

      const foundCandidate = await findCandidateById(newCandidate.id);

      // Expecting the foundCandidate to match the newCandidate
      expect(foundCandidate).toEqual(newCandidate);
    });
  });

  describe("getCandidatesSummary", () => {
    it("should fetch candidates summary", async () => {
      for (let i = 1; i <= 5; i++) {
        const testCandidate = await Candidate.create({
          email: `john.doe32${i}@example.com`,
          name: "John Doe",
          dob: "1990-05-15",
          phone: "123-456-7890",
          ssn: "123-45-6789",
          zipcode: "12345",
          driversLicense: "DL1234567890",
          location: "calfornia",
        }).save();
        // Calling the create function
        await upsertCandidateReport({
          ...Constants.SAMPLE_CANDIDATE_REPORT_DATA,
          candidate: testCandidate,
        });
      }
      const data = await fetchCandidatesSummary(
        "clear",
        "ASC",
        1,
        10,
        AppDataSource
      );

      // Expecting the foundCandidate to match the newCandidate
      expect(data.length).toBeGreaterThan(0);
    });
  });
});

describe("CandidateReportRepository", () => {
  afterEach(async () => {
    // Clearing the  tables before each test
    await CandidateReport.clear();
    await Candidate.clear();
  });
  describe("findReportBycandidateId", () => {
    it("should find a report by candidateId", async () => {
      // Inserting a Candidate into the database for testing
      const testCandidate = await Candidate.create({
        email: "john.doe32@example.com",
        name: "John Doe",
        dob: "1990-05-15",
        phone: "123-456-7890",
        ssn: "123-45-6789",
        zipcode: "12345",
        driversLicense: "DL1234567890",
        location: "calfornia",
      }).save();
      await upsertCandidateReport({
        ...Constants.SAMPLE_CANDIDATE_REPORT_DATA,
        candidate: testCandidate,
      });
      const foundReport = await findReportBycandidateId(testCandidate.id);
      // Expecting the foundReport to not be null
      expect(foundReport).not.toBeNull();
    });
  });
});

describe("courtSearchRepository", () => {
  afterEach(async () => {
    // Clearing the  tables before each test
    await CourtSearch.clear();
    await Candidate.clear();
  });

  describe("findSearchesByCandidateId", () => {
    it("should find a courtsearch by candidateId", async () => {
      // Inserting a Data into the database for testing
      const testCandidate = await Candidate.create({
        email: "john.doe32@example.com",
        name: "John Doe",
        dob: "1990-05-15",
        phone: "123-456-7890",
        ssn: "123-45-6789",
        zipcode: "12345",
        driversLicense: "DL1234567890",
        location: "calfornia",
      }).save();
      await createCourtSearch({
        search: "Criminal",
        status: "clear",
        date: new Date(),
        candidate: testCandidate,
      });
      const foundSearch = await findSearchesByCandidateId(testCandidate.id);
      // Expecting the foundSearch to not be null
      expect(foundSearch).not.toBeNull();
    });
  });
});

describe("AdverseActionRepository", () => {
  beforeEach(async () => {
    await AdverseAction.clear();
    await Candidate.clear();
  });

  describe("getAdverseActions", () => {
    it("should create a adverseaction and getCandidateSummary", async () => {
      for (let i = 1; i <= 5; i++) {
        const testCandidate = {
          email: `john${i}@gmail.com`,
          name: "John Doe",
          dob: "1990-05-15",
          phone: "123-456-7890",
          ssn: "123-45-6789",
          zipcode: "12345",
          driversLicense: "DL1234567890",
          location: "calfornia",
        };
        // Calling the createCandidate function
        const newCandidate = await createCandidate(testCandidate);
        //Calling the createAdverseaction function
        await createAdverseaction({
          status: "scheduled",
          preNoticeDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
          candidate: newCandidate,
        });
      }

      const data = await getAdverseActions(
        "scheduled",
        "ASC",
        1,
        10,
        AppDataSource
      );
      expect(data.length).toBeGreaterThan(0);
    });
  });
});
