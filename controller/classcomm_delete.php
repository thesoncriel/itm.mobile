<?
include "../model/ClassComm.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommDeleteController
	 * Desc. 클래스 커뮤니티의 게시물을 삭제 한다.
	 * 
	 * Parameter
	 * $classid		// ITM_CLASS.REGID 기준
	 * $regid		// 게시물 번호 - ITM_CLASS_BOARD.REGID
	 * 
	 * Return
	 * {
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 클래스 커뮤니티 목록 컨트롤러
	class ClassCommDeleteController extends BaseController{
		private $uid;
		private $classid;
		private $regid;
		
		public function __construct($uid = "", $classid = "", $regid = ""){
			$this->uid = $uid;
			$this->classid = $classid;
			$this->regid = $regid;
		}
		
		public function delete(){
			$dao = new ClassCommDeleteDAO($this->classid, $this->regid);
			
			$this->msg = "CC Delete Success !!";
			
			return $dao->delete();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassCommDeleteController($uid, $classid, $regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>