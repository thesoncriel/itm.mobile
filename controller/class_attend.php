<?
include "../model/ClassInfo.php";
include "../controller/_BaseController.php";
	/* ClassAttdendController
	 * Desc. 사용자의 클래스 출결 현황 처리부
	 * 
	 * Parameter
	 * $regid	// 강의 ID
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

	// 메인 컨트롤러
	class ClassAttdendController extends BaseController{
		private $pcInfo;
		private $currClass;
		private $uid;
		private $regId;
		private $noTodayEng;
		
		public function __construct($uid, $regId){
			$this->name = "attendlist";
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
			$dao = new ClassAttendListDAO();
			
			return $dao->getData($this->uid);
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassAttdendController($uid, $regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>