<?
include "../model/ClassInfo.php";
include "../controller/_BaseController.php";
	/* TutorClassAttdendListController
	 * Desc. 사용자의 클래스 출결 현황 처리부
	 * 
	 * Parameter
	 * $regid		// 강의 ID
	 * $datestart	// 출결 현황을 확인할 시작 날짜. 이 날짜를 기준으로 7일간의 내용을 받아 온다.
	 * 
	 * Return
	 * {
	 * 	attendlist: [
	 * 		{
	 * 			
	 * 			date:	String			// 날짜
	 * 			status:	int				// 출결상태. 0: 출석, 1: 결석(or불참), 2: 예정
	 * 			regid: int				// 강의출결 ID
	 * 			classid: int			// 강의 class ID
	 * 		}
	 * 	]
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 컨트롤러
	class TutorClassAttdendListController extends BaseController{
		private $pcInfo;
		private $currClass;
		private $tutorseqid;
		private $classid;
		private $datestart;
		
		public function __construct($tutorseqid, $regId, $datestart){
			$this->name = "attendlist";
			$this->tutorseqid = $tutorseqid;
			$this->classid = $regId;
			$this->datestart = $datestart;
		}
		
		public function getData(){
			$dao = new ClassAttendListByDateDAO($this->classid, $this->datestart);
			
			return $dao->getData();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new TutorClassAttdendListController($uid, $regid, $datestart);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>