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
import ViewNoticeBoard from "../views/Student Views/ViewNoticeBoard";
import CourseAdvisor from "../views/Admin Views/CourseAdvisor";
import AdviseStudent from "../views/Teacher Views/AdviseStudent";
import ManageAdviseStudents from "../views/Teacher Views/ManageAdviseStudents";
import ManageAdvises from "../views/Teacher Views/ManageAdvises";
import Advises from "../views/Student Views/Advices"
import ManageTeacherEvaluation from "../views/Admin Views/ManageTeacherEvaluation";
import TeacherEvaluation from "../views/Teacher Views/TeacherEvaluation";
import Evaluate from "../views/Teacher Views/Evaluate";
import TeacherRating from "../views/Student Views/TeacherRating";
import RatingCourses from "../views/Student Views/RatingCourses";
import ParentDashboard from "../views/Parent Views/Dashboard";
import ParentSetting from "../views/Parent Views/ParentSetting";
import InstallmentRequest from "../views/Admin Views/InstallmentRequest";
import ViewInformation from "../views/Parent Views/ViewInformation";
import AcademicDetail from "../views/Parent Views/AcademicDetail";
import ViewAttendance from "../views/Parent Views/ViewAttendance";
import ViewGrading from "../views/Parent Views/ViewGrading";
import ViewExamResult from "../views/Parent Views/ViewExamResult";
import ViewFeeDetail from "../views/Parent Views/ViewFeeDetail";
import GenerateChildChallan from "../views/Parent Views/GenerateChallan";
import FeeStatus from "../views/Parent Views/FeeStatus";
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
  {
    path: "/student/viewnoticeboard",
    component: ViewNoticeBoard,
    layout: "student",
    icon:"fas fa-envelope ",
    name: "Noticeboard",
    role: "student",
  },
  {
    path: "/student/advices",
    component: Advises,
    layout: "student",
    icon:"fas fa-comments ",
    name: "Advices",
    role: "student",
  },
  {
    path: "/student/rating-courses",
    component: RatingCourses,
    layout: "student",
    icon:"fas fa-star ",
    name: "Teacher Rating",
    role: "student",
  },
  {
    path: "/student/teacher-rating/:id",
    component: TeacherRating,
    layout: "student",
    icon:"fas fa-star ",
    name: "Teacher Rating",
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
    icon:"fas fa-donate ",
    name: "Financial Assistance",
    role: "admin",
  },
  {
    path: "/admin/installment-requests",
    component: InstallmentRequest,
    layout: "admin",
    icon:"fas fa-exclamation-circle ",
    name: "Installment Requests",
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
    icon:"fas fa-bell ",
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
    path: "/admin/teacherevaluation",
    component: ManageTeacherEvaluation,
    layout: "admin",
    icon:"fas fa-chalkboard-teacher ",
    name: "Teacher Evaluation",
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
    path: "/admin/course-advisor",
    component: CourseAdvisor,
    layout: "admin",
    icon:"fas fa-book-medical ",
    name: "Course Advisor",
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
    path: "/teacher/advise-student",
    component: AdviseStudent,
    layout: "teacher",
    name: "Advise Student",
    icon:"fas fa-user-tie ",
    role: "teacher",
  },
  {
    path: "/teacher/teacher-evaluation",
    component: TeacherEvaluation,
    layout: "teacher",
    name: "Teacher Evaluation",
    icon:"fas fa-chalkboard-teacher ",
    role: "teacher",
  },
  {
    path: "/teacher/evaluate/:id",
    component: Evaluate,
    layout: "teacher",
    name: "Teacher Evaluation",
    icon:"fas fa-chalkboard-teacher ",
    role: "teacher",
  },
  {
    path: "/teacher/manage_advise_students/:id",
    component: ManageAdviseStudents,
    layout: "teacher",
    name: "Manage Advise Student",
    icon:"fas fa-user-tie ",
    role: "teacher",
  },
  {
    path: "/teacher/manage_advises/:id",
    component: ManageAdvises,
    layout: "teacher",
    name: "Manage Advises",
    icon:"fas fa-user-tie ",
    role: "teacher",
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
  {
    path: "/parent/dashboard",
    component: ParentDashboard,
    layout: "parent",
    name: "Dashboard",
    icon:"fas fa-home ",
    role: "parent",
  },
  {
    path: "/parent/view-information/:id",
    component: ViewInformation,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/academic-detail/:id",
    component: AcademicDetail,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/view-attendance/:id",
    component: ViewAttendance,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/view-grading/:id",
    component: ViewGrading,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/view-exam-result/:id",
    component: ViewExamResult,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/view-fee-detail/:id",
    component: ViewFeeDetail,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/generate_challan/:id",
    component: GenerateChildChallan,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/fee-status/:id",
    component: FeeStatus,
    layout: "parent",
    role: "parent",
  },
  {
    path: "/parent/setting",
    component: ParentSetting,
    layout: "parent",
    name: "Setting",
    icon:"fas fa-user-cog ",
    role: "parent",
  },
];
export default routes;
