<?
include "../model/ClassInfo.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassPlansController
	 * Desc. 사용자의 클래스 강의 계획서 처리 컨트롤
	 * 
	 * Parameter
	 * $regid	// 강의 ID
	 * 
	 * Return
	 * {
	 * 	plans: {
			lessonPlan: {
	 			seq
				classid
				title
				courseobj		// 1. Course Objectives
				timemng1
				timemng2
				timemng3
				timemng4
				timemng5
				timemng6
		  	},
		  	lessonPlanWeek: [
		 		{
		 			seq
					planseq
					mainbook
					submaterial
		  		}
		  	]
	 * 	},
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 메인 컨트롤러
	class ClassPlansController extends BaseController{
		private $pcInfo;
		private $currClass;
		private $uid;
		private $noTodayEng;
		
		public function __construct($regId){
			$this->name = "plans";
			$this->regId = $regId;
		}
		
		public function getData(){
			$dao = new ClassPlansDetailDAO($this->regId);
			
			return $dao->getData();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassPlansController($regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>