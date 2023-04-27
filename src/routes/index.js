import AuthView from "../views/auth/AuthView";
import MainView from "../views/Teacher Views/PersonalInformation";
import Dasboard from "../views/Student Views/Dashboard";
import Splach from "../components/Splach";
import Timetable from "../views/Student Views/Timetable"
import Evaluation from "../views/Student Views/Evaluation"
import Datesheet from "../views/Student Views/Datesheet"
import Courses from "../views/Student Views/Courses"
import Finance from "../views/Student Views/Finance"
import Fine from "../views/Student Views/Fine"
import Fee from "../views/Student Views/Fee"
import Financial from "../views/Student Views/Financial"
import Attendance from "../views/Student Views/Attendance"
import Assessment from "../views/Student Views/Assessment"
import TeacherDashboard from "../views/Teacher Views/TeacherDashboard";
import ManageAttendance from "../views/Teacher Views/ManageAttendance";
import ManageEvaluation from "../views/Teacher Views/ManageEvaluation";
import TeacherTimetable from "../views/Teacher Views/TeacherTimetable";
import ManageFine from "../views/Admin Views/ManageFine";
import AssistantRequest from "../views/Admin Views/AssistantRequest";
import ManageDatesheet from "../views/Admin Views/ManageDatesheet";
import ManageNoticeboard from "../views/Admin Views/ManageNoticeboard";
import ManageTimetable from "../views/Admin Views/ManageTimetable";
import PersonalInformation from "../views/Teacher Views/PersonalInformation";
import ManageStudentEvaluation from "../views/Student Views/ManageStudentEvaluation";
import CheckEvaluation from "../views/Admin Views/CheckEvaluation";
import EvaluationPercentage from "../views/Admin Views/EvaluationPercentage";
import Enrollment from "../views/Student Views/Enrollment";
import ExamResult from "../views/Student Views/ExamResult";
import CourseAllocation from "../views/Admin Views/CourseAllocation";
import StudentSetting from "../views/Student Views/StudentSetting";
import AdminSetting from "../views/Admin Views/AdminSetting"
import GenerateChallan from "../views/Student Views/GenerateChallan";
import ViewFeeStatus from "../views/Student Views/ViewFeeStatus";
import StudentFee from "../views/Admin Views/StudentFee";
import ManageStudentFee from "../views/Admin Views/ManageStudentFee";
import ManageFinancialAssistance from "../views/Admin Views/ManageFinancialAssistance";
import FineList from "../views/Admin Views/FineList";
import FineDetails from "../views/Admin Views/FineDetails";
import AddFine from "../views/Admin Views/AddFine";
import UploadFine from "../views/Student Views/UploadFine";
let routes = [
  {
    path: "/auth_login",
    component: AuthView,
    layout: "auth",
    name: "AuthView",
    role: "auth",
  },
  {
    path: "/",
    component: Splach,
    layout: "auth",
    name: "Splach",
    role: "auth",
  },
  {
    path: "/student/dashboard",
    component: Dasboard,
    layout: "student",
    icon:"fas fa-home ",
    name: "Dashboard",
    role: "student",
  },
  {
    path: "/student/timetable",
    component: Timetable,
    layout: "student",
    icon:"fas fa-calendar-alt ",
    name: "Timetable",
    role: "student",
  },
  {
    path: "/student/evaluation",
    component: Evaluation,
    layout: "student",
    icon:"fas fa-star-half-alt ",
    name: "Evaluation",
    role: "student",
  },
  {
    path: "/student/evaluation/:id",
    component: ManageStudentEvaluation,
    layout: "student",
    icon:"fas fa-star-half-alt ",
    name: "Start Evaluation",
    role: "student",
  },
  {
    path: "/student/assessment/:id",
    component: Assessment,
    layout: "student",
    icon:"fas fa-star-half-alt ",
    name: "Assessment",
    role: "student",
  },
  {
    path: "/student/generate_challan/:id",
    component: GenerateChallan,
    layout: "student",
    icon:"fas fa-star-half-alt ",
    name: "Generate Challan",
    role: "student",
  },
  {
    path: "/student/datesheet",
    component: Datesheet,
    layout: "student",
    icon:"fas fa-table ",
    name: "Datesheet",
    role: "student",
  },
  {
    path: "/student/uploadfine",
    component: UploadFine,
    layout: "student",
    icon:"fas fa-table ",
    name: "Upload Fine",
    role: "student",
  },
  {
    path: "/student/examresult",
    component: ExamResult,
    layout: "student",
    icon:"fas fa-award  ",
    name: "Exam Result",
    role: "student",
  },
  // {
  //   path: "/student/courses",
  //   component: Courses,
  //   layout: "student",
  //   icon:"fas fa-book ",
  //   name: "Courses",
  //   role: "student",
  // },
  {
    path: "/student/finance",
    component: Finance,
    layout: "student",
    icon:"fas fa-money-check-alt ",
    name: "Finance",
    role: "student",
  },
  {
    path: "/student/enrollment",
    component: Enrollment,
    layout: "student",
    icon:"fas fa-money-check-alt ",
    name: "Enrollment",
    role: "student",
  },
  {
    path: "/student/fee_detail",
    component: Fee,
    layout: "student",
    icon:"fas fa-money-check-alt ",
    name: "Fee",
    role: "student",
  },
  {
    path: "/student/fee_status",
    component: ViewFeeStatus,
    layout: "student",
    icon:"fas fa-money-check-alt ",
    name: "Fee Status",
    role: "student",
  },
  // {
  //   path: "/student/finance/fine",
  //   component: Fine,
  //   layout: "student",
  //   icon:"fas fa-rupee-sign ",
  //   name: "Fine",
  //   role: "student",
  // },
  {
    path: "/student/financial_assistance",
    component: Financial,
    layout: "student",
    icon:"fas fa-donate ",
    name: "Financial Assistance",
    role: "student",
  },
  {
    path: "/student/attendance/:id",
    component: Attendance,
    layout: "student",
    icon:"fas fa-users ",
    name: "Attendance",
    role: "student",
  },
  // {
  //   path: "/student/evaluation/:id",
  //   component: Evaluation,
  //   layout: "student",
  //   icon:"fas fa-award ",
  //   name: "Evaluation",
  //   role: "student",
  // },
  {
    path: "/teacher/dashboard",
    component: TeacherDashboard,
    layout: "teacher",
    icon:"fas fa-home ",
    name: "Dashboard",
    role: "teacher",
  },
  // {
  //   path: "/teacher/timetable",
  //   component: TeacherTimetable,
  //   layout: "teacher",
  //   icon:"fas fa-calendar-alt ",
  //   name: "Timetable",
  //   role: "teacher",
  // },
  {
    path: "/teacher/attendance/:id",
    component: ManageAttendance,
    layout: "teacher",
    icon:"fas fa-users ",
    name: "Manage Attendance",
    role: "teacher",
  },
  {
    path: "/teacher/evaluation/:id",
    component: ManageEvaluation,
    layout: "teacher",
    icon:"fas fa-award ",
    name: "Evaluation",
    role: "teacher",
  },
  {
    path: "/admin/assistantrequest",
    component: AssistantRequest,
    layout: "admin",
    icon:"fas fa-star-half-alt ",
    name: "Financial Assistance",
    role: "admin",
  },
  {
    path: "/admin/manage_financial_assistance/:id",
    component: ManageFinancialAssistance,
    layout: "admin",
    icon:"fas fa-star-half-alt ",
    name: "Manage Financial Assistance",
    role: "admin",
  },
  {
    path: "/admin/datesheet",
    component: ManageDatesheet,
    layout: "admin",
    icon:"fas fa-table ",
    name: "Manage Datesheet",
    role: "admin",
  },
  {
    path: "/admin/noticeboard",
    component: ManageNoticeboard,
    layout: "admin",
    icon:"fas fa-award ",
    name: "Manage Noticeboard",
    role: "admin",
  },
  {
    path: "/admin/timetable",
    component: ManageTimetable,
    layout: "admin",
    icon:"fas fa-calendar-alt ",
    name: "Manage Timetable",
    role: "admin",
  },
  {
    path: "/admin/checkevaluation",
    component: CheckEvaluation,
    layout: "admin",
    icon:"fas fa-star-half-alt ",
    name: "Check Evaulation",
    role: "admin",
  },
  {
    path: "/admin/courseallocation",
    component: CourseAllocation,
    layout: "admin",
    icon:"fas fa-book-medical ",
    name: "Course Allocation",
    role: "admin",
  },
  {
    path: "/admin/evaluationpercentage/:id",
    component: EvaluationPercentage,
    layout: "admin",
    icon:"fas fa-star-half-alt ",
    name: "Evaluation",
    role: "admin",
  },
  {
    path: "/admin/manage_fee/:id",
    component: ManageStudentFee,
    layout: "admin",
    icon:"fas fa-star-half-alt ",
    name: "Manage Student Fee",
    role: "admin",
  },
  {
    path: "/teacher/setting",
    component: PersonalInformation,
    layout: "teacher",
    name: "Setting",
    icon:"fas fa-user-cog ",
    role: "teacher",
  },
  {
    path: "/admin/addfine",
    component: AddFine,
    layout: "admin",
    icon:"fas fa-rupee-sign ",
    name: "Add Fine",
    role: "admin",
  },
  {
    path: "/admin/fine",
    component: ManageFine,
    layout: "admin",
    icon:"fas fa-rupee-sign ",
    name: "Manage Fine",
    role: "admin",
  },
  {
    path: "/admin/fine_details/:id",
    component: FineDetails,
    layout: "admin",
    icon:"fas fa-rupee-sign ",
    name: "Fine Details",
    role: "admin",
  },
  {
    path: "/admin/finelist",
    component: FineList,
    layout: "admin",
    icon:"fas fa-rupee-sign ",
    name: "Fine List",
    role: "admin",
  },
  {
    path: "/admin/student_fee",
    component: StudentFee,
    layout: "admin",
    icon:"fas fa-money-check-alt ",
    name: "Student Fee",
    role: "admin",
  },
  {
    path: "/student/setting",
    component: StudentSetting,
    layout: "student",
    name: "Setting",
    icon:"fas fa-user-cog ",
    role: "student",
  },
  {
    path: "/admin/setting",
    component: AdminSetting,
    layout: "admin",
    name: "Setting",
    icon:"fas fa-user-cog ",
    role: "admin",
  },
];
export default routes;
