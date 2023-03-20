
import AuthRepository from "./AuthRepository"
import AssessmentRepository from "./AssessmentRepository"
import AttendanceRepository from "./AttendanceRepository"
import ContestRepository from "./ContestRepository"
import EvaluationRepository from "./EvaluationRepository"
const repositories = {
  auth: AuthRepository,
  assessment:AssessmentRepository,
  attendance:AttendanceRepository,
  contest:ContestRepository,
  evaluation:EvaluationRepository,
};
export const RepositoryFactory = {
  get: (name) => repositories[name],
};
