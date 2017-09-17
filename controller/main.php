<?
include "../model/ClassInfo.php";
include "../model/TodayEnglishInfo.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* MainController
	 * Desc. 사용자가 접근하는 첫 페이지.
	 * 
	 * Parameter
	 * $count	// 컨텐츠 개수. (행수)
	 * $page	// 페이지 번호
	 * 
	 * Features
	 * $page 가 1또는 null일 경우 today english 포함, 1보다 클 경우 미포함.
	 * 
	 * Return
	 * {
	 * 	classInfo: {
	 * 		curr_classes: int		// 수업중인 class 수 (Current Classes)
	 * 		total_class_completion	// 전체 class block 달성률 (Total class completion)
	 * 		list : [
	 * 			{
	 * 			classname: String		// 강의명		[ITM_CLASS]
	 * 			classno: int			// 강의 차수 		[ITM_CLASS]
	 * 			companyname: String		// 고객 회사명	[ITM_COMPANY]
	 * 			sdate: String			// 시작일		[ITM_CLASS]
	 * 			edate: String			// 종료일		[ITM_CLASS]
	 * 			stimegubun: String		// 시작시간(AM/PM)	[ITM_CLASS]
	 * 			stimehh: String			// 시작시간(Hour)		[ITM_CLASS]
	 * 			stimemm: String			// 시작시간(Minutes)	[ITM_CLASS]
	 * 			etimegubun: String		// 종료시간(AM/PM)	[ITM_CLASS]
	 * 			etimehh: String			// 종료시간(Hour)		[ITM_CLASS]
	 * 			etimemm: String			// 종료시간(Minutes)	[ITM_CLASS] 
	 * 			cdaysmo: String			// 수업일 - 월	[ITM_CLASS]
	 * 			cdaystu: String			// 수업일 - 화	[ITM_CLASS]
	 * 			cdayswe: String			// 수업일 - 수	[ITM_CLASS]
	 * 			cdaysth: String			// 수업일 - 목	[ITM_CLASS]
	 * 			cdaysfr: String			// 수업일 - 금	[ITM_CLASS]
	 * 			cdayssa: String			// 수업일 - 토	[ITM_CLASS]
	 * 			cdayssu: String			// 수업일 - 일	[ITM_CLASS]
	 * 			boardseq: int			// Class Community [ITM_CLASS.REGID ~ BOARDLIST.CLASSID (SEQ)]
	 * 			course_completion: int	// 과정 진행도
	 * 
	 * 			boardcount: int			// 클래스 커뮤니티의 글 개수
	 * 			}
	 * 		]
	 * 		totalcount: int				// 전체 행 개수
	 * 	}
	 * 	todayEnglish: {
	 * 		seq			// 오늘의 영어 ID
			title		// 제목 (영문)
			transtitle	// 제목 (국문)
			view_date	// 보여지는 날짜
	 * 	}
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 메인 컨트롤러
	class MainController extends BaseController{
		private $pcInfo;
		private $currClass;
		private $uid;
		private $count;
		private $page;
		
		public function __construct($uid, $count = 10, $page = 1){
			$this->name = "classInfo";
			$this->uid = $uid;
			$this->count = (int)$count;
			$this->page = (int)page;
		}
		
		public function getData(){
			$dao = new ClassInfoListDAO($this->uid, $this->count, $this->page);
			
			return $dao->getData();
		}
		public function getTodayEnglish(){
			$dao = new MainTodayEnglishDAO();
			
			return $dao->getData();
		}
		
		public function getResult(){
			$mResult = parent::getResult();
			
			if ($this->page == 1){
				$mResult["todayEnglish"] = $this->getTodayEnglish();
			}
			
			return $mResult;
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new MainController($uid, $count, $page);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>