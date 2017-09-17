<?
include "../model/ClassInfo.php";
include "../controller/_BaseController.php";
	/* ClassDetailController
	 * Desc. 사용자의 클래스 관련 정보 처리부
	 * 
	 * Parameter
	 * $regid	// 강의 ID
	 * 
	 * Return
	 * {
	 * 	classInfo: {
	 * 			regid: int				// 강의 ID
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
	 * 			attend_rate: Number	// 출석률
	 * 	}
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 메인 컨트롤러
	class ClassDetailController extends BaseController{
		private $pcInfo;
		private $currClass;
		private $uid;
		private $noTodayEng;
		
		public function __construct($uid, $regId){
			$this->name = "classInfo";
			$this->uid = $uid;
			$this->regId = $regId;
			
			if (is_null($noTodayEng) == true){
				$this->noTodayEng = "";
			}
			else{
				$this->noTodayEng = $noTodayEng;
			}
		}
		
		public function getData(){
			$dao = new ClassInfoDetailDAO();
			
			return $dao->getData($this->uid);
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassDetailController($uid, $regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>