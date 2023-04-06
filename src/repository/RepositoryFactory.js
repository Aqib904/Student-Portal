
import AuthRepository from "./AuthRepository"
import AssessmentRepository from "./AssessmentRepository"
import AttendanceRepository from "./AttendanceRepository"
import ContestRepository from "./ContestRepository"
import EvaluationRepository from "./EvaluationRepository"
import FeeRepository from "./FeeRepository"
const repositories = {
  auth: AuthRepository,
  assessment:AssessmentRepository,
  attendance:AttendanceRepository,
  contest:ContestRepository,
  evaluation:EvaluationRepository,
  fee:FeeRepository,
};
export const RepositoryFactory = {
  get: (name) => repositories[name],
};
